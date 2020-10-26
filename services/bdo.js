/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

// Imports dependencies
const Response = require("./response"),
  Survey = require("./survey"),
  config = require("./config"),
  i18n = require("../i18n.config");

module.exports = class Bdo {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handlePayload(payload) {
    let response;

    switch (payload) {
      case "APP_REVIEW_START":
        response = Response.genQuickReply(
          i18n.__("bdo.addstart", {
            userFirstName: this.user.firstName
          }),
          [
            {
              title: i18n.__("bdo.yes"),
              payload: "bdo_YES"
            },
            {
              title: i18n.__("bdo.research"),
              payload: "bdo_RESEARCH"
            }
          ]
        );
        break;
      case "RESEARCH":
         response = [
          Response.genText(i18n.__("bdo.prompt")),
        ];
        break;
      case "bdo_RESEARCH":
         response = [
          Response.genText(i18n.__("bdo.prompt")),
        ];
        break;

      case "YES":
         response = Response.genQuickReply(
          i18n.__("bdo.yesmenu", {
            userFirstName: this.user.firstName
          }),
          [
            {
              title: i18n.__("bdo.callusbutton"),
              payload: "bdo_callusnow",
            },
            {
              title: i18n.__("bdo.contactthem"),
              payload: "bdo_contactme"
            }
          ]
        );
        break;
      case "bdo_YES":
         response = Response.genQuickReply(
          i18n.__("bdo.yesmenu", {
            userFirstName: this.user.firstName
          }),
          [
            {
              title: i18n.__("bdo.callusbutton"),
              payload: "bdo_callusnow",
            },
            {
              title: i18n.__("bdo.contactthem"),
              payload: "bdo_contactme"
            }
          ]
        );
        break;

      case "bdo_callusnow":
	response = Response.genButtonTemplatePhone(i18n.__("bdo.callclick",{ userFirstName: this.user.firstName })   );
/*
     let buttons = [
      Response.genWebUrlButton(
        i18n.__("weburl"),
        `${config.bdoUrl}/products/outfit}`
      ),
      Response.genPostbackButton(
        i18n.__("postback"),
        "CURATION_OTHER_STYLE"
      ),
      Response.genButtonPhone(
        i18n.__("phone"),
        "+18888556159" 
      ),
    ];
   
    response = Response.genButtonTemplate(
      i18n.__("BUTTOMS"),
      buttons
    );
*/
/*
            response = Response.genQuickReply(
          i18n.__("bdo.talktosomeone", {
            userFirstName: this.user.firstName
          }),
          [
            {
              title: i18n.__("bdo.phone"),
              payload: "bdo_phone",
              content_type: "user_phone_number"
            },
             {
              title: i18n.__("bdo.email"),
              payload: "bdo_email",
              content_type: "user_email"
            }
          ]
        );
  */ 
      break;

      case "bdo_contactme":
        response = [
          Response.genText(
            i18n.__("bdo.email", {
            })
          )
        ];
        break;
      case "bdo_phone_entry":
        response = [
          Response.genText(
            i18n.__("bdo.phonethanks", 
            { name: this.user.firstName + ' ' +this.user.lastName, email:this.user.email, phone:this.user.phone }
            )
          )
        ];
        break;
      case "bdo_email_entry":
        response = [
          Response.genText(
            i18n.__("bdo.phone", {
            })
          )
        ];
        break;


    }

    return response;
  }
};
