import Flutterwave from "flutterwave-node-v3"
import axios from "axios";

const flw = new Flutterwave(
    "FLWPUBK_TEST-4a493fbcd1f8dbb3fe60c6670285829b-X", 
    "FLWSECK_TEST-9d887eea66819974d4ad447fccca4c1c-X"
);

exports.charge_ng_acct = async(name, email, amount) => {
    try {
        const payload = {
            name,
            email,
            amount,
            currency: "NGN"
        }
        const response = await flw.Transaction.fee(payload);
        return {response}
    } catch(error) {
        console.log(error.message)
    }
}

exports.create_payment = async(name, email, amount, tx_ref) => {
    const options = {
        method: "POST",
        url: "https://api.flutterwave.com/v3/payments",
        headers: {
            Authorization: `Bearer FLWSECK_TEST-9d887eea66819974d4ad447fccca4c1c-X`
        },
        data: {
            tx_ref,
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
    }
    return new Promise(async(resolve, reject) => {
        try{
            const response = await axios.request(options);
            resolve(response.data);
        } catch(error) {
            reject(error);
        }
    })
}