import React from 'react';
import { Page, Navbar, PageContent, List, Panel, Link } from 'framework7-react';

export default (props) => {
  const { handleLogout, isLoggedIn } = props;

  return (
    <Panel left cover className="shadow">
      <Page>
        <Navbar title="메뉴" />
        <PageContent>
          <a href="#" className="mb-8 my-3 mx-3 px-3 flex-shrink-0 group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-14 w-14 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=wffnP1KziQ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-lg font-medium text-gray-700 group-hover:text-gray-900">배낭버스</p>
                <p className="text-sm font-normal text-gray-500 group-hover:text-gray-700">01000000000</p>
              </div>
            </div>
          </a>
          <List className="mt-0">
            <Link
              href="/notices"
              className="flex justify-start text-gray-900 hover:text-gray-900 hover:bg-gray-50 group px-6 py-2 text-base font-medium rounded-md"
              panelClose
            >
              <svg
                className="text-gray-900 group-hover:text-gray-500 mr-3 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              공지사항
            </Link>
            <Link
              href="/faqs"
              className="flex justify-start text-gray-900 hover:text-gray-900 hover:bg-gray-50 group px-6 py-2 text-base font-medium rounded-md"
              panelClose
            >
              <svg
                className="text-gray-900 group-hover:text-gray-500 mr-4 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              FAQ
            </Link>
            {isLoggedIn ? (
              <Link
                onClick={handleLogout}
                className="flex justify-start text-gray-900 hover:text-gray-900 hover:bg-gray-50 group px-6 py-2 text-base font-medium rounded-md"
                panelClose
              >
                <svg
                  className="text-gray-900 group-hover:text-gray-500 mr-4 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                로그아웃
              </Link>
            ) : null}
          </List>
        </PageContent>
      </Page>
    </Panel>
  );
};
