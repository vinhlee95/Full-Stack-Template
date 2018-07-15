const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./configs/keys');

const app = express();

// make use of express middleware
app.use(bodyParser.json());

// connect to mLab
mongoose.connect(keys.mongoURI)
   .then(() => console.log('Connected to mLab'))
   .catch(error => console.log(error));

// enable CORC
// https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// make use of express route
require('./routes/itemRoute')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`app is running on port ${PORT}`));