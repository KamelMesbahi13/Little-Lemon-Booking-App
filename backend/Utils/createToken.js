import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   sameSite: "strict",
  //   maxAge: 30 * 24 * 60 * 60 * 1000,
  // });

  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Strict for production; lax for dev
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration (7 days)
  });

  return token;
};

export default generateToken;
