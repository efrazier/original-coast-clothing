WEB HOOK EVENT
{ sender: { id: '3420587564686951' },
  recipient: { id: '102229501679718' },
  timestamp: 1603317418599,
  message:
   { mid: 'm_zQaWMzIl0Fw-6yPi_R75JtV62ntGIES3iKSQ9vb9ec1yhv0fgX9R5vM6WrCbxieTDTk2jZttAc5x6EooEuOCog',
     text: 'Hi',
     nlp:
      { intents: [],
        entities: [Object],
        traits: [Object],
        detected_locales: [Array] } } }
PROFILE  { firstName: 'Bob',
  lastName: 'Shepardescu',
  gender: 'male',
  locale: 'en_US',
  timezone: -6,
  id: '3420587564686951' }
New Profile PSID: 3420587564686951 with locale: en_US
USER INFO  User {
  psid: '3420587564686951',
  firstName: 'Bob',
  lastName: 'Shepardescu',
  locale: 'en_US',
  timezone: -6,
  gender: 'male' }
MESSAGE REF?  { sender: { id: '3420587564686951' },
  recipient: { id: '102229501679718' },
  timestamp: 1603317418599,
  message:
   { mid: 'm_zQaWMzIl0Fw-6yPi_R75JtV62ntGIES3iKSQ9vb9ec1yhv0fgX9R5vM6WrCbxieTDTk2jZttAc5x6EooEuOCog',
     text: 'Hi',
     nlp:
      { intents: [],
        entities: [Object],
        traits: [Object],
        detected_locales: [Array] } } }
REF --- END
MESSAGE TYPE NLP:  { 'wit$location:location':
   [ { id: '624173841772436',
       name: 'wit$location',
       role: 'location',
       start: 0,
       end: 2,
       body: 'Hi',
       confidence: 0.3146,
       entities: [],
       suggested: true,
       value: 'Hi',
       type: 'value' } ] }
wit$location:location: [object Object]
Received text: Hi for 3420587564686951
WEB HOOK EVENT
{ sender: { id: '3420587564686951' },
  recipient: { id: '102229501679718' },
  timestamp: 1603317421183,
  delivery:
   { mids:
      [ 'm_tonc6Ja7o-AKZr_TCsCmhNV62ntGIES3iKSQ9vb9ec2CBk1v3z8ia1exshVR45HDQfw9jBvCbF6cPAqjJnm95g' ],
     watermark: 1603317420726 } }
WEB HOOK EVENT
{ sender: { id: '3420587564686951' },
  recipient: { id: '102229501679718' },
  timestamp: 1603317421190,
  delivery:
   { mids:
      [ 'm_tonc6Ja7o-AKZr_TCsCmhNV62ntGIES3iKSQ9vb9ec2CBk1v3z8ia1exshVR45HDQfw9jBvCbF6cPAqjJnm95g' ],
     watermark: 1603317420726 } }
WEB HOOK EVENT
{ sender: { id: '3420587564686951' },
  recipient: { id: '102229501679718' },
  timestamp: 1603317421130,
  delivery:
   { mids:
      [ 'm_tonc6Ja7o-AKZr_TCsCmhNV62ntGIES3iKSQ9vb9ec2CBk1v3z8ia1exshVR45HDQfw9jBvCbF6cPAqjJnm95g' ],
     watermark: 1603317420726 } }
WEB HOOK EVENT
{ sender: { id: '102229501679718' },
  recipient: { id: '3420587564686951' },
  timestamp: 1603317420726,
  message:
   { mid: 'm_tonc6Ja7o-AKZr_TCsCmhNV62ntGIES3iKSQ9vb9ec2CBk1v3z8ia1exshVR45HDQfw9jBvCbF6cPAqjJnm95g',
     is_echo: true,
     text: 'Hi , This account is monitored Monday - Friday from 9am - 5pm EST. Someone from our team will contact you as soon as possible to ensure you get the help you need. You can also reach us by visiting our website https://debtsolutions.bdo.ca/ or by calling 888-855-6159',
     app_id: 759214401598917 } }
WEB HOOK EVENT
{ sender: { id: '3420587564686951' },
  recipient: { id: '102229501679718' },
  timestamp: 1603317421324,
  read: { watermark: 1603317420726 } }
Fetch failed: Error: 400
    at Request.<anonymous> (/root/bdo-messenger/services/graph-api.js:171:20)
    at emitOne (events.js:116:13)
    at Request.emit (events.js:211:7)
    at Request.onRequestResponse (/root/bdo-messenger/node_modules/request/request.js:1059:10)
    at emitOne (events.js:116:13)
    at ClientRequest.emit (events.js:211:7)
    at HTTPParser.parserOnIncomingClient (_http_client.js:551:21)
    at HTTPParser.parserOnHeadersComplete (_http_common.js:115:23)
    at TLSSocket.socketOnData (_http_client.js:440:20)
    at emitOne (events.js:116:13)
PROFILE  undefined
Profile is unavailable: TypeError: Cannot read property 'firstName' of undefined
    at User.setProfile (/root/bdo-messenger/services/user.js:24:30)
    at GraphAPi.getUserProfile.then.userProfile (/root/bdo-messenger/app.js:161:18)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
New Profile PSID: 102229501679718 with locale: en_US
USER INFO  User {
  psid: '102229501679718',
  firstName: '',
  lastName: '',
  locale: '',
  timezone: '',
  gender: 'neutral' }
