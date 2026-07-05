// import Order from "../Models/orderModel.js";
// import Product from "../Models/productModel.js";

// // Utility Function
// function calcPrices(orderItems) {
//   const itemsPrice = orderItems.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   const shippingPrice = itemsPrice > 100 ? 0 : 10;
//   const totalPrice = (itemsPrice + shippingPrice).toFixed(2);

//   return {
//     itemsPrice: itemsPrice.toFixed(2),
//     shippingPrice: shippingPrice.toFixed(2),
//     totalPrice,
//   };
// }

// const createOrder = async (req, res) => {
//   try {
//     const { orderItems, shippingAddress, paymentMethod } = req.body;

//     if (!orderItems || orderItems.length === 0) {
//       return res.status(400).json({ message: "No order items" });
//     }

//     // Destructure name, phone, and wilaya from shippingAddress
//     const { name, phone, wilaya } = shippingAddress;

//     if (!name || !phone || !wilaya) {
//       return res
//         .status(400)
//         .json({ message: "Name, phone, and wilaya are required" });
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
//         phone, // Include phone
//         wilaya, // Include wilaya
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

// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate("user", "id username");
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const countTotalOrders = async (req, res) => {
//   try {
//     const totalOrders = await Order.countDocuments();
//     res.json({ totalOrders });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const calculateTotalSales = async (req, res) => {
//   try {
//     // Find only orders that have been delivered
//     const deliveredOrders = await Order.find({ isDelivered: true });

//     // Calculate the total sales for delivered orders
//     const totalSales = deliveredOrders.reduce(
//       (sum, order) => sum + order.totalPrice,
//       0
//     );

//     res.json({ totalSales });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const calcualteTotalSalesByDate = async (req, res) => {
//   try {
//     const salesByDate = await Order.aggregate([
//       {
//         $match: {
//           isPaid: true,
//         },
//       },
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
//           },
//           totalSales: { $sum: "$totalPrice" },
//         },
//       },
//     ]);

//     res.json(salesByDate);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const findOrderById = async (req, res) => {
//   try {
//     // Find the order by its ID and populate the user field
//     const order = await Order.findById(req.params.id).populate(
//       "user",
//       "username email" // Populate username and email from the User model
//     );

//     // Check if the order exists
//     if (order) {
//       res.json(order);
//     } else {
//       res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const markOrderAsPaid = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.payer.email_address,
//       };

//       const updateOrder = await order.save();
//       res.status(200).json(updateOrder);
//     } else {
//       res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const markOrderAsDelivered = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (order) {
//       order.isDelivered = true;
//       order.deliveredAt = Date.now();

//       const updatedOrder = await order.save();
//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export {
//   createOrder,
//   getAllOrders,
//   getUserOrders,
//   countTotalOrders,
//   calculateTotalSales,
//   calcualteTotalSalesByDate,
//   findOrderById,
//   markOrderAsPaid,
//   markOrderAsDelivered,
// };

import Order from "../Models/orderModel.js";
import Product from "../Models/productModel.js";

// Updated Utility Function to clean price (remove currency symbols)
function cleanPrice(price) {
  // If it's already a number, return it as is
  if (typeof price === "number" && !isNaN(price)) {
    return price;
  }

  // If it's a string, try to clean and parse it
  if (typeof price === "string") {
    const cleaned = price.replace(/[$€£¥₹\s]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }

  // Try to parse as float, default to 0 if fails
  const parsed = parseFloat(price);
  return isNaN(parsed) ? 0 : parsed;
}

// Updated Utility Function - DON'T calculate shipping price here
function calcPrices(orderItems, providedShippingPrice = 0) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + cleanPrice(item.price) * item.qty,
    0
  );

  // Use the shipping price provided from frontend instead of calculating it
  const shippingPrice = cleanPrice(providedShippingPrice);
  const totalPrice = (itemsPrice + shippingPrice).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    totalPrice,
  };
}

