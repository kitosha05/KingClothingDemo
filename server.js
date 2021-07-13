const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression')
const nodemailer = require('nodemailer')
fs = require('fs');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: process.env.EMAIL,
         pass: process.env.PASSWORD
     }
 });




const app = express();
const port = process.env.PORT || 5000;
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));


  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.post("/create-payment-intent", async (req, res) => {
  const orderDetails = req.body;
  const {cartItems} = orderDetails
  const shippingFee = orderDetails.shippingMethod==='standardShipping' ? 1000 : 0

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
     amount: calculateTotal(cartItems)*100 + shippingFee,
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.post('/email/order-confirmation', async(req, res)=>{
  const order = req.body;

try {
  const mailOptions= createOrderConfirmationEmail(order)
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
} catch (error) {
  console.log(error)
}

})
app.post('/email/ready-for-pickup', async(req, res)=>{
  const order = req.body;
try {
  const mailOptions= createReadyForPickUpEmail(order)
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
} catch (error) {
  console.log(error);
}

})
app.post('/email/shipping-confirmation', async(req, res)=>{
  const order = req.body;
try {
  const mailOptions= createShippingConfirmation(order)
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
} catch (error) {
  console.log(error);
}

})
app.post('/email/was-picked-up', async(req, res)=>{
  const order = req.body;
try {
  const mailOptions= createPickedUpConfirmation(order)
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
} catch (error) {
  console.log(error);
}

})
app.post('/email/new-subscriber', async(req, res)=>{
  const {subscriber} = req.body;
  console.log(req.body);
try {
  const mailOptions= createNewSubscriberEmail(subscriber)
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
} catch (error) {
  console.log(error);
}

})
const createNewSubscriberEmail=(subscriber)=>{
  const {userId, email, name}= subscriber;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: `Welcome To The King Clothing Newsletter!`,
    text: `Hi, ${name}! Thanks for joining our newsletter. You'll be the first to know about new product drops and sales!`,
    html: `<p>Hi, ${name}! Thanks for joining our newsletter. You'll be the first to know about new product drops and sales!<p>`
  };
  return mailOptions
}
const createPickedUpConfirmation=(order)=>{
  const {id, billingName, billingEmail}= order;

  const mailOptions = {
    from: process.env.EMAIL,
    to: billingEmail,
    subject: `Your Order Was Picked Up!`,
    text: `Your Order: ${id} Has Been Picked Up. Enjoy and Thanks Again For Your Business ${billingName}!`,
    html: `<p>Your Order: ${id} Has Been Picked Up. Enjoy and Thanks Again For Your Business ${billingName}!`
  };
  return mailOptions
}
const createShippingConfirmation=(order)=>{
  const {id, billingName, billingEmail, trackingNumber}= order;

  const mailOptions = {
    from: process.env.EMAIL,
    to: billingEmail,
    subject: `Your Order Has Been Shipped!`,
    text: `Great News ${billingName}, Your Order: ${id} Has Been Shipped. The Tracking Number is: ${trackingNumber}!`,
    html: `<p> Great News ${billingName}, Your Order: ${id} Has Been Shipped. The Tracking Number is: ${trackingNumber}!`
  };
  return mailOptions
}
const createReadyForPickUpEmail=(order)=>{
  const {id, billingName, billingEmail, cartItems, shippingMethod, shippingFee,total}= order;

  const mailOptions = {
    from: process.env.EMAIL,
    to: billingEmail,
    subject: `Your Order Is Now Ready For Pick Up`,
    text: `Great News ${billingName}, Your Order: ${id} Is Now Ready For Pick Up!`,
    html: `<p> Great News ${billingName}, Your Order: ${id} Is Now Ready For Pick Up`
  };
  return mailOptions
}


 const createOrderConfirmationEmail = (order)=>{
   const {id, billingName, billingEmail, cartItems, shippingMethod, shippingFee,total}= order;
   let statusString='';
   let method='';
   if (shippingMethod==='pickUp'){
     statusString='You Will Receive An Email When Your Order Is Ready For Pick Up';
     method='Pick Up';
   }else{
     statusString='Your Order Is Being Prepared And You Will Receive An Email When It Has Shipped';
   }
   const itemStrings = cartItems.map(item=>{
     return `${item.name} x ${item.quantity}`
   })
   const itemListItems = cartItems.map(item=>{
     let options = ''
    if(item.optionCombo){
      item.optionCombo.optionValues.map(optionValue=>{
        options+=optionValue
      })
     }
     return(
      `<li>${item.name} - ${options} x ${item.quantity}</li>`
     )
   })
  const mailOptions = {
    from: process.env.EMAIL,
    to: billingEmail,
    subject: `Thanks, ${billingName}! Here Is Your Order Confirmation`,
    text: `Order Confirmation  Order Id: ${id} Ordered Items: ${itemStrings} 
    Shipping Method: ${shippingMethod} Shipping Cost: ${shippingFee} Total: ${total} Status:${statusString}`,
    html: `<h1>Order Confirmation</h1> <div><b>Order Id:</b> ${id}<div> <div><b>Ordered Items:</b><ul>${itemListItems}</ul></div> 
    <div><b>Shipping Method:</b> ${shippingMethod} </div><div><b>Shipping Cost:</b> $${shippingFee}</div> <div><b>Total:</b> $${total}</div> <div><b>Status:</b> ${statusString}</div>`

  };
  return mailOptions;
 }

const calculateTotal = (cartItems) =>{
  let subTotal=0
  cartItems.map(item=>{
    subTotal += item.quantity * item.price
  })
  return subTotal
  
}


app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});


