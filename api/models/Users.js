import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: null
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    isDoctor:{
        type: Boolean,
        default: false,
    }
    
}, {timestamps: true})

export default mongoose.model('User', UserSchema);
