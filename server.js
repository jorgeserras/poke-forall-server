require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

/* POKEDEX */
var Pokedex = require('pokedex-promise-v2');
var options = {
  protocol: 'https', //http
  hostName: 'pokeapi.co', //localhost:4000
  versionPath: '/api/v2/',
  cacheLimit: 2073600 * 1000, // 24 days, shouldnt be higher because of 32 bits
  timeout: 20 * 1000 // 20s
}
var P = new Pokedex(options);

module.exports = {
  P
};
/* --------------------------------*/


/* --------------------------------*/
/* const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();

aws.config.update({
    // Your SECRET ACCESS KEY from AWS should goes here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-2' // region of your bucket
});

const s3 = new aws.S3();


const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'foralltest',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })
  
  module.exports = {
    upload
  }; */

/* --------------------------------*/


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

/* --------------------------------*/
app.use(function (req, res, next) {
  console.log(req.body) // populated!
  next()
})
/* --------------------------------*/

// api routes
app.use('/users', require('./users/users.controller'));


/* --------------------------------*/
// api routes
app.use('/api/v2', require('./pokedex/pokedex.controller'));
/* --------------------------------*/

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
