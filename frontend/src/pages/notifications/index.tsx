import { Page, Navbar } from 'framework7-react';
import React from 'react';
import Notification from './Notification';

const NotificationIndexPage = () => (
  <Page>
    <Navbar title="알림목록" />
    <Notification />
  </Page>
);

export default NotificationIndexPage;
