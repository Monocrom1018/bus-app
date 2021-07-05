import Footer from '@components/shared/Footer';
import { Button, f7ready, Page, Navbar, Toolbar, Card, List, ListItem } from 'framework7-react';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'swiper';
import sanitizeHtml from '../js/utils/sanitizeHtml';

const IntroPage = (props) => {
  const [slides, setSlides] = useState([]);

  return (
    <Page>
      <Navbar className="hidden" />
      <Toolbar bottom className="p-0" inner={false}>
        <div className="w-full flex">
          <Button className="w-full rounded-none" large href="/users/sign_in">
            로그인
          </Button>
          <Button className="w-full rounded-none" large href="/users/sign_up/intro" fill>
            회원가입
          </Button>
          <Button className="w-full rounded-none" large href="/" fill>
            배낭버스 이용하기
          </Button>
        </div>
      </Toolbar>

      <div className="text-center font-bold text-3xl">버스 대절은 배낭버스</div>

      <div className="flex flex-col text-center items-center mt-20">
        <div className="text-base tracking-widest">
          언제 어디서나
          <br />
          앱을 통해 배낭버스를 이용하세요
        </div>
        <Button className="bg-gray-900 w-32 text-white mt-2">googleStore</Button>
      </div>

      <div className="flex flex-col items-center text-center my-20">
        <div className="f7-icons text-6xl">car_fill</div>
        <div className="font-bold text-2xl mt-3">기사님/운수회사 이신가요?</div>
        <div className="m-3 italic text-gray-700">
          배낭버스의 파트너가 되어주세요.
          <br />
          5,000명의 버스기사님들이 <br />
          배낭버스와 함께 수익을 내고 계십니다.
        </div>
        <Button className="border text-lg h-10" href="/users/sign_up/intro">
          버스기사/운수회사 회원가입
        </Button>
      </div>
      <Footer />
    </Page>
  );
};
export default IntroPage;
