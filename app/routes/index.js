import express from "express";
const router =  express.Router();
import FlutterwaveRoutes from "./Payments/flutterwave";
import PaystackRoutes from "./Payments/Paystack";
import Status from "../models/Init/Status";
const rs = Status.find({});

router.get("/", async(req, res) => {
    res.send("Payment routes")
})

try {
    if (rs.name === "paystack" && rs.status_code === 503) {
        router.use("/flutterwave", FlutterwaveRoutes);
    } else {
        router.use("/paystack", PaystackRoutes);
    }
} catch(err) {
    console.log(err);
}

export default router;