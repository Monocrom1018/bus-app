const AWS = require('aws-sdk');
const b64 = require('base64-js');
const encryptionSdk = require('@aws-crypto/client-node');
const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async (event, context, callback) => {
  const { code, phone_number } = event.arguments;
  await sendMessage(phone_number, `배낭버스 - 인증번호 ${code} 입니다.`);
};

async function sendMessage(phoneNumber, message) {
  const body = new FormData();
  body.append('user_id', 'flyingmatesms');
  body.append('secure', 'e45b071e54a9e9b47367873c42a03ff9');
  body.append('sphone1', '010');
  body.append('sphone2', '9391');
  body.append('sphone3', '6522');
  body.append('smsType', message.length > 60 ? 'L' : 'S');
  body.append('rphone', phoneNumber);
  body.append('msg', message);
  await fetch('https://sslsms.cafe24.com/sms_sender.php', {
    method: 'POST',
    body,
  });
}
