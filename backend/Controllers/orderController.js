import Order from "../Models/orderModel.js";
import Product from "../Models/productModel.js";

// Utility Function
function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = (itemsPrice + shippingPrice).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    totalPrice,
  };
}

// const createOrder = async (req, res) => {
//   try {
//     const { orderItems, shippingAddress, paymentMethod } = req.body;

//     if (!orderItems || orderItems.length === 0) {
//       return res.status(400).json({ message: "No order items" });
//     }

//     // Extract name and phone from shippingAddress
//     const { name, phone } = shippingAddress;

//     if (!name || !phone) {
//       return res.status(400).json({ message: "Name and phone are required" });
//     }

//     const itemsFromDB = await Product.find({
//       _id: { $in: orderItems.map((item) => item._id) },
//     });

//     const dbOrderItems = orderItems.map((itemFromClient) => {
//       const matchingItemFromDB = itemsFromDB.find(
//         (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
//       );

//       if (!matchingItemFromDB) {
//         return res
//           .status(404)
//           .json({ message: `Product not found: ${itemFromClient._id}` });
//       }

//       return {
//         ...itemFromClient,
//         product: itemFromClient._id,
//         price: matchingItemFromDB.price,
//         _id: undefined,
//       };
//     });

//     const { itemsPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

//     const order = new Order({
//       orderItems: dbOrderItems,
//       shippingAddress: {
//         ...shippingAddress,
//         name, // Include name
//         phone, // Include phone,
//       },
//       paymentMethod,
//       itemsPrice,
//       shippingPrice,
//       totalPrice,
//     });

//     const createdOrder = await order.save();
//     res.status(201).json(createdOrder);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // Destructure name, phone, and wilaya from shippingAddress
    const { name, phone, wilaya } = shippingAddress;

    if (!name || !phone || !wilaya) {
      return res
        .status(400)
        .json({ message: "Name, phone, and wilaya are required" });
    }

    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((item) => item._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        return res
          .status(404)
          .json({ message: `Product not found: ${itemFromClient._id}` });
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      shippingAddress: {
        ...shippingAddress,
        name, // Include name
        phone, // Include phone
        wilaya, // Include wilaya
      },
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calculateTotalSales = async (req, res) => {
  try {
    // Find only orders that have been delivered
    const deliveredOrders = await Order.find({ isDelivered: true });

    // Calculate the total sales for delivered orders
    const totalSales = deliveredOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calcualteTotalSalesByDate = async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json(salesByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findOrderById = async (req, res) => {
  try {
    // Find the order by its ID and populate the user field
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email" // Populate username and email from the User model
    );

    // Check if the order exists
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
};
