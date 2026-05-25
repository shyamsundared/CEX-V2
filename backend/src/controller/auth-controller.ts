import type { Request,Response } from "express";
import { authschema } from "../types/auth-schema";
import { safeParse } from "zod";
import bcrypt from "bcryptjs"
import { prisma } from "../db";
import { createToken } from "../utils/auth";
export async function authcontroller(req:Request,res:Response):Promise<void> {
    //parse input using zod
    const parsedResponse =authschema.safeParse(req.body);
    if(!parsedResponse.success){
        return ;
    }
    const {username,password}=req.body;
    // create hash for password
    const hashpassword= await bcrypt.hash(password,10);

    try {
        const user = await prisma.user.create({
            data:{
                username:username,
                password:hashpassword
            }
        })
        res.status(201).json({
            token:createToken({userid:user.id}),
            userId:user.id,
            username:user.username
        })
    } catch (error) {
        res.status(409).json({"error":"username already exists"})
    }
    
}