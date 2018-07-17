const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const keys = require('./configs/keys');

const app = express();

// make use of express middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'))

// create mongo connection
const connection = mongoose.createConnection(keys.mongoURI);
   
// init gfs
connection.once('open', () => {
   let gfs = Grid(connection.db, mongoose.mongo);
   gfs.collection('uploads');
});

// create storage engine
const storage = new GridFsStorage({
   url: keys.mongoURI,
   file: (req, file) => {
      return new Promise((resolve, reject) => {
         // generate name
         crypto.randomBytes(16, (err, buf) => {
            if (err) {
               return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
               filename: filename,
               bucketName: 'uploads'
            }; resolve(fileInfo);
         });
      });
   }
});
const upload = multer({
   storage
});
   
// enable CORC
// https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// make use of express route
require('./routes/itemRoute')(app, upload);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`app is running on port ${PORT}`));