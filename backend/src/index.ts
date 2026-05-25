import express from "express";


const app=express();

//endpoints
// signup
//signin 
// place through orderbook
// delete the order
// depth
// get my order history
// my fills
// check balance

app.post("/signup",(req,res)=>{

})


app.post("/signin",(req,res)=>{})

app.post("/order",(req,res)=>{
    /*
          type : "market" | "limit"
          qty :number,
          price:number | null,
          market_id:string,
          side: "buy" | "sell"

    */
})

// get the order details or delete the order

app.get("/order/:orderid",(req,res)=>{})
app.delete("order/:orderid",(req,res)=>{})
app.get("/orders",(req,res)=>{})// get all order historry
// returns the status as either "filled" or "cancelled" or "sitting "
app.get("/fills",(req,res)=>{}) // get the filled orders

//get usd balance

app.get("/balance/usd",(req,res)=>{})

app.get("balance",(req,res)=>{})

app.listen(3000);