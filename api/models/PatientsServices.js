

import mongoose from 'mongoose'
import React from 'react'

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