MESSAGE REF?  { sender: { id: '102229501679718' },
  recipient: { id: '3420587564686951' },
  timestamp: 1603317420726,
  message:
   { mid: 'm_tonc6Ja7o-AKZr_TCsCmhNV62ntGIES3iKSQ9vb9ec2CBk1v3z8ia1exshVR45HDQfw9jBvCbF6cPAqjJnm95g',
     is_echo: true,
     text: 'Hi , This account is monitored Monday - Friday from 9am - 5pm EST. Someone from our team will contact you as soon as possible to ensure you get the help you need. You can also reach us by visiting our website https://debtsolutions.bdo.ca/ or by calling 888-855-6159',
     app_id: 759214401598917 } }
REF --- END
Received text: Hi , This account is monitored Monday - Friday from 9am - 5pm EST. Someone from our team will contact you as soon as possible to ensure you get the help you need. You can also reach us by visiting our website https://debtsolutions.bdo.ca/ or by calling 888-855-6159 for 102229501679718
WEB HOOK EVENT
{ sender: { id: '3420587564686951' },
  recipient: { id: '102229501679718' },
  timestamp: 1603317421666,
  read: { watermark: 1603317420726 } }



  Failed on BDO pageXOffset

  WEB HOOK EVENT
{ recipient: { id: '188442824523634' },
  timestamp: 1603320021459,
  sender: { id: '3661690717187986' },
  referral:
   { source: 'ADS',
     type: 'OPEN_THREAD',
     ad_id: '23846141471900099',
     ref: '' } }
SAVED Senders  { senders: [ { id: '3661690717187986' } ],
  ad_ids: [ '23846141471900099' ] }
Fetch failed: Error: 400
    at Request.<anonymous> (/root/bdo-messenger/services/graph-api.js:171:20)
    at emitOne (events.js:116:13)
    at Request.emit (events.js:211:7)
    at Request.onRequestResponse (/root/bdo-messenger/node_modules/request/request.js:1059:10)
    at emitOne (events.js:116:13)
    at ClientRequest.emit (events.js:211:7)
    at HTTPParser.parserOnIncomingClient (_http_client.js:551:21)
    at HTTPParser.parserOnHeadersComplete (_http_common.js:115:23)
    at TLSSocket.socketOnData (_http_client.js:440:20)
    at emitOne (events.js:116:13)
PROFILE  undefined
Profile is unavailable: TypeError: Cannot read property 'firstName' of undefined
    at User.setProfile (/root/bdo-messenger/services/user.js:24:30)
    at GraphAPi.getUserProfile.then.userProfile (/root/bdo-messenger/app.js:161:18)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
New Profile PSID: 3661690717187986 with locale: en_US
Received Payload:  for 3661690717187986
FBA event ''
WEB HOOK EVENT
{ sender: { id: '3661690717187986' },
  recipient: { id: '188442824523634' },
  timestamp: 1603320021129,
  message:
   { mid: 'm_JhmAzAUMQae_WR1vfvDajNtLYWb1KZFN-drD5T6zr3awRubl50ed8Bldmch5Rgv5KqEZrtC4McrfEEMnWBvM1Q',
     text: 'Yes',
     nlp:
      { intents: [],
        entities: [Object],
        traits: {},
        detected_locales: [Array] } } }
Profile already exists PSID: 3661690717187986 with locale: en_US
USER INFO  User {
  psid: '3661690717187986',
  firstName: '',
  lastName: '',
  locale: '',
  timezone: '',
  gender: 'neutral' }
MESSAGE REF?  { sender: { id: '3661690717187986' },
  recipient: { id: '188442824523634' },
  timestamp: 1603320021129,
  message:
   { mid: 'm_JhmAzAUMQae_WR1vfvDajNtLYWb1KZFN-drD5T6zr3awRubl50ed8Bldmch5Rgv5KqEZrtC4McrfEEMnWBvM1Q',
     text: 'Yes',
     nlp:
      { intents: [],
        entities: [Object],
        traits: {},
        detected_locales: [Array] } } }
REF --- END
MESSAGE TYPE NLP:  { 'wit$location:location':
   [ { id: '624173841772436',
       name: 'wit$location',
       role: 'location',
       start: 0,
       end: 3,
       body: 'Yes',
       confidence: 0.3789,
       entities: [],
       suggested: true,
       value: 'Yes',
       type: 'value' } ] }
wit$location:location: [object Object]
Received text: Yes for 3661690717187986
WEB HOOK EVENT
{ sender: { id: '3661690717187986' },
  recipient: { id: '188442824523634' },
  timestamp: 1603320022564,
  delivery:
   { mids:
      [ 'm_FAgbpGlgeDsCdvqb8LHUS9tLYWb1KZFN-drD5T6zr3b2ItZyiR1EPqIywGwKBSA48QcEOtSTN7HqX3RTFBrbcA' ],
     watermark: 1603320021681 } }
WEB HOOK EVENT
{ sender: { id: '3661690717187986' },
  recipient: { id: '188442824523634' },
  timestamp: 1603320022630,
  delivery:
   { mids:
      [ 'm_FAgbpGlgeDsCdvqb8LHUS9tLYWb1KZFN-drD5T6zr3b2ItZyiR1EPqIywGwKBSA48QcEOtSTN7HqX3RTFBrbcA' ],
     watermark: 1603320021681 } }

     