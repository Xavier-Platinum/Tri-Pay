import express from "express";
const router =  express.Router();
import {create_payment} from "../controllers/index.js";
import FlutterwaveRoutes from "./Payments/flutterwave.js";
import PaystackRoutes from "./Payments/Paystack.js";
import Status from "../models/Init/Status.js";
const rs = Status.find({});

router.get("/", async(req, res) => {
    res.send("Payment routes")
})
router.post("/create", create_payment);
router.use("/flutterwave", FlutterwaveRoutes);
router.use("/paystack", PaystackRoutes);


export default router;