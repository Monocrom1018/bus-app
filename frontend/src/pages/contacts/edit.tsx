import React, { useState, useCallback } from 'react';
import { f7, Navbar, Page } from 'framework7-react';
import { getObject } from '@api';
import { useQuery } from 'react-query';
import ReactQueryState from '../../components/shared/ReactQueryState';
import ContactForm from './form';

const ContactEditPage = ({ f7route, f7router }) => {
  const contactId = f7route.params.id;
  const CONTACT_KEY = ['contact', parseInt(contactId)];
  const {
    status,
    data: contact,
    error,
  } = useQuery(
    CONTACT_KEY,
    getObject({
      id: contactId,
      model_name: 'contact',
    }),
    {
      enabled: !!contactId,
    },
  );

  return (
    <Page noToolbar>
      <Navbar title="게시글 수정" backLink />
      <ReactQueryState data={contact} status={status} error={error} />
      {contact && <ContactForm contact={contact} f7router={f7router} />}
    </Page>
  );
};

export default ContactEditPage;
