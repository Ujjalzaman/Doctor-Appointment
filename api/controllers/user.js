import { createError } from '../utils/error.js';
import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


let sshkey = "W16aQUoCDwHm8AAAAadWpqYWx6YW1hbkBERVNLVE9QLUlLNkVITkUB";

export const register = async (req, res, next)=>{
    const salt =  bcrypt.genSaltSync(10);
    const hash =  bcrypt.hashSync(req.body.password, salt);

    try{
        const userData = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        const newUser = await userData.save();
        res.status(200).json(newUser);
    }catch(err){
        next(err);
    }
}
export const login = async(req, res, next) =>{

    try{
        const isUser = await Users.findOne({email: req.body.email});
        if(!isUser) return createError(500, 'User not Found');

        const isPassword = await bcrypt.compare(req.body.password, isUser.password);
        if(!isPassword) return createError(500, 'Password is not matched!');

        const token = jwt.sign({id: isUser._id, isAdmin: isUser.isAdmin}, sshkey);
        const {password, isAdmin, ...others} = isUser._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json({...others});
    }
    catch(err){
        console.log(err)
    }
}