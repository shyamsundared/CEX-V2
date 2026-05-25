// adding userid to request

declare global{
    namespace Express{
        interface Request{
            userId:string;
        }
    }
}
export{};