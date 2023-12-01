import {Auth} from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from "../../../shared/prisma";

const AuthSignup = async(data:Auth):Promise<Auth | null> =>{
    let user: Auth = data
    const {password} = user;
    if(password){
        user.password = await bcrypt.hashSync(password, 12)
    }
    const result = await prisma.auth.create({
        data: user
    })
    return result
}

export const AuthService = {
    AuthSignup
}