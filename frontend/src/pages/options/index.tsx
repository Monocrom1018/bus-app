import React from 'react';
import { Navbar, Page, List, ListItem, f7 } from 'framework7-react';
import { useQuery, useQueryClient } from 'react-query';
import { getOptions, API_URL } from '@api';
import ReactQueryState from '@components/shared/ReactQueryState';
import { saleRate, currency } from '@js/utils';

const OptionIndexPage = ({ f7route, f7router, selectedOption, setSelectedOption }) => {
  const { item_id } = f7route.params;
  const queryClient = useQueryClient();

  const OPTIONS_KEY = ['options', parseInt(item_id, 10)];
  const {
    data: options,
    status,
    error,
  } = useQuery(OPTIONS_KEY, getOptions(item_id), {
    enabled: !!item_id,
  });

  const onClickOption = async (option) => {
    setSelectedOption(option);
    f7router.back();
  };

  return (
    <Page noToolbar>
      <Navbar title="옵션 선택" backLink />
      <ReactQueryState data={options} status={status} error={error} />

      {options &&
        _.map(options, (option) => (
          <List key={option.id} mediaList className="m-0">
            <ListItem
              link="#"
              className={selectedOption?.id === option.id && `bg-gray-100`}
              disabled={option.stock === 0}
              onClick={() => onClickOption(option)}
              title={option.name}
              after="선택"
              subtitle={currency(option.sale_price) + '원' + ((option.stock === 0 && ' (품절)') || '')}
              text={saleRate(option) !== 0 && saleRate(option) + '% 할인'}
            >
              <img slot="media" src={API_URL + option.item.image_path} width="80" />
            </ListItem>
          </List>
        ))}
    </Page>
  );
};

export default OptionIndexPage;
