import React from 'react';
import ReactDOM from 'react-dom';
import Framework7React from 'framework7-react';
import Framework7 from '@js/framework7-custom';
import '@styles/framework7-custom.less';
import '@styles/icons.css';
import '@styles/app.less';
import App from '@components/App';
import Auth from '@aws-amplify/auth';
import Amplify from 'aws-amplify';
import { getCognitoMockConfig } from '@utils/cognito-client';
import i18n from './assets/lang/i18n';
import awsconfig from './aws-exports';
import 'lodash';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

Amplify.configure({
  ...awsconfig,
  ...(IS_PRODUCTION ? {} : getCognitoMockConfig()),
});

const globalAny: any = global;
globalAny.i18next = i18n;

Framework7.use(Framework7React);
ReactDOM.render(React.createElement(App), document.getElementById('app'));
