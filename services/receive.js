/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

// receive.js 

"use strict";

const Curation = require("./curation"),
  Order = require("./order"),
  Response = require("./response"),
  Care = require("./care"),
  Bdo = require("./bdo"),
  Survey = require("./survey"),
  GraphAPi = require("./graph-api"),
  i18n = require("../i18n.config");

module.exports = class Receive {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  // Check if the event is a message or postback and
  // call the appropriate handler function
  handleMessage() {
    let event = this.webhookEvent;

    let responses;

    try {
      if (event.message) {
        let message = event.message;

        console.log("USER INFO ", this.user );
        console.log("MESSAGE REF? ",event );
        console.log("REF --- END");

        if (event.message.nlp){
           console.log("MESSAGE TYPE NLP: ",event.message.nlp.entities);
           let nlp = event.message.nlp.entities;

           for (let [key,val] of Object.entries(nlp)){
              console.log(`${key}: ${val}`);
              if (key == 'wit$phone_number:phone_number'){
                 this.user.phone=nlp[key][0].value; 
              }
              if (key == 'wit$email:email'){
                 this.user.email = nlp[key][0].value;
              }

           } 

        }

        if (message.quick_reply) {
          responses = this.handleQuickReply();
        } else if (message.attachments) {
          responses = this.handleAttachmentMessage();
        } else if (message.text) {
          responses = this.handleTextMessage();
        }
      } else if (event.postback) {
        responses = this.handlePostback();
      } else if (event.referral) {
        responses = this.handleReferral();
      }
    } catch (error) {
      console.error(error);
      responses = {
        text: `An error has occured: '${error}'. We have been notified and \
        will fix the issue shortly!`
      };
    }

    if (Array.isArray(responses)) {
      let delay = 0;
      for (let response of responses) {
        this.sendMessage(response, delay * 2000);
        delay++;
      }
    } else {
      this.sendMessage(responses);
    }
  }

  // Handles messages events with text
  handleTextMessage() {
    console.log(
      "Received text:",
      `${this.webhookEvent.message.text} for ${this.user.psid}`
    );

    // check greeting is here and is confident
    let greeting = this.firstEntity(this.webhookEvent.message.nlp, "greetings");
    let phone = this.firstEntity(this.webhookEvent.message.nlp,"wit$phone_number:phone_number");
    let email = this.firstEntity(this.webhookEvent.message.nlp,"wit$email:email");
    let message = this.webhookEvent.message.text.trim().toLowerCase();
    let response;

    if ( (greeting && greeting.confidence > 0.8) ||  message.includes("start over" ) )
    {
      response = Response.genNuxMessage(this.user);
    } 

/*
     else if (Number(message)) {
      response = Order.handlePayload("ORDER_NUMBER");
    } 

else if (message.includes("#")) {
      response = Survey.handlePayload("CSAT_SUGGESTION");
    } else if (message.includes(i18n.__("care.help").toLowerCase())) {
      let care = new Care(this.user, this.webhookEvent);
      response = care.handlePayload("CARE_HELP");
*/
   // THESE ARE SPECIAL CASES THAT HAVE TO BE HANDLED HERE BECAUSE THE PROMPTS COME FROM THE AD!!
    else if (message.includes(i18n.__("APP_REVIEW_START").toLowerCase())) {
       let bdo = new Bdo(this.user, this.webhookEvent);
      response = bdo.handlePayload("APP_REVIEW_START");
    }
    else if (message.includes(i18n.__("I'm doing research").toLowerCase())) {
      let bdo = new Bdo(this.user, this.webhookEvent);
      response = bdo.handlePayload("RESEARCH");
    } else if (message.includes(i18n.__("Yes").toLowerCase())) {
      let bdo = new Bdo(this.user, this.webhookEvent);
      response = bdo.handlePayload("YES");
    } 
    // These are special payloads without labels aka, bdo.,only NLP types
    else if (phone && phone.confidence > 0.8){
      let bdo = new Bdo(this.user, this.webhookEvent);
      response = bdo.handlePayload("bdo_phone_entry");
    } else if (email && email.confidence > 0.8){
      let bdo = new Bdo(this.user, this.webhookEvent);
      response = bdo.handlePayload("bdo_email_entry");
    } else {
      response = [
        Response.genText(
          i18n.__("fallback.any", {
            message: this.webhookEvent.message.text
          })
        )
      ];
    }

    return response;
  }

  // Handles mesage events with attachments
  handleAttachmentMessage() {
    let response;

    // Get the attachment
    let attachment = this.webhookEvent.message.attachments[0];
    console.log("Received attachment:", `${attachment} for ${this.user.psid}`);

    response = Response.genQuickReply(i18n.__("fallback.attachment"), [
      {
        title: i18n.__("bdo.callusbutton"),
        payload: "bdo_callusnow",
      },
      {
        title: i18n.__("bdo.contactthem"),
        payload: "bdo_contactme"
      }
          
    ]);

    return response;
  }

  // Handles mesage events with quick replies
  handleQuickReply() {
    // Get the payload of the quick reply
    let payload = this.webhookEvent.message.quick_reply.payload;

    return this.handlePayload(payload);
  }

  // Handles postbacks events
  handlePostback() {
    let postback = this.webhookEvent.postback;
    // Check for the special Get Starded with referral
    let payload;
    if (postback.referral && postback.referral.type == "OPEN_THREAD") {
      payload = postback.referral.ref;
    } else {
      // Get the payload of the postback
      payload = postback.payload;
    }
    return this.handlePayload(payload.toUpperCase());
  }

  // Handles referral events
  handleReferral() {
    // Get the payload of the postback
    let payload = this.webhookEvent.referral.ref.toUpperCase();

    return this.handlePayload(payload);
  }

  handlePayload(payload) {
    console.log("Received Payload:", `${payload} for ${this.user.psid}`);

    // Log CTA event in FBA
    GraphAPi.callFBAEventsAPI(this.user.psid, payload);

    let response;
    // Set the response based on the payload
    if (
      payload === "GET_STARTED" ||
      payload === "DEVDOCS" ||
      payload === "GITHUB" ||
      payload === "AD" || 
      payload === "APP_REVIEW_START"
    ) {
      response = Response.genNuxMessage(this.user);
    } 

 /*
else if (payload.includes("CURATION") || payload.includes("COUPON")) {
      let curation = new Curation(this.user, this.webhookEvent);
      response = curation.handlePayload(payload);
    } else if (payload.includes("CARE")) {
      let care = new Care(this.user, this.webhookEvent);
      response = care.handlePayload(payload);

*/


    else if (payload.includes("research") || payload.includes("bdo") ){
       console.log("BDO - Generic Response");
      let bdo = new Bdo(this.user, this.webhookEvent);
      response = bdo.handlePayload(payload);


/*
    } else if (payload.includes("ORDER")) {
      response = Order.handlePayload(payload);
    } else if (payload.includes("CSAT")) {
      response = Survey.handlePayload(payload);
    } else if (payload.includes("CHAT-PLUGIN")) {
      response = [
        Response.genText(i18n.__("chat_plugin.prompt")),
        Response.genText(i18n.__("get_started.guidance")),
        Response.genQuickReply(i18n.__("get_started.help"), [
          {
            title: i18n.__("care.order"),
            payload: "CARE_ORDER"
          },
          {
            title: i18n.__("care.billing"),
            payload: "CARE_BILLING"
          },
          {
            title: i18n.__("care.other"),
            payload: "CARE_OTHER"
          }
        ])
      ];
    } 
*/
     } else {
      response = {
        text: `This is a default postback message for payload: ${payload}!`
      };
    }

    return response;
  }

  handlePrivateReply(type, object_id) {
    let welcomeMessage =
      i18n.__("get_started.welcome") +
      " " +
      i18n.__("get_started.guidance") +
      ". " +
      i18n.__("get_started.help");

    let response = Response.genQuickReply(welcomeMessage, [
      {
        title: i18n.__("menu.suggestion"),
        payload: "CURATION"
      },
      {
        title: i18n.__("menu.help"),
        payload: "CARE_HELP"
      }
    ]);

    let requestBody = {
      recipient: {
        [type]: object_id
      },
      message: response
    };

    GraphAPi.callSendAPI(requestBody);
  }

  sendMessage(response, delay = 0) {
    // Check if there is delay in the response
    if ("delay" in response) {
      delay = response["delay"];
      delete response["delay"];
    }

    // Construct the message body
    let requestBody = {
      recipient: {
        id: this.user.psid
      },
      message: response
    };

    // Check if there is persona id in the response
    if ("persona_id" in response) {
      let persona_id = response["persona_id"];
      delete response["persona_id"];

      requestBody = {
        recipient: {
          id: this.user.psid
        },
        message: response,
        persona_id: persona_id
      };
    }

    setTimeout(() => GraphAPi.callSendAPI(requestBody), delay);
  }

  firstEntity(nlp, name) {
    return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
  }
};
