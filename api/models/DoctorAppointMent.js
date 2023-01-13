import mongoose from 'mongoose';
const appointMentSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
    }, 
    phone:{
        type: String,
    },
    email:{
        type: String,
        required:true,
    }, 
    gender:{
        type: String,
    },
    age:{
        type: String
    },
    weight:{
        type: String,
    },
    serviceTitle:{
        type: String
    },
    appointmantDate:{
        type: String,
        required:true
    },
    doctor_id:{
        type: String,
        required:true
    },
    user_id:{
        type: String,
        required:true
    }
}, {timestamps: true})

export default mongoose.model('Appointments', appointMentSchema)