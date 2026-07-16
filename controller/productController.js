
// import {V2 as cloudinary} from "cloudinary"
import product from "../models/product.js"

import pkg from "cloudinary";
const { v2: cloudinary } = pkg;

export const addProduct = async (req, res) => {
  try {
    console.log(req.body, "req.body");

    const productData = JSON.parse(req.body.productData);
    const images = req.files;
    console.log(images, ">>>>> Uploaded Files");

    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, message: "No images provided" });
    }

    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path.replace(/\\/g, '/'), {
          resource_type: "image"
        });
        return result.secure_url;
      })
    );

    console.log(imagesUrl,"imagesUrlimagesUrl");
    

    const savedProduct = await product.create({ ...productData, images: imagesUrl });

    console.log(savedProduct,"savedProductsavedProduct");
    

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};





export const productlist = async (req, res) => {

  try{
    const products = await product.find({})
    res.json({success: true , products})

  }
  catch(error){
  res.json({success: false , message:error.message})

}



}

export const productById = async (req, res) => {
 try{
    const {id} = req.body;
    const product = await product.findById(id)
    res.json({success: true , product})
 }
 catch(error){
  res.json({success: false , message:error.message})
 } 
}

export const changeStock = async (req, res) => {
  
  try{
    const { id , inStock} = req.body;
    await product.findByIdAndUpdate(id,{inStock})
        res.json({success: true , message:'stock updated'})


  }
  catch(error){
  res.json({success: false , message:error.message})

  }
}

