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

export async function signin(req:Request,res:Response):Promise<void>{

    // parse the body
    // vaildate token
    // check username, password match
    const parsedResponse =authschema.safeParse(req.body);
    if(!parsedResponse.success){
        res.status(400).json({"error":"bad input"})
        return;
    }
    const username= req.body.username;
    try {
        const userdata= await prisma.user.findFirst({
        where:{
            username:username
        }
        
    })
        if(!userdata){
            res.status(401).json({"error":"invalid credentials"});
            return;
        }
        const actualpassword= userdata.password;
        const reqpassword=req.body.password;
        const ispasswordvalid =await bcrypt.compare(reqpassword,actualpassword);
        if(!ispasswordvalid)
        res.status(200).json({
            token:createToken({userid:userdata.id}),
            userId:userdata.id,
            username:userdata.username
        })

    } catch  {
        res.status(404).json({"error":"invalid credentials"})
        return;
    }
    
    
}