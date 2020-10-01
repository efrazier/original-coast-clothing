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
              title: i18n.__("bdo.struggle"),
              payload: "bdo_struggle"
            },
            {
              title: i18n.__("bdo.minpay"),
              payload: "bdo_minpay"
            },
            {
              title: i18n.__("bdo.advice"),
              payload: "bdo_advice"
            },
            {
              title: i18n.__("bdo.reduce"),
              payload: "bdo_reduce"
            },
             {
              title: i18n.__("bdo.reduce"),
              payload: "bdo_reduce",
              content_type: "user_email"
            }
          ]
        );
        break;

      case "bdo_reduce":

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
        break;

      case "bdo_OTHER":
        // Send using the Persona for customer bdo issues

        response = [
          Response.genTextWithPersona(
            i18n.__("bdo.default", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personabdo.name
            }),
            config.personabdo.id
          ),
          Response.genTextWithPersona(
            i18n.__("bdo.end"),
            config.personabdo.id
          ),
          Survey.genAgentRating(config.personabdo.name)
        ];
        break;
    }

    return response;
  }
};
