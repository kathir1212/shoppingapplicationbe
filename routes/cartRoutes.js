import express from 'express';
import { authUser } from "../middleware/authUser.js";
import { updateCart } from "../controller/cartController.js";

const cartRoutes = express.Router();

cartRoutes.patch("/update",  updateCart);


export default cartRoutes;
