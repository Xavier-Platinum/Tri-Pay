import cron from "node-cron";
import {paystack_availability, flutterwave_availability} from "./statusCheck.js";
// checking for availibility of service
cron.schedule("5 * * * * *", () => {
    console.log("============ Checking now ===============");
    paystack_availability()
    flutterwave_availability()
    console.log("============ Done Checking =================")
})