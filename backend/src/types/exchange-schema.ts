import z from "zod";


export const symbolparamschema=z.object({
    symbol : z.string().trim().min(1,"symbol should not be empty")
});

export const orderIdparamschema = z.object({
    orderId : z.string().trim().min(1,"orderId cannto be empty")
})

export const orderBodyschema = z.discriminatedUnion("type",[
    z.object({
        type:z.literal("limit"),
        side:z.enum(["buy","sell"]),
       symbol : z.string().trim().min(1,"symbol should not be empty"),
       price:z.number().positive("limit order requires a positive number"),
       qty:z.number().positive("quantity must be positive")
    }),
    z.object({
        type:z.literal("market"),
        side:z.enum(["buy","sell"]),
       symbol : z.string().trim().min(1,"symbol should not be empty"),
       price:z.number().positive("limit order requires a positive number"),
       qty:z.number().positive("quantity must be positive")
    }),
]);