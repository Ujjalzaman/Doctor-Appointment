import mongoose from 'mongoose';
const appoinMentSchema = new mongoose.Schema({
    name:{
        type: 'String',
        required:true,
    }, 
    phone:{
        type: 'String',
    },
    email:{
        type: 'String',
        required:true,
    }, 
    gender:{
        type: 'String',
    },
    age:{
        type: 'Number'
    },
    weight:{
        type: 'Number',
    },
    service:{
        type: 'String'
    },
    date:{
        type: 'string'
    },
    
}, {timestamps: true})

export default mongoose.model('appointMent', appoinMentSchema)