import React from 'react';
import { Page, Navbar, NavTitle, Block, Input } from 'framework7-react';
import Driver from '../users/Driver';

const DriverListPage = () => (
  <Page noToolbar name="driverlist">
    <Navbar backLink>
      <NavTitle>검색결과</NavTitle>
    </Navbar>
    <Block className="border-t-2 pt-8">
      <div className="flex justify-end">
        <Input type="select" defaultValue="가격순" className="w-28 mx-4 px-1 border-b-2 border-red-400">
          <option value="가격순">가격순</option>
          <option value="등록순">등록순</option>
          <option value="차량크기순">차량크기순</option>
          <option value="연식순">차량연식순</option>
        </Input>
      </div>
      <Driver />
      <Driver />
      <Driver />
      <Driver />
    </Block>
  </Page>
);
export default DriverListPage;
