import React, { useState } from 'react';
import { Navbar, Page, Row, Col, List, ListItem, Toolbar, Button } from 'framework7-react';
import LineItem from '@components/shared/LineItem';
import { currency } from '@js/utils';
import { useQuery } from 'react-query';
import { getLineItems } from '@api';
import ReactQueryState from '@components/shared/ReactQueryState';

const LineItemIndexPage = () => {
  const { data: lineItems, status, error } = useQuery('line_items', getLineItems());

  return (
    <Page noToolbar>
      <Navbar title="장바구니" backLink />

      <Toolbar bottom className="item-toolbar">
        <Button fill className="w-full h-11 text-base mr-2 ml-2">
          {currency(50000)}원 바로구매 (2)
        </Button>
      </Toolbar>

      <Row noGap>
        <Col width="75">
          <List className="m-0">
            <ListItem checkbox title="전체 선택" defaultChecked />
          </List>
        </Col>
        <Col width="25">
          <List className="m-0">
            <ListItem after="선택 삭제" className="text-xs font-semibold" />
          </List>
        </Col>
      </Row>

      <ReactQueryState data={lineItems} status={status} error={error} />

      {lineItems && _.map(lineItems, (line_item) => <LineItem key={line_item.id} line_item={line_item} isCart />)}

      <hr className="border-4" />

      <div className="mb-5">
        <Row className="p-3 text-base">
          <Col width="50">총 상품금액</Col>
          <Col className="text-right mb-2" width="50">
            24,300 원
          </Col>

          <Col width="50">총 배송비</Col>
          <Col className="text-right mb-2" width="50">
            + 5,500 원
          </Col>

          <Col width="50">총 할인금액</Col>
          <Col className="text-right mb-3" width="50">
            - 10,950 원
          </Col>

          <Col className="font-bold" width="50">
            결제 금액
          </Col>
          <Col className="font-bold text-xl text-right" width="50">
            18,850 원
          </Col>
        </Row>
      </div>
    </Page>
  );
};

export default LineItemIndexPage;
