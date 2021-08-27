import { Card, Page, Navbar, Button, Block, BlockTitle, f7 } from 'framework7-react';
import React from 'react';
import { useRecoilState } from 'recoil';
import { currentUserState, totalChargeState } from '@atoms';
import { loadTossPayments } from '@tosspayments/sdk';
import { IoCloseCircle } from 'react-icons/io5';
import { deleteBillingKey } from '@api';
import { showToast } from '@js/utils';
import { sleep } from '@utils';

const CardPage = () => {
  const [ currentUser, setCurrentUser ] = useRecoilState(currentUserState);
  const clientKey = 'test_ck_7XZYkKL4Mrj9XXponbaV0zJwlEWR';
  const { card_number, card_company, uuid } = currentUser;

  const startPayments = async () => {
    const tossPayments = await loadTossPayments(clientKey);

    tossPayments.requestBillingAuth('카드', {
      customerKey: uuid,
      successUrl: `${window.location.origin}?result=success`,
      failUrl: `${window.location.origin}?result=fail`,
    });
  };

  const deleteCard = async () => {
    f7.dialog.confirm("카드를 삭제하시겠습니까?", async () => {
      let message: string;
      f7.dialog.preloader('잠시만 기다려주세요...');
      await sleep(400);
      try {
        const user =await deleteBillingKey();
        setCurrentUser({ ...user, isAuthenticated: true });
        f7.dialog.close();
        message = "카드가 삭제되었습니다"
      } catch(error) {
        if (typeof error.message === 'string') message = error.message;
        else message = '예상치 못한 오류가 발생하였습니다';
        f7.dialog.close();
      } finally {
        showToast(message)
      }
    })
  }

  return (
    <Page className="bg-white" noToolbar>
      <Navbar title="카드목록" backLink />
      {currentUser.card_registered ? (
        <Card className="flex justify-between items-center h-10 px-5">
          <div className="font-bold">{card_company}</div>
          <div className="font-bold">{card_number}</div>
          <div className="image-slide-delete-btn absolute -top-3 -right-3" onClick={deleteCard}>
              <IoCloseCircle size="25px" />
            </div>
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
