import {
  f7,
  Block,
  BlockTitle,
  Button,
  Link,
  List,
  ListInput,
  Navbar,
  NavLeft,
  NavTitle,
  Page,
} from 'framework7-react';
import React from 'react';

// TODO : 서버로 api요청 보내서 거기서 빌링키 발급 받도록 해야 함.
// TODO : 서버에서 처리한 후 200응답 받으면 카드등록 완료됐다고 보여주기

const SuccessPage = () => {
  const test = 'test';

  return (
    <Page name="success">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>success</NavTitle>
      </Navbar>
      <Block className="my-10">
        <BlockTitle className="text-center text-xl text-gray-900">success</BlockTitle>
      </Block>
    </Page>
  );
};

export default SuccessPage;
