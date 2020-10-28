const axios = require('axios');
var Tail = require('always-tail');
const fs = require('fs');
require('dotenv').config();
const shajs = require('sha.js')
const utf8 = require('utf8');



//Logging
let winston = require('winston');
const MESSAGE = Symbol.for('message');
const jsonFormatter = (logEntry) => {
  const base = { timestamp: new Date() };
  const json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};
const logLeadPostCRM = winston.createLogger({
  level: 'info',
  format: winston.format(jsonFormatter)(),
  transports:  [new winston.transports.Console({json: true}),
              new winston.transports.File({json: true,filename: process.env.LOG_CRM })
    ]
});



// SET UP LOG WATCHERS
var orders = process.env.WRITE_CRM;
if (!fs.existsSync(orders)) fs.writeFileSync(orders, "");
var tailorders = new Tail(orders, '\n');
tailorders.on('line', function(data) {
   try {
         data = utf8.encode(data);
   } catch(e) {
         logLeadPostCRM.log('info','Unicode Convert Error' + e);
   }
   try {
         logLeadPostCRM.log('info','CRMDATA',data);
         data = JSON.parse(data);
       } catch (e) {
         logLeadPostCRM.log('info','JSON Parse Error' + e);
       }
 
  console.log("CRM:", data);

/*
  CRM: { timestamp: '2020-10-27T21:58:15.913Z',
  psid: '4588035357903926',
  firstName: 'Eric',
  lastName: 'Frazier',
  locale: 'en_US',
  timezone: -6,
  gender: 'male',
  email: 'ericfraz@gmail.com',
  phone: '5872251156',
  level: 'info',
  message: 'EVENT-CRMpost' }
*/

  postCRM(data); 

});

tailorders.on('error', function(data) {
  data = JSON.parse(data);
  console.log("error:", data);
  /*

  */
});
tailorders.watch();


function postCRM(data, page_id){

     logLeadPostCRM.log('info','Posting to CRM',data);
     logLeadPostCRM.log('info',page_id);


     outdata = {};
     outdata.firstname = data.firstName;
     outdata.lastname = data.lastName;
     outdata.email = data.email;
     outdata.city = 'facebook';
     outdata.phone = data.phone;
     outdata.url = 'https://www.facebook.com/#location=' + outdata.city


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
          'hear-about': 'Facebook',
          'referral-partner': 'Agency Facebook Messenger'
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
         logLeadPostCRM.log('info','{status:'+ response.status+',success:'+response.data.success+',error:'+response.data.error+',error_message:'+response.data.error_message+'}');

     });


}

