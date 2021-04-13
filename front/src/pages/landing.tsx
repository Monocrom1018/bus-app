import React from 'react';
import { Page } from 'framework7-react';
import logo from '../assets/images/logo.png';

const LandingPage = () => (
  <Page>
    <div className="w-full h-screen flex justify-center items-center">
      <img src={logo} alt="insomenia-logo" className="w-48 h-48" />
    </div>
  </Page>
);

export default LandingPage;
