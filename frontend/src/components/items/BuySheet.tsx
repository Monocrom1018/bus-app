import React from 'react';
import { PageContent, Sheet, Icon, Link, Row, Col, Stepper, Button } from 'framework7-react';
import { currency, toast } from '@js/utils';
import { createLineItem } from '@api';
import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { lineItemsCount } from '@atoms';

const BuySheet = ({ selectedOption, quantity, setQuantity }) => {
  const addCartMutation = useMutation(createLineItem(), {
    onSuccess: (data, variables, context) => {
      toast.get().setToastText('상품을 담았습니다').setToastIcon('cart_badge_plus').openIconToast();
    },
    onError: (error, variables, context) => {
      console.log(`에러가 발생했습니다: `, error);
    },
  });
  const queryClient = useQueryClient();
  const setLineItemsCount = useSetRecoilState(lineItemsCount);

  const onClickAddCart = () => {
    addCartMutation.mutate(
      {
        line_item: { option_id: selectedOption.id, quantity: quantity },
      },
      {
        onSuccess: (data) => {
          setLineItemsCount(() => data.line_items_count);
        },
      },
    );
  };

  const onClickBuyNow = () => {};

  return (
    <Sheet className="buy-sheet" style={{ height: 'auto', '--f7-sheet-bg-color': '#fff' }} swipeToClose backdrop>
      <PageContent>
        <div className="text-center">
          <Link sheetClose>
            <Icon f7="chevron_down" className="text-lg text-gray-400 font-semibold p-1" />
          </Link>
        </div>
        <div className="p-3">
          <div className="border-b border-gray-300">
            <p className="text-sm text-gray-500 font-bold">{selectedOption.name}</p>
            <p className="text-xl font-bold mt-1">{currency(selectedOption.sale_price * quantity)}원</p>
            <p className="mb-2">일반택배</p>
          </div>
          <Row className="mt-2 mb-2 text-right border-b border-gray-300">
            <Col className="mb-1">
              <Stepper large value={quantity} onStepperChange={setQuantity} min={1} max={1000} />
            </Col>
          </Row>
          <Row>
            <Col tag="span">
              <Button onClick={onClickAddCart} sheetClose large raised>
                장바구니 담기
              </Button>
            </Col>
            <Col tag="span">
              <Button sheetClose large raised fill>
                바로구매
              </Button>
            </Col>
          </Row>
        </div>
      </PageContent>
    </Sheet>
  );
};

export default BuySheet;
