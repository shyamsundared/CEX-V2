import { createClient } from "redis";
import { env } from "./env";

import type { EngineCommandType, EngineRequest, EngineResponse } from "../types/engine";
import { waitForEngineResponse } from "../store/pending-responses";


const publisher =createClient({url:env.redisUrl}).on("error",(error)=>{
    console.error("Redis publisher error",error);
})

const subscriber =createClient({url:env.redisUrl}).on("error",(error)=>{
    console.error("failed to connect subscriber",error);
})
export async function connectRedis():Promise<void>{
    await Promise.all([publisher.connect(),subscriber.connect()]);
    
}

export async function sendtoEngine(type:EngineCommandType,payload:Record<string,unknown>):Promise<EngineResponse>{
    //  needs to send what operation to the queue like get order or usd baallcne, psuh order ..
    const correlationId =crypto.randomUUID();// identify each backend uniquely
    const responsePromise = waitForEngineResponse(correlationId,env.engineTimeoutMs);
    
    // generic way to send orderbook requests 
    const message: EngineRequest={
        correlationId,
        responseQueue:env.responseQueue,
        type,
        payload,
    }

    await publisher.lPush(env.incomingQueue,JSON.stringify({message}));
    //push reqs to queue from backend to engine(orderbook)

    return responsePromise;
}   