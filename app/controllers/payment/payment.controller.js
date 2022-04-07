import Transaction from "../../models/Payments/Payment.model.js";
import {createPayment} from "../../utils/helpers/flutterwave.js";
import {initializePayment, verifyPayment} from "../../utils/helpers/paystack.js";
import crypto from "crypto";
import Status from "../../models/Init/Status.js";


export const create_payment = async(req, res, next) => {
    await Status.find({name: "paystack"})
    .then(async(result) => {
        if (result.status_code === 503) {
            const {name, email, amount} = req.body;
            if(!name || !email || !amount) {
                return res.json({msg: "Invalid Body"})
            }

            // check if the amount coming from body is less than ₦500
            if (parseInt(amount) < 50) {
                return res.json({msg: "Amount must be ₦500"});
            }

            const flutterwave_data = {
                tx_ref: crypto.randomBytes(4).toString("hex"),
                amount,
                currency: "NGN",
                redirect_url: "http://localhost:5000/flutterwave/verify",
                customer: {
                    email,
                    name
                }, 
                customizations: {
                    title: "Tri_Pay"
                }
            }

            let {data} = await createPayment(flutterwave_data);
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
        } else {
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
    })
    .catch((err) => {
        res.json({msg: "No response recorded"})
    })
    
} 

export const flutterwave_verify_payment = async(req, res, next) => {
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

export const paystack_verify_payment = async(req, res, next) => {
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