// Helper function to clean order data before sending to frontend
function cleanOrderData(order) {
  const orderObj = order.toObject();

  console.log("=== CLEAN ORDER DATA DEBUG ===");
  console.log(
    "Original order.shippingPrice:",
    order.shippingPrice,
    typeof order.shippingPrice
  );
  console.log(
    "Original order.totalPrice:",
    order.totalPrice,
    typeof order.totalPrice
  );
  console.log(
    "Original order.itemsPrice:",
    order.itemsPrice,
    typeof order.itemsPrice
  );

  const cleaned = {
    ...orderObj,
    totalPrice: cleanPrice(orderObj.totalPrice),
    shippingPrice: cleanPrice(orderObj.shippingPrice),
    itemsPrice: cleanPrice(orderObj.itemsPrice),
  };

  console.log("After cleaning - shippingPrice:", cleaned.shippingPrice);
  console.log("After cleaning - totalPrice:", cleaned.totalPrice);
  console.log("After cleaning - itemsPrice:", cleaned.itemsPrice);
  console.log("============================");

  return cleaned;
}

const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      itemsPrice,
      totalPrice,
    } = req.body;

    console.log("=== BACKEND RECEIVED DATA ===");
    console.log(
      "Raw shippingPrice:",
      shippingPrice,
      "Type:",
      typeof shippingPrice
    );
    console.log("Raw itemsPrice:", itemsPrice, "Type:", typeof itemsPrice);
    console.log("Raw totalPrice:", totalPrice, "Type:", typeof totalPrice);
    console.log("============================");

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
        price: cleanPrice(matchingItemFromDB.price), // Clean the price here
        _id: undefined,
      };
    });

    // Use the exact values from frontend without any processing
    const orderData = {
      orderItems: dbOrderItems,
      shippingAddress: {
        ...shippingAddress,
        name,
        phone,
        wilaya,
      },
      paymentMethod,
      itemsPrice: itemsPrice, // Use directly
      shippingPrice: shippingPrice, // Use directly
      totalPrice: totalPrice, // Use directly
    };

    console.log("=== ORDER DATA TO SAVE ===");
    console.log("orderData.shippingPrice:", orderData.shippingPrice);
    console.log("orderData.itemsPrice:", orderData.itemsPrice);
    console.log("orderData.totalPrice:", orderData.totalPrice);
    console.log("==========================");

    const order = new Order(orderData);

    console.log("=== NEW ORDER OBJECT ===");
    console.log(
      "order.shippingPrice:",
      order.shippingPrice,
      "Type:",
      typeof order.shippingPrice
    );
    console.log(
      "order.itemsPrice:",
      order.itemsPrice,
      "Type:",
      typeof order.itemsPrice
    );
    console.log(
      "order.totalPrice:",
      order.totalPrice,
      "Type:",
      typeof order.totalPrice
    );
    console.log("========================");

    const createdOrder = await order.save();

    console.log("=== SAVED ORDER ===");
    console.log(
      "createdOrder.shippingPrice:",
      createdOrder.shippingPrice,
      "Type:",
      typeof createdOrder.shippingPrice
    );
    console.log(
      "createdOrder.itemsPrice:",
      createdOrder.itemsPrice,
      "Type:",
      typeof createdOrder.itemsPrice
    );
    console.log(
      "createdOrder.totalPrice:",
      createdOrder.totalPrice,
      "Type:",
      typeof createdOrder.totalPrice
    );
    console.log("==================");

    // Create response object manually
    const response = {
      _id: createdOrder._id,
      orderItems: createdOrder.orderItems,
      shippingAddress: createdOrder.shippingAddress,
      paymentMethod: createdOrder.paymentMethod,
      itemsPrice: createdOrder.itemsPrice,
      shippingPrice: createdOrder.shippingPrice,
      totalPrice: createdOrder.totalPrice,
      isPaid: createdOrder.isPaid,
      isDelivered: createdOrder.isDelivered,
      createdAt: createdOrder.createdAt,
      updatedAt: createdOrder.updatedAt,
      __v: createdOrder.__v,
    };

    console.log("=== RESPONSE OBJECT ===");
    console.log("response.shippingPrice:", response.shippingPrice);
    console.log("response.totalPrice:", response.totalPrice);
    console.log("======================");

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    const cleanedOrders = orders.map((order) => cleanOrderData(order));
    res.json(cleanedOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    const cleanedOrders = orders.map((order) => cleanOrderData(order));
    res.json(cleanedOrders);
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
      (sum, order) => sum + cleanPrice(order.totalPrice),
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
      res.json(cleanOrderData(order));
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
      res.status(200).json(cleanOrderData(updateOrder));
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
      res.json(cleanOrderData(updatedOrder));
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
