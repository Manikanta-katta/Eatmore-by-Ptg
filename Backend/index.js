const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const Stripe = require('stripe')(process.env.SECRET_KEY);
var cors = require('cors');
 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const port = process.env.PORT || 8100;

app.listen(port,()=>{
   
    console.log('Your server is running on port 8100');
});

app.post('/payment',cors(), async(req,res)=>{
    
    const {amount,id} = req.body;
    console.log(id);
    try{
       const payment = await Stripe.paymentIntents.create({
            
            amount,
            currency:'INR',
            payment_method:id,
            confirm:true
        });
        console.log("Payment",payment)
        res.json({
            message:"Payment successful",
            sucess: true
        })
        
    } catch (error) {
    console.log(error);
    res.json({
        message:"payment failed",
        success: false
    })
    
    }
  
})

