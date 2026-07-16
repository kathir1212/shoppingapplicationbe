import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  console.log("Auth middleware triggered");

  const { token } = req.cookies;

  console.log("Cookies received:", req.cookies);

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    if (decoded.id) {
      req.body.userId = decoded.id; 
      next(); 
    } else {
      return res.status(401).json({ success: false, message: "Invalid token structure" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token", error: error.message });
  }
};
