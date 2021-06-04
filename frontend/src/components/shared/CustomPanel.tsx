import React from 'react';
import { Page, Navbar, PageContent, List, Panel, Link } from 'framework7-react';

const CustomPanel = ({ currentUser, handleLogout, isLoggedIn }) => (
  <Panel left cover className="shadow">
    <Page>
      <Navbar title="메뉴" />
      <PageContent>
        <a href="#" className="mb-8 my-2 mx-2 px-3 flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <i className="las la-user-circle" style={{ fontSize: '64px', color: '#374151' }} />
            </div>
            <div className="ml-3">
              <p className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                {isLoggedIn ? currentUser.name : '배낭버스'}
              </p>
              <p
                className="text-sm font-normal text-gray-500 group-hover:text-gray-700"
                style={{ overflowWrap: 'anywhere' }}
              >
                {isLoggedIn ? currentUser.email : 'test@bus.com'}
              </p>
            </div>
          </div>
        </a>
        <List className="mt-0">
          <Link
            href="/notices"
            className="flex justify-start text-gray-900 hover:text-gray-900 hover:bg-gray-50 group px-6 py-4 text-base font-medium rounded-md"
            panelClose
          >
            <i className="las la-calendar-check mr-4" style={{ fontSize: '28px', color: '#374151' }} />
            공지사항
          </Link>
          <Link
            href="/faqs"
            className="flex justify-start text-gray-900 hover:text-gray-900 hover:bg-gray-50 group px-6 py-4 text-base font-medium rounded-md"
            panelClose
          >
            <i className="las la-question-circle mr-4" style={{ fontSize: '28px', color: '#374151' }} />
            FAQ
          </Link>
          {isLoggedIn ? (
            <Link
              onClick={handleLogout}
              className="flex justify-start text-gray-900 hover:text-gray-900 hover:bg-gray-50 group px-6 py-4 text-base font-medium rounded-md"
              panelClose
            >
              <i className="las la-sign-out-alt mr-4" style={{ fontSize: '28px', color: '#374151' }} />
              로그아웃
            </Link>
          ) : null}
        </List>
      </PageContent>
    </Page>
  </Panel>
);

export default CustomPanel;