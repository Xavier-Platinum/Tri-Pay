import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    amount: Number,
    reference: String,
    currency: String,
    channel: String,
    ip_address: String,
    status: {
        type: String,
        enum: ["pending", "success", "error"],
        trim: true
    },
    payment_gateway: {
        type: String,
        enum: ["paystack", "flutter-wave", "payu"],
        default: "paystack"
    },
    access_code: String
}, {
    timestamps: true
})

export default mongoose.model("Transactions", transactionSchema);