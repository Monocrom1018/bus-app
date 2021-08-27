import React from 'react';
import { Page, Navbar, PageContent, List, Panel, Link } from 'framework7-react';
import S3ImageView from '@components/images/S3ImageView';

const CustomPanel = ({ currentUser, handleLogout, isLoggedIn }) => {

  const { email, name, profile = { key: '', level: '' } } = currentUser;

  return (
    <Panel left cover className="shadow">
      <Page>
        <Navbar title="메뉴" />
        <PageContent>
          <a href="#" className="mb-8 my-2 mx-2 px-3 flex-shrink-0 group block">
            <div className="flex items-center">
              <div>
                { isLoggedIn && profile ? 
                  (
                    <S3ImageView imageKey={profile.key} className="w-16 h-16 rounded-full"/>
                  ) : (
                    <i className="las la-user-circle" style={{ fontSize: '64px', color: '#374151' }} />
                  )
                }
              </div>
              <div className="ml-3">
                <p className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                  {isLoggedIn ? name : '배낭버스'}
                </p>
                <p
                  className="text-sm font-normal text-gray-500 group-hover:text-gray-700"
                  style={{ overflowWrap: 'anywhere' }}
                >
                  {isLoggedIn ? email : 'test@bus.com'}
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
            ) : (
              <div>
                <Link
                  href="/users/sign_in"
                  className="flex justify-start text-gray-900 hover:text-gray-900 hover:bg-gray-50 group px-6 py-4 text-base font-medium rounded-md"
                  panelClose
                >
                  <i className="las la-sign-out-alt mr-4" style={{ fontSize: '28px', color: '#374151' }} />
                  로그인
                </Link>
                <Link
                  href="/users/sign_up/intro"
                  className="flex justify-start text-gray-900 hover:text-gray-900 hover:bg-gray-50 group px-6 py-4 text-base font-medium rounded-md"
                  panelClose
                >
                  <i className="las la-sign-out-alt mr-4" style={{ fontSize: '28px', color: '#374151' }} />
                  회원가입
                </Link>
              </div>
            )}
          </List>
        </PageContent>
      </Page>
    </Panel>
  );
};

export default CustomPanel;
