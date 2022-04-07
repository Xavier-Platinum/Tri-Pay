import axios from "axios";

export const createPayment = async(form) => {
    const options = {
        url: "https://api.flutterwave.com/v3/payments",
        headers: {
            authorization: `Bearer FLWSECK_TEST-9d887eea66819974d4ad447fccca4c1c-X`,
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        method: "POST",
        data: form
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