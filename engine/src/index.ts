import type { RedisClient } from "bun";
import { env } from "./utils/env";
import { createClient } from "redis";
import { BALANCES } from "./store/exchange-store";

export interface userid{
    userId:string
}
export type EngineCommandType=
    "create_order" |
    "get_depth" |
    "get_user_balance" |
    "get_order" |
    "cancel_order";

export interface EngineRequest{
    type:EngineCommandType,
    payload:Record<string,unknown>
    responseQueue:string,
    correlationId:string;
}
export interface EngineResponse{
    ok:boolean,
    data?:unknown,
    error?:string,
    correlationId:string;
}

const brokerClient = createClient({ url: env.redisUrl }).on("error", (error) => {
  console.error("Redis broker client error", error);
});

const responseClient = createClient({ url: env.redisUrl }).on("error", (error) => {
  console.error("Redis response client error", error);
});

await Promise.all([brokerClient.connect(), responseClient.connect()]);
// fail both fast if either of them fails

export async function sendresponse(responseQueue:string,response:EngineResponse){
    await responseClient.lPush(responseQueue,JSON.stringify(response));

}
async function get_user_balance(message: EngineRequest){
    const {userId}=message.payload.userId;
    const Balance=BALANCES.get(userId);
}
function handleEngineRequest(message: EngineRequest): unknown {
    if(message.type==="get_user_balance"){
        get_user_balance(message);
    }
}