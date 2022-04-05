import express from "express";
const router = express.Router();
import {paystack_create_payment, paystack_verify_payment} from "../../controllers/payment/payment.controller";

// Initializing payment
router.post("/paystack/create", paystack_create_payment);

router.get("/paystack/verify", paystack_verify_payment);

export default router;