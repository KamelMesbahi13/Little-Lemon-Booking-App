// import jwt from "jsonwebtoken";
// import User from "../Models/userModel.js";
// import asyncHandler from "./asyncHandler.js";

// const authenticate = asyncHandler(async (req, res, next) => {
//   let token;

//   token = req.cookies.jwt;

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.userId).select("-password");
//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, token failed.");
//     }
//   } else {
//     res.status(401);
//     throw new Error("Not authorized, no token.");
//   }
// });

// const authorizeAdmin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401).send("Not authorized as an admin.");
//   }
// };

// export { authenticate, authorizeAdmin };

import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// Middleware to authenticate users
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Access the token from cookies
  token = req.cookies?.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("User not found, token invalid.");
    }

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401);
    throw new Error("Not authorized, token failed.");
  }
});

// Middleware to authorize admin users
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403); // Use 403 for "forbidden"
    throw new Error("Not authorized as an admin.");
  }
};

export { authenticate, authorizeAdmin };
