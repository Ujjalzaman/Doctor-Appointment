import mongoose from 'mongoose'

const OurServices = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    space:{
        type:Number,
        required: true,
    }
})

export default mongoose.model("OurServices", OurServices)
