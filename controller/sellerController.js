// SELLER_EMAIL = "kathirvel@gmail.com"
// SELLER_PASSWORD = "1234567"
import jwt from "jsonwebtoken";
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body, ">>>>> req.body");

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      console.log("succ");

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d", // ✅ correct spelling
      });

      res.cookie("sellerToken", token, {
        httpOnly: true,
       secure: true,
      sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true, message: "Logged In" });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: 'Not Authorized' });
  }
};


export const sellerLogout = (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
 });

    return res.json({ success: true, message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





