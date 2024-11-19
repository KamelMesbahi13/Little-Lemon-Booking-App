import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image_one: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    shippingAddress: {
      address: { type: String },
      city: { type: String },
      name: {
        type: String,
        required: true,
        minlength: 5, // Minimum length for name
        maxlength: 30, // Maximum length for name
      },
      phone: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /\d{10}/.test(v); // Validate that the phone number is exactly 10 digits
          },
          message: (props) =>
            `${props.value} is not a valid 10-digit phone number!`,
        },
      },
      wilaya: { type: String, required: true },
    },

    itemsPrice: { type: Number, default: 0.0 },
    shippingPrice: { type: Number, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencing the User model
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
