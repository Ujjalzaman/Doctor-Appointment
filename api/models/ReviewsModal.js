import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    desc:{
        type: String,
        required: true,
    },
    address:{
        type: String
    },
    image:{
        type: String,
        default: null
    },
}, {timestamps:true})

export default mongoose.model("reivews", ReviewSchema);