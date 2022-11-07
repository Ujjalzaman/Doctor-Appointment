import mongoose from 'mongoose';
const doctorsSchema = new mongoose.Schema({
    name:{
        type: 'String',
        required:true,
    }, 
    email:{
        type: 'String',
        required:true,
    }, 
   
   
    
}, {timestamps: true})

export default mongoose.model('doctors', doctorsSchema)