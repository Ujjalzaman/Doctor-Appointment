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
    },
    isAdmin:{
        type: String,
        required: true,
        default: true,
    },
    
}, {timestamps: true})
export default mongoose.modelNames('User', UserSchema);