import express from "express";
import {initializePayment, verifyPayment} from "../../utils/helpers/paystack";
import Transaction from "../../models/Payments/Payment.model";
import crypto from "crypto";
const router = express.Router();

// Initializing payment
router.post("/paystack/create", async (req, res, next) => {
    const {name, email, amount} = req.body;
    if (!name || !email || !amount) {
        return res.json({msg: "All fields are required"})
    }

    // check if the amount coming from body is less than ₦500
    if (parseInt(amount) < 50) {
        return res.json({msg: "Amount must be ₦500"});
    }

    // payload to send to paystack to initialize a transaction
    const paystack_data = {
        amount: parseInt(amount) * 100,
        email: email,
        reference: crypto.randomBytes(4).toString("hex"),
    };

    let payment_gateway_response = await initializePayment(paystack_data);

    let transation_payload = {
        amount: parseInt(amount),
        status: "pending",
        reference: paystack_data.reference,
        access_code: payment_gateway_response.data.access_code,
        payment_gateway: "paystack"
    };

    await Transaction.create(transation_payload)
    .then(async(response) => {
        return res.status(301).json({
            message: "Saved",
            response,
            redirect_link: payment_gateway_response.data.authorization_url
        })
    })
    .catch((err) => {
        return res.status(400).json({err})
    })
});

router.get("/paystack/verify", async (req, res, next) => {
    const { trxref } = req.query;

    if (!trxref) {
        return res.json({msg: "Transaction Ref not found"});
    }

    const payment_status = await verifyPayment(trxref);

    let { status, ip_address, reference, currency, channel } = payment_status.data.data;

    await Transaction.updateOne(
        { reference },
        { $set: { status }, ip_address, reference, currency, channel },
    )
    .then((data) => {
        return res.status(200).json({
            message: "success",
            body: data
        })
    }).catch(err => {return res.status(400).json(err)});

});

export default router;