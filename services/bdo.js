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
      case "RESEARCHffff":
        response = Response.genQuickReply(
          i18n.__("bdo.prompt", {
            userFirstName: this.user.firstName
          }),
          [
            {
              title: i18n.__("bdo.order"),
              payload: "bdo_ORDER"
            },
            {
              title: i18n.__("bdo.billing"),
              payload: "bdo_BILLING"
            },
            {
              title: i18n.__("bdo.other"),
              payload: "bdo_OTHER"
            }
          ]
        );
        break;
      case "RESEARCH":
        // Send using the Persona for order issues
/*
         response = [
          Response.genTextWithPersona(
            i18n.__("bdo.prompt", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaOrder.name,
              topic: i18n.__("bdo.order")
            }),
            config.personaOrder.id
          ),
          Response.genTextWithPersona(
            i18n.__("bdo.end"),
            config.personaOrder.id
          )
        ];
*/
         response = [
          Response.genText(i18n.__("bdo.prompt")),
          /*Response.genGenericTemplate(
            `${config.appUrl}/styles/outfit.jpg`,
            i18n.__("curation.title"),
            i18n.__("curation.subtitle"),
            [
              Response.genWebUrlButton(
                i18n.__("curation.shop"),
                `${config.research}/`
              ),
              Response.genPostbackButton(
                i18n.__("curation.show"),
                "CURATION_OTHER_STYLE"
              ),
              Response.genPostbackButton(
                i18n.__("curation.sales"),
                "CARE_SALES"
              )
            ]
          )
*/
        ];
        break;

      case "YES":
        // Send using the Persona for billing issues
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
	response = Response.genButtonTemplatePhone("Click to Call BDO 888-855-6159");
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
        // Send using the Persona for customer bdo issues
        response = [
          Response.genText(
            i18n.__("bdo.phone", {
            })
          )
        ];
        break;
      case "bdo_phone_entry":
  console.log("CASE PHONE ENTERED");
      response = [
          Response.genText(
            i18n.__("bdo.phonethanks", {
            })
          )
        ];
        break;
    }

    return response;
  }
};
