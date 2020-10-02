/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

require('dotenv').config();
const fs = require('fs');
const http = require('http');
const https = require('https');
//const req = require('request');
const utf8 = require('utf8');

console.log ("ENV ", process.env );

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var xhub = require('express-x-hub');


// Winston logger
let winston = require('winston');

let logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [new winston.transports.Console({json: true}), new winston.transports.File({filename: process.env.LOG_SERVER }), ]
});

let logLeadRequests = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [new winston.transports.Console({json: true}), new winston.transports.File({filename: process.env.LOG_REQUEST }), ]
});

let logLeadPostCRM = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [new winston.transports.Console({json: true}), new winston.transports.File({json: true,filename: process.env.LOG_CRM}), ]
});

const MESSAGE = Symbol.for('message');
const jsonFormatter = (logEntry) => {
  const base = { timestamp: new Date() };
  const json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};

const logJson = winston.createLogger({
  level: 'info',
  format: winston.format(jsonFormatter)(),
  transports:  [new winston.transports.Console({json: true}),
              new winston.transports.File({json: true,filename: process.env.LOG_LEAD })
    ]
});

logger.log('info', 'BDO Webhooks Starting');

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));

app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.json());

var token = process.env.TOKEN || 'token';
var received_updates = [];

app.get('/', function(req, res) {
  console.log(req);
  res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>');
});

app.get(['/facebook', '/instagram'], function(req, res) {
  console.log("Facebook Verify ");

  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == token
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post('/facebook', function(req, res) {

  if (!req.isXHubValid()) {
    console.log('Warning - request header X-Hub-Signature not present or invalid');
    res.sendStatus(401);
    return;
  }

  console.log('request header X-Hub-Signature validated');
  // Process the Facebook updates here
  received_updates.unshift(req.body);
  res.sendStatus(200);

  logJson.log('info', 'LEAD',req.body);
  logJson.log('info', 'DATA',req.body.entry[0].changes );

  var form_id = req.body.entry[0].changes["0"].value.form_id;  // GET FORM ID to match with list of fields collected via the page by hand.

  getLeadData( req.body.entry[0].changes["0"].value.leadgen_id, form_id );

});

app.post('/instagram', function(req, res) {
  console.log('Instagram request body:');
  console.log(req.body);
  // Process the Instagram updates here
  received_updates.unshift(req.body);
  res.sendStatus(200);
});

//START TESTING
app.get('/', (req, res) => res.send('Hello World!'));
//END TESTING

app.listen();



function getLeadData(leadgen_id,form_id){


logLeadRequests.log('info',"Getting Lead ID:");
logLeadRequests.log('info', leadgen_id);
console.log("GETTING ID", leadgen_id );

const https = require('https');

token = process.env.SYSTEM_TOKEN;

getLeadURL = 'https://graph.facebook.com/v6.0/' + leadgen_id  + '?fields=field_data,custom_disclaimer_responses&access_token=' + token;

https.get(getLeadURL, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
    logLeadRequests.log('info',"Lead ID Success:");
    logLeadRequests.log('info', leadgen_id);
    postCRM ( data, form_id );
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
  logLeadRequests.log('info',err.message);
});

}

function replayLog(){

}

function postCRM(data, form_id){

try {
  data = utf8.encode(data);
} catch(e) {
  logLeadPostCRM.log('info','Unicode Convert Error' + e);
}

try {
    logLeadPostCRM.log('info',data);
    data = JSON.parse(data);
  } catch (e) {
    logLeadPostCRM.log('info','JSON Parse Error' + e);
  }

logLeadPostCRM.log('info','Posting to CRM');
logLeadPostCRM.log('info',data);
logLeadPostCRM.log('info',form_id);

console.log(data);
outdata = {};
var thisData = data.field_data;
outdata.firstname = getValue('first_name',thisData);
outdata.lastname = getValue('last_name',thisData);
outdata.email = getValue('email',thisData);
outdata.city = getValue('city',thisData);
outdata.phone = getValue('phone_number',thisData);
outdata.url = 'https://www.facebook.com/#location=' + outdata.city

console.log("OUTDATA ",outdata);

const axios = require('axios').default;
const querystring = require('querystring');

var ourdata =  querystring.stringify(
   {
     'url': outdata.url,
     'token': process.env.FA_TOKEN,
     'your-name': outdata.firstname,
     'last-name': outdata.lastname,
     'your-email': outdata.email,
     'accept-this': 1,
     'telephone': outdata.phone,
     'hear-about': 'Radio',
     'referral-partner': 'Agency Facebook Leads'
    }
);

axios({
  method: 'post',
  url: process.env.FA_URL,
  data: ourdata,
  headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
   }
}).then(function (response) {
    console.log("RES ",response);
    logLeadPostCRM.log('info',response);
});

}


function getValue (fieldname, data) {
console.log("GET VALUE ", fieldname, data.length);

  for (var i=0; i<data.length; i++){
      console.log("checking ", data[i].name);
    if (data[i].name == fieldname){
      console.log("MATCH ",fieldname,data[i].values[0]);
      return data[i].values[0];
    }

  }
}
