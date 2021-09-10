import React from 'react';
import useAuth from '@hooks/useAuth';
import { f7, Navbar, Page, NavLeft, NavTitle, Link, List } from 'framework7-react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '@atoms';
import S3ImageView from '@components/images/S3ImageView';

const MyPage = () => {
  const { signOutUser, currentUser } = useAuth();
  const user = useRecoilValue(currentUserState);
  const { email, name, profile = { key: '', level: '' } } = user;

  const handleSignout = () => {
    f7.dialog.confirm('로그아웃 하시겠어요?', async () => {
      await signOutUser();
      window.location.replace('/');
    });
  };

  return (
    <Page ptr ptrPreloader>
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>마이페이지</NavTitle>
      </Navbar>

      <div className="ml-4 mt-6 -mb-3 flex items-center ">
        <div className="mr-4">
          <S3ImageView imageKey={profile?.key || ''} className="w-16 h-16 rounded-full" />
        </div>
        <div className="flex-shrink-1">
          <h4 className="text-lg font-bold">{name || '비회원'}</h4>
          <p className="text-sm text-gray-600">{email || '로그인하시고 모든 서비스를 이용하세요'}</p>
        </div>
      </div>

      {currentUser.isAuthenticated ? (
        <List linksList>
          <li>
            <a href="/notices">공지사항</a>
          </li>
          <li>
            <a href="/faqs">자주 묻는 질문</a>
          </li>
          <li>
            <a href="/reservations/pastReservationList">예약내역</a>
          </li>
          <li>
            <a href="/contacts">이메일 문의</a>
          </li>
          <li>
            {currentUser.user_type === 'normal' ? (
              <>
                <a href="/users/edit">회원정보 수정</a>
                <a href="/users/card">카드목록</a>
              </>
            ) : (
              <a href="/users/driverEdit">회원정보 수정</a>
            )}
          </li>
          <li>
            <a onClick={handleSignout}>로그아웃</a>
          </li>
          <Link className="button" href="/chatrooms/a123/single?user_id=584">
            584메시지
          </Link>
          <Link className="button" href="/chatrooms/a123/single?user_id=573">
            573메시지
          </Link>
        </List>
      ) : (
        <>
          <List linksList>
            <li>
              <a href="/notices">공지사항</a>
            </li>
            <li>
              <a href="/faqs">자주 묻는 질문</a>
            </li>
            <li>
              <a href="/users/sign_in">로그인</a>
            </li>
            <li>
              <a href="/users/sign_up/intro">회원가입</a>
            </li>
          </List>
        </>
      )}
    </Page>
  );
};

export default MyPage;
