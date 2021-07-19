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

const FailPage = () => {
  const test = 'test';

  return (
    <Page name="fail">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>fail</NavTitle>
      </Navbar>
      <Block className="my-10">
        <BlockTitle className="text-center text-xl text-gray-900">fail</BlockTitle>
      </Block>
    </Page>
  );
};

export default FailPage;
