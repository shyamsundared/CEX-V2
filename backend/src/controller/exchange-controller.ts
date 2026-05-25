import type { Request,Response } from "express";
import { orderBodyschema } from "../types/exchange-schema";
import { sendtoEngine } from "../utils/engine-client";
function getUserId(req:Request):string{
    if(!req.userId) throw new Error("missing authentucated user");
    return req.userId;
}

export async function createOrder(req:Request,res:Response):Promise<void>{
        const userId= getUserId(req);
        const parsedBody = orderBodyschema.safeParse(req.body)
        if(!parsedBody.success){
            return;
        }
        // send it to orderbook
        const {type,side,symbol,price,qty}=parsedBody.data;
        if(type==="market"){
            const price=null;
        }
        else{
            const price= parsedBody.data.price;
        }
        const EngineResponse=await sendtoEngine("create_order",{
            userId,
            side,
            symbol,
            type,
            price,
            qty}

        )
        res.status(EngineResponse.ok?200:400).json(EngineResponse.ok? EngineResponse.data :{
            error:EngineResponse.error
        })

}