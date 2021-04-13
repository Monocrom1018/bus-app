import React, { useState, useCallback } from 'react';
import { f7, Navbar, Page, Fab, Icon } from 'framework7-react';

const ContactIndexPage = (props) => {
  return (
    <Page noToolbar>
      <Navbar title="문의내역"></Navbar>
      <Fab position="right-bottom" href="/contacts/new">
        <Icon ios="f7:plus" aurora="f7:plus" md="material:add" />
      </Fab>
    </Page>
  );
};

export default ContactIndexPage;