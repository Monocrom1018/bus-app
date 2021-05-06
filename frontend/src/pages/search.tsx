import { Block, BlockTitle, Button, Icon, Link, List, ListInput, Navbar, NavLeft, NavTitle, Page } from 'framework7-react';
import React, { useEffect } from 'react';

const SearchPage = () => {
  const test = 'test';

  return (
    <Page name="search">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>검색</NavTitle>
      </Navbar>
      <Block className="my-10">
        <BlockTitle className="text-center text-xl">내용을 입력하고 예약해보세요</BlockTitle>
      </Block>
      <List noHairlinesMd>
        <ListInput outline label="언제" floatingLabel type="text" placeholder="언제" clearButton />
        <ListInput outline label="출발지" floatingLabel type="text" placeholder="출발지" clearButton />
        <ListInput outline label="경유지" floatingLabel type="text" placeholder="경유지" clearButton />
        <ListInput outline label="도착지" floatingLabel type="text" placeholder="도착지" clearButton />
        <ListInput outline label="인원수" floatingLabel type="text" placeholder="인원수" clearButton />
        <Button text="견적신청" className="bg-red-500 text-white mt-8 mx-4 h-10" />
      </List>
    </Page>
  );
};

export default SearchPage;
