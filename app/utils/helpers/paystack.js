import axios from "axios";

exports.initializePayment = async (form) => {
    const options = {
        url: "https://api.paystack.co/transaction/initialize",
        headers: {
            authorization: `Bearer sk_test_4a57d0b227e96cd5e84aa5e8d7a454971e1439c3`,
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        method: "POST",
        data: form,
    };
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.request(options);
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

exports.verifyPayment = async (ref) => {
    const options = {
        url: "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
        headers: {
            authorization: `Bearer sk_test_4a57d0b227e96cd5e84aa5e8d7a454971e1439c3`,
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        method: "GET",
    };
    return new Promise(async (resolve, reject) => {
        try {
            const data = await axios.request(options);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};
