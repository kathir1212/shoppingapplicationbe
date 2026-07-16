import express from "express";
// import { upload } from "../multer.js";
import authSeller from "../middleware/authseller.js";
import { addProduct, changeStock , productlist , productById } from "../controller/productController.js";
import multer from 'multer';

const uploads = multer({ dest: 'uploads/' });
const productRoutes = express.Router();
productRoutes.post("/add",  uploads.array('images'), addProduct);
productRoutes.get("/list", productlist);
productRoutes.get("/id",authSeller, productById);
productRoutes.get("/stock", authSeller, changeStock);

export default productRoutes;
