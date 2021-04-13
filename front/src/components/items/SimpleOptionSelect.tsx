import React from 'react';
import { Icon } from 'framework7-react';
import { currency } from '@js/utils';

const SimpleOptionSelect = ({ options, selectedOption, setSelectedOption }) => {
  const onChangeOption = (e) => {
    setSelectedOption(() => options.find((option) => option.id === parseInt(e.target.value, 10)));
  };

  return (
    <div className="border-gray-300 border mt-3 p-2 inline-flex w-full">
      <select onChange={onChangeOption} value={selectedOption.id} className="w-full">
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name} - {currency(option.sale_price) + '원'}
          </option>
        ))}
      </select>
      <Icon className="text-sm" f7="chevron_right" />
    </div>
  );
};

export default SimpleOptionSelect;
