import React from 'react';

import { Navbar, Page, NavTitle, Button } from 'framework7-react';

const SignUpIntroPage = () => (
  <Page name="SignUpIntro" className="relative" noToolbar>
    <Navbar backLink>
      <NavTitle>가입유형 선택</NavTitle>
    </Navbar>
    <div className="mx-12 py-14 text-center text-lg text-gray-700 italic">
      회원가입 하시면 <br />
      배낭버스의 다양한 서비스를 <br />
      이용하실 수 있습니다
    </div>
    <div>
      <div className="flex justify-between text-center mx-20">
        <div className="text-center">
          <a href="/users/sign_up/normal">
            <div className="f7-icons text-6xl text-red-400">person</div>
            <br />
            <span className="text-sm text-gray-600 font-semibold text-base text-red-400">승객</span>
          </a>
        </div>
        <div className="text-center">
          <a href="/users/sign_up/driver">
            <div className="fas fa-bus text-6xl" />
            <br />
            <span className="text-sm text-gray-600 font-semibold text-base">기사님</span>
          </a>
        </div>
      </div>
    </div>

    <div className="flex flex-col items-center pt-14">
      <div className="text-center text-gray-500 italic">이미 계정이 있으신가요?</div>
      <Button href="/users/sign_in" className="border w-20 mt-4">
        로그인
      </Button>
    </div>

    <footer className="bg-gray-100 absolute bottom-0">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="md:mt-0 md:order-1">
          <p className="text-xs text-gray-400">
            <a href="#">이용약관 </a> | <a href="#">개인정보처리방침</a>
          </p>

          <p className="mt-2 text-xs text-gray-400">회원가입 시 위 이용약관﹒개인정보처리방침 동의로 간주합니다.</p>
        </div>
      </div>
    </footer>
  </Page>
);

export default SignUpIntroPage;
