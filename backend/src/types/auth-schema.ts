import { password } from "bun";
import {z} from "zod";
export const authschema = z.object({
    username:z.string().trim().min(1,"username is required"),
    password:z.string().min(1,"passowrd is required")
})