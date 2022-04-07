import express from "express";
const router = express.Router();

import {flutterwave_verify_payment} from "../../controllers"


// fluterwave payment init

// Verify payment
router.get('/verify', flutterwave_verify_payment);

export default router;