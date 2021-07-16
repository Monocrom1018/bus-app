import React from 'react';
import { Navbar, Page, Fab, Icon } from 'framework7-react';

const ContactIndexPage = () => (
  <Page noToolbar>
    <Navbar backLink title="문의내역" />

    {/* 문의내역이 없는 경우 */}
    <div className="text-center mt-60">
      <i className="f7-icons text-8xl text-gray-400">question_circle</i>
      <div className="text-xl text-gray-400 mt-4 tracking-wide">문의내역이 없습니다 :)</div>
    </div>

    <Fab position="right-bottom" href="/contacts/new">
      <Icon ios="f7:plus" aurora="f7:plus" md="material:add" />
    </Fab>
  </Page>
);

export default ContactIndexPage;
