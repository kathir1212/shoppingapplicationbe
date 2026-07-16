import express from "express";
import { authUser } from "../middleware/authUser.js";
import { addAddress, getAddress } from "../controller/adressController.js";

const addressRoutes = express.Router();

addressRoutes.post("/add", authUser , addAddress);
addressRoutes.get("/get", authUser , getAddress);


export default addressRoutes;
