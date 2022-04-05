import express from "express";
const router = express.Router();

import {flutterwave_create_payment, flutterwave_verify_payment} from "../../controllers/payment/payment.controller"


// fluterwave payment init
router.post("/flutterwave/create", flutterwave_create_payment);

// Verify payment
router.get('/flutterwave/verify', flutterwave_verify_payment);

export default router;