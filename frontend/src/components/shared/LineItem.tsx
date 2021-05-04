import React, { useRef, useState } from 'react';
import { f7, Row, Col, Checkbox, Button, List, ListInput } from 'framework7-react';
import { currency } from '@js/utils';
import { API_URL, deleteLineItem, changeLineItemQuantity } from '@api';
import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { lineItemsCount } from '@atoms';
import Select from 'react-select';

interface LineItemProps {
  line_item: any;
  isCart?: boolean;
}

const LineItem = ({ line_item, isCart = false }: LineItemProps) => {
  const deleteMutation = useMutation(deleteLineItem());
  const queryClient = useQueryClient();
  const setLineItemsCount = useSetRecoilState(lineItemsCount);

  const optionFormatter = (value) => ({ value: value, label: value });

  const [lineItem, setLineItem] = useState(line_item);
  const [directInput, setDirectInput] = useState<boolean>(false);
  const quantitySelect = useRef(null);
  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'].map((val) => optionFormatter(val));

  const changeQuantityMutation = useMutation(changeLineItemQuantity(line_item.id), {
    onSuccess: async (data) => {
      await setLineItem(data);
      f7.preloader.hide();
    },
  });

  const onClickRemoveLineItem = (lineItemId) => {
    deleteMutation.mutate(lineItemId, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('line_items');
        await setLineItemsCount(() => data.line_items_count);
      },
    });
  };

  const onChangeQuantity = async (option) => {
    if (option.value === '10+') {
      setDirectInput(true);
    } else {
      await setLineItem((li) => ({
        ...li,
        quantity: option.value,
      }));
      f7.preloader.show();
      await changeQuantityMutation.mutate({ quantity: option.value });
    }
  };

  return (
    <Row className="p-2">
      {isCart && (
        <Col width="10">
          <Checkbox name="checkbox-2" className="mt-2" checked={lineItem.is_checked}></Checkbox>
        </Col>
      )}
      <Col width="25" className="p-1">
        <img src={API_URL + lineItem.option.item.image_path} className="w-screen rounded" />
      </Col>
      <Col width={isCart ? '65' : '75'} className="p-1">
        <p className="text-base">
          [{lineItem.option.item.category.title}] {lineItem.option.name}
        </p>
        <p className="text-lg font-bold mt-2">{`${currency(lineItem.unit_price * lineItem.quantity)}원`}</p>
        <p className="text-gray-400 bold text-xs mt-2">배송비 무료 | 일반택배</p>

        {isCart && (
          <>
            <Row className="mt-4">
              <Col>
                {directInput ? (
                  <List noHairlines className="m-0 p-0">
                    <ListInput outline type="text" ref={quantitySelect} />
                  </List>
                ) : (
                  <Select
                    value={optionFormatter(lineItem.quantity)}
                    options={quantityOptions}
                    onChange={onChangeQuantity}
                    placeholder=""
                    blurInputOnSelect={false}
                    maxMenuHeight={140}
                  />
                )}
              </Col>
              <Col>
                <Button onClick={() => onClickRemoveLineItem(lineItem.id)} outline>
                  삭제
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

export default LineItem;
