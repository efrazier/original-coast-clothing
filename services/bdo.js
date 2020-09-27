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

module.exports = class bdo {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handlePayload(payload) {
    let response;

    switch (payload) {
      case "bdo_HELP":
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
      case "bdo_ORDER":
        // Send using the Persona for order issues

        response = [
          Response.genTextWithPersona(
            i18n.__("bdo.issue", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaOrder.name,
              topic: i18n.__("bdo.order")
            }),
            config.personaOrder.id
          ),
          Response.genTextWithPersona(
            i18n.__("bdo.end"),
            config.personaOrder.id
          ),
          Survey.genAgentRating(config.personaOrder.name)
        ];
        break;

      case "bdo_BILLING":
        // Send using the Persona for billing issues

        response = [
          Response.genTextWithPersona(
            i18n.__("bdo.issue", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaBilling.name,
              topic: i18n.__("bdo.billing")
            }),
            config.personaBilling.id
          ),
          Response.genTextWithPersona(
            i18n.__("bdo.end"),
            config.personaBilling.id
          ),
          Survey.genAgentRating(config.personaBilling.name)
        ];
        break;

      case "bdo_SALES":
        // Send using the Persona for sales questions

        response = [
          Response.genTextWithPersona(
            i18n.__("bdo.style", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaSales.name
            }),
            config.personaSales.id
          ),
          Response.genTextWithPersona(
            i18n.__("bdo.end"),
            config.personaSales.id
          ),
          Survey.genAgentRating(config.personaSales.name)
        ];
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
