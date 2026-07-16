import User from "../models/user.js"
export const updateCart = async (req , res )=>{
    try{
       const { userId , cartItems } = req.body
    console.log(req.body,">>>>>");
    
       const response =    await User.findByIdAndUpdate(userId, {cartItems}, { new: true })

    console.log(response,"responseresponse");
    
       res.json({ success: true , message: response})       
    }
    catch(error){
       res.json({ success: false , message: error.message})       

    }
}