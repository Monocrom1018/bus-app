// API_BACKPACKBUSDEV_GRAPHQLAPIENDPOINTOUTPUT;
// API_BACKPACKBUSDEV_GRAPHQLAPIIDOUTPUT;
// AUTH_BACKPACKBUSDEVFE582237_USERPOOLID;
// ENV;
// REGION;

const AWSAppSyncClient = require('aws-appsync').default;
const AWS = require('aws-sdk');
const { AUTH_TYPE } = require('aws-appsync-auth-link');
const gql = require('graphql-tag');
global.fetch = require('node-fetch');

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
  region: 'ap-northeast-2',
});

let graphqlClient;

const createNotification = /* GraphQL */ `
  mutation CreateNotification($input: CreateNotificationInput!, $condition: ModelNotificationConditionInput) {
    createNotification(input: $input, condition: $condition) {
      id
      title
      receiver_id
      content
      redirect_to
      target_type
      target_id
      createdAt
      updatedAt
    }
  }
`;

exports.handler = async (event, context, callback) => {
  console.log(event);
  const { receiver_id, content, target_type, target_id, title, redirect_to } = event.arguments;

  if (event.arguments.content.length > 140) {
    callback('content length is over 140', null);
  }

  const { env } = process;
  // console.log({
  //   accessKeyId: env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  //   sessionToken: env.AWS_SESSION_TOKEN,
  // });

  if (!graphqlClient) {
    graphqlClient = new AWSAppSyncClient({
      url: env.API_BACKPACKBUSDEV_GRAPHQLAPIENDPOINTOUTPUT,
      region: env.REGION,
      auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: event.request.headers.authorization,
      },
      disableOffline: true,
    });
  }

  const notificationInput = {
    mutation: gql(createNotification),
    variables: {
      input: {
        receiver_id,
        content,
        target_type,
        target_id,
        title,
        redirect_to,
      },
    },
  };
  const res = await graphqlClient.mutate(notificationInput);

  const receiverUser = await cognitoidentityserviceprovider
    .adminGetUser({
      UserPoolId: env.AUTH_BACKPACKBUSDEVFE582237_USERPOOLID,
      Username: receiver_id,
    })
    .promise();

  console.log(receiverUser);
  // const admin = require('firebase-admin')

  // let serAccount = require('../서버 키 이름.json')

  // admin.initializeApp({
  //   credential: admin.credential.cert(serAccount),
  // })
  // let token = receiverUser의 devise token
  // let message = {
  //   data: {
  //     title: 'title',
  //     body: '~',
  //     style: '~~',
  //   },
  //  token,
  // }

  // await admin.messaging().send(message).promise()

  return res;
};
