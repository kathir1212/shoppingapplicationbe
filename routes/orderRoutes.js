import express from 'express';
import { authUser } from "../middleware/authUser.js";
import { getAllOrder, getUserOrder, placeOrderCOD, placeOrderStrippe } from '../controller/orderController.js';

const orderRoutes = express.Router();

orderRoutes.post("/cod", authUser, placeOrderCOD);
orderRoutes.get("/user", authUser, getUserOrder);
orderRoutes.get("/seller", authUser, getAllOrder);
orderRoutes.post("/stripe", authUser, placeOrderStrippe );


export default orderRoutes;
