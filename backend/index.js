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
const allowedOrigins = [
  "https://toolsmarketdz.com",
  "http://localhost:5173",
  "http://localhost:5174",
];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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

// Serve frontend if needed
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

// Start server
const server = app.listen(port, () =>
  console.log(`Server Running on port ${port}`)
);

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Please stop the other process and try again.`
    );
    process.exit(1);
  } else {
    throw err;
  }
});
