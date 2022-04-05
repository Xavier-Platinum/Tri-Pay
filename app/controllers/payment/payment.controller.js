import Transaction from "../../models";
import {charge_ng_acct, create_payment} from "../../utils/helpers/flutterwave";
import {initializePayment, verifyPayment} from "../../utils/helpers/paystack";
import crypto from "crypto";
import {v5 as uuid} from "uuid";

exports.flutterwave_create_payment = async(req, res, next) => {
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
} 

exports.flutterwave_verify_payment = async(req, res, next) => {
    if (req.query.status === 'successful') {
        const transactionDetails = await Transaction.find({ref: req.query.tx_ref});
        const response = await flw.Transaction.verify({id: req.query.transaction_id});
        console.log(response, transactionDetails)
        if (
            response.data.status === "successful"
            && response.data.amount === transactionDetails.amount
            && response.data.currency === "NGN") {
            await Transaction.updateOne(
                {reference},
                { $set: {status: "success"}}
            )
        } else {
            // Inform the customer their payment was unsuccessful
        }
    }
}

exports.paystack_create_payment = async(req, res, next) => {
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
}

exports.paystack_verify_payment = async(req, res, next) => {
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
}