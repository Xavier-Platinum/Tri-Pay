import axios from "axios";
import Status from "../../models/Init/Status.js";

export const paystack_availability = async() => {
    await axios({
        method: "GET",
        url: "https://api.paystack.co/transaction",
        headers: {
            Authorization: `Bearer sk_test_4a57d0b227e96cd5e84aa5e8d7a454971e1439c3`
        }
    })
    .then(async(res) => {
        await Status.findOne({name: "paystack"})
        .then((data) => {
            console.log(data)
            if(!data) {
                Status.create({
                    name: "paystack",
                    status_code: res.status
                })
                console.log("Paystack status Created")
            } else {
                Status.updateOne(
                    {name: "paystack"},
                    {$set: {status_code: res.data.status}}
                )
                console.log("Paystack status updated")
            }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
    // console.log(res);
}

export const flutterwave_availability = async() => {
    await axios({
        method: "GET",
        url: "https://api.flutterwave.com/v3/payments",
        headers: {
            Authorization: `Bearer FLWSECK_TEST-9d887eea66819974d4ad447fccca4c1c-X`
        }
    })
    .then(async(res) => {
        await Status.findOne({name: "flutterwave"})
        .then((data) => {
            if(!data) {
                Status.create({
                    name: "flutterwave",
                    status_code: res.status
                })
                console.log(("Flutterwave Status Created"))
            } else {
                Status.updateOne(
                    {name: "flutterwave"},
                    {$set: {status_code: res.data.status}}
                )
                console.log("Flutterwave Status Updated")
            }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
}