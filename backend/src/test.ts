import * as AWS from 'aws-sdk';

const client = new AWS.CognitoIdentityServiceProvider({
  region: 'local',
  accessKeyId: 'local',
  secretAccessKey: 'local',
  endpoint: 'http://localhost:9229',
});

client.signUp(
  {
    ClientId: 'dnylzvu9n5i1d7kxrroybibv0',
    Username: 'test01@insomenia.com',
    Password: '123qwe!',
    UserAttributes: [{ Name: 'email', Value: 'test01@insomenia.com' }],
  },
  (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  },
);

console.log('!23123');
