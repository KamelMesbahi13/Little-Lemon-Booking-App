// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import path from "path";
// import cors from "cors"; // Import CORS
// import connectDB from "./Config/db.js";
// import userRoutes from "./Routes/userRoutes.js";
// import categoryRoutes from "./Routes/categoryRoutes.js";
// import productRoutes from "./Routes/productsRoutes.js";
// import uploadRoute from "./Routes/uploadRoute.js";
// import orderRoutes from "./Routes/orderRoutes.js";

// dotenv.config();
// const port = process.env.PORT || 5000;
// connectDB();

// const app = express();

// app.use(
//   cors({
//     origin: ["https://tools-masterrr.pages.dev"],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use("/api/users", userRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/upload", uploadRoute);
// app.use("/api/orders", orderRoutes);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// app.listen(port, () => console.log(`Server Running on port ${port}`));

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"; // Import CORS
import connectDB from "./Config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import productRoutes from "./Routes/productsRoutes.js";
import uploadRoute from "./Routes/uploadRoute.js";
import orderRoutes from "./Routes/orderRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["https://tools-masterrr.pages.dev"], // Add your frontend URL
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoute); // This will be updated for Cloudinary
app.use("/api/orders", orderRoutes);

// Remove local `uploads` static route
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Serve frontend if needed
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

// Start server
app.listen(port, () => console.log(`Server Running on port ${port}`));
