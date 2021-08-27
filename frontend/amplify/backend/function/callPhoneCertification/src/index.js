const AWS = require('aws-sdk');
const b64 = require('base64-js');
const encryptionSdk = require('@aws-crypto/client-node');
const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      `event: ${JSON.stringify(event, null, 2)}, context: ${JSON.stringify(context, null, 2)}, callback: ${callback}`,
    ),
  };
  return response;
};

async function sendMessage(phoneNumber, message) {
  const body = new FormData();
  body.append('user_id', 'flyingmatesms');
  body.append('secure', '');
  body.append('sphone1', '010');
  body.append('sphone2', '1234');
  body.append('sphone3', '1234');
  body.append('smsType', message.length > 60 ? 'L' : 'S');
  body.append('rphone', phoneNumber);
  body.append('msg', message);
  await fetch('https://sslsms.cafe24.com/sms_sender.php', {
    method: 'POST',
    body,
  });
}
