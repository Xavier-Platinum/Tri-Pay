import express from "express";
const router = express.Router();
import {paystack_verify_payment} from "../../controllers/index.js";

// Initializing payment

router.get("/verify", paystack_verify_payment);

export default router;