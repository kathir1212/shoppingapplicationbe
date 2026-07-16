import express from "express";
import { isSellerAuth, sellerLogin } from "../controller/sellerController.js ";
import { sellerLogout } from "../controller/sellerController.js";
import authSeller from "../middleware/authseller.js";

const router = express.Router();

router.post("/login", sellerLogin);
router.get("/is-auth",authSeller, isSellerAuth);
router.get("/logout",authSeller, sellerLogout);

export default router;
