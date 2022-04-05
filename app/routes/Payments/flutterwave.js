import express from "express";
import {charge_ng_acct, create_payment} from "../../utils/helpers/flutterwave";
import Transaction from "../../models/Payments/Payment.model";
import crypto from "crypto";
import {v5 as uuid} from "uuid";
const router = express.Router();


// fluterwave payment init
router.post("/flutterwave/create", async(req, res, next) => {
    const {name, email, amount} = req.body;
    if(!name || !email || !amount) {
        return res.json({msg: "Invalid Body"})
    }

    // check if the amount coming from body is less than ₦500
    if (parseInt(amount) < 50) {
        return res.json({msg: "Amount must be ₦500"});
    }
    const tx_ref = uuid("Payment_id", uuid.URL);
    let {data} = await create_payment(name, email, amount, tx_ref)
    let transaction_payload = {
        amount,
        reference: tx_ref,
        name,
        email,
        status: "pending",
        payment_gateway: "flutter-wave"
    }
    await Transaction.create(transaction_payload)
    .then(async(response) => {
        return res.status(301).json({
            message: "Saved",
            response,
            redirect_link: data.link
        })
    })
    .catch((err) => {
        return res.status(400).json({err})
    })
    // if (gate_response) return (301, gate_response.data.link)
})

// Verify payment
router.get('/flutterwave/verify', async (req, res) => {
    if (req.query.status === 'successful') {
        const transactionDetails = await Transaction.find({ref: req.query.tx_ref});
        const response = await flw.Transaction.verify({id: req.query.transaction_id});
        console.log(response, transactionDetails)
        // if (
        //     response.data.status === "successful"
        //     && response.data.amount === transactionDetails.amount
        //     && response.data.currency === "NGN") {
        //     await Transaction.updateOne(
        //         {reference},
        //         { $set: {status: "success"}}
        //     )
        // } else {
        //     // Inform the customer their payment was unsuccessful
        // }
    }
});

export default router;