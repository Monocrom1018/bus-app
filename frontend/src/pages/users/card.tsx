import { Card, Page, Navbar, Button, Block, BlockTitle } from 'framework7-react';
import React, { Fragment } from 'react';
import { useRecoilState } from 'recoil';
import { totalChargeState } from '@atoms';
import { loadTossPayments } from '@tosspayments/sdk';
import useAuth from '@hooks/useAuth';

const CardPage = () => {
  const a = 'test';
  const { currentUser } = useAuth();
  const clientKey = 'test_ck_7XZYkKL4Mrj9XXponbaV0zJwlEWR';
  const { card_number, card_company, uuid } = currentUser;

  const startPayments = async () => {
    const tossPayments = await loadTossPayments(clientKey);

    tossPayments.requestBillingAuth('카드', {
      customerKey: uuid,
      successUrl: window.location.origin + '?result=success',
      failUrl: window.location.origin + '?result=fail',
    });
  };

  return (
    <Page className="bg-white" noToolbar>
      <Navbar title="카드목록" backLink />
      {currentUser.card_registerd ? (
        <Card className="flex justify-between items-center h-10 px-5">
          <div className="font-bold">{card_company}</div>
          <div className="font-bold">{card_number}</div>
        </Card>
      ) : (
        <div className="flex flex-col items-center">
          <Block className="my-10">
            <BlockTitle className="text-center text-xl text-gray-700">등록된 카드가 없습니다</BlockTitle>
          </Block>
          <Button fill raised className="mt-20 h-32 w-80 font-fold text-xl" onClick={startPayments}>
            카드등록
          </Button>
        </div>
      )}
    </Page>
  );
};

export default CardPage;
