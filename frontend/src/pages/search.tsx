import {
  Block,
  BlockTitle,
  Button,
  Icon,
  Link,
  List,
  ListInput,
  Navbar,
  NavLeft,
  NavTitle,
  Page,
  Segmented,
} from 'framework7-react';
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
        <Segmented strong round className="mx-4">
          <Button>왕복</Button>
          <Button>편도</Button>
        </Segmented>
        <ListInput outline label="가는날" floatingLabel type="text" placeholder="가는날" clearButton />
        <ListInput outline label="오는날" floatingLabel type="text" placeholder="오는날" clearButton />
        <ListInput outline label="출발지" floatingLabel type="text" placeholder="출발지" clearButton />
        <ListInput outline label="경유지" floatingLabel type="text" placeholder="경유지" clearButton />
        <ListInput outline label="도착지" floatingLabel type="text" placeholder="도착지" clearButton />
        <ListInput outline label="인원수" floatingLabel type="text" placeholder="인원수" clearButton />
        <Button href="/driverlists" text="검색" className="bg-red-500 text-white mt-8 mx-4 h-10 text-lg" />
      </List>
    </Page>
  );
};

export default SearchPage;
