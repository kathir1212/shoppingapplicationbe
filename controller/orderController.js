import order from "../models/order.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import stripe from "stripe";
export const placeOrderCOD = async (req , res) => {
    try {
   const { userId , items , address } = req.body;
   if(!address || items.length === 0){
    res.json({success: false , message:"Invalid data"})

   }

   let amount = await items.reduce(async (acc, item)=>{
    const product = await Product.findById(item.product);
    return (await acc ) + product.offerPrice * item.quantity
   }, 0)

   amount += Math.floor(amount * 0.02);

   await Order.create({
    userId, items, amount , address , paymentType: "COD"
   })
       res.json({success: true , message:"Order placed successfully"})

    }
    catch(error){
       res.json({success: false , message:error.message})

    }
}


const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);



export const placeOrderStrippe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let productData = [];

    // Use regular `for...of` loop instead of async reduce
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }
      const totalPrice = product.offerPrice * item.quantity;
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      amount += totalPrice;
    }

    // Add 2% extra (like tax or processing fee)
    amount += Math.floor(amount * 0.02);

    // Save the order first to get `order._id`
    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    const line_items = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price + item.price * 0.02) * 100, // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/myorder`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    res.json({ success: true, url: session.url });
  }
   catch (error) {
    console.error("Stripe Checkout Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};



export const getUserOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const order = await Order.find({
      userId,
      // isPaid: paymentType === "Online" ? true : false,      
      // $or: [{ paymentType: "Online" }, { isPaid: true }]
    })
    .populate("items.product")
    .populate("address")
    .sort({ createdAt: -1 });

    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export const getAllOrder = async (req , res) => {

try{
   const order = await Order.find({
    
    $or:[{paymentType : "COD"}, {isPaid : true}]

   })
   .populate("items.product")
   .populate("address").sort({createdAt: -1});
   res.json({success: true, order })
}
catch(error){
       res.json({success: false , message:error.message})

}

}




   




