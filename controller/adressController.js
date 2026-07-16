
 
import Address from "../models/address.js";



export const addAddress = async (req,res)=>{


try{
  const { address , userId } = req.body;
  console.log(req.body,"bobyby");
  
  const response = await Address.create({...address, userId})


  res.json({success:true , message:response})
}
catch(error){
  res.json({success:false , message:error.message})

}
}

export const getAddress = async (req,res)=>{

    try{
  const {userId} = req.body;
  const address = await Address.find({userId})
  res.json({success:true,address})
    }
    catch(error){
  res.json({success:false , message:error.message})

    }

}


