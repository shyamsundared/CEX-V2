import jwt from "jsonwebtoken"
import { env } from "./env"
export interface TokenPayload{
    userid?:string
}

export function createToken(payload:TokenPayload){
    return jwt.sign(payload,env.jwtSecret,{expiresIn:"7d"});
}
