import mongoose from "mongoose";
const Schema = mongoose.Schema;

const statusSchema =  new Schema({
    name: {
        type: String
    },
    status_code: {
        type: Number,
    }
}, {
    timestamps: true
})

export default mongoose.model("Status", statusSchema);