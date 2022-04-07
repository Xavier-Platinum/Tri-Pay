import express from "express";
const router =  express.Router();
import {create_payment} from "../controllers";
import FlutterwaveRoutes from "./Payments/flutterwave";
import PaystackRoutes from "./Payments/Paystack";
import Status from "../models/Init/Status";
const rs = Status.find({});

router.get("/", async(req, res) => {
    res.send("Payment routes")
})
router.post("/create", create_payment);
router.use("/flutterwave", FlutterwaveRoutes);
router.use("/paystack", PaystackRoutes);


export default router;