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
  app.get('/page', (req,res)=>{
    res.render('preview.html');
  })

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.post('/page', (req,res)=>{
  let html = req.body['gjs-html'];
  let css = req.body['gjs-css'];
  let page = `<!doctype html>

  <html lang="en">
  <head>
    <meta charset="utf-8">
  
    <title>Preview</title>
   <style>${css}</style>
  </head>
  
  <body>
    ${html}
    <script src="js/scripts.js"></script>
  </body>
  </html>`

  
  fs.writeFile('preview.html', page, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
})



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


