import React from 'react';
import { Icon } from 'framework7-react';

const OptionSelect = ({ target, f7router, selectedOption, setSelectedOption, id }) => {
  return (
    <a
      href="#"
      onClick={() => {
        f7router.navigate(`/items/${id}/options`, {
          props: {
            selectedOption: selectedOption,
            setSelectedOption: setSelectedOption,
          },
        });
      }}
      className="link block border border-gray-300 active:bg-gray-700 mt-3 p-2"
    >
      {target.name}
      <Icon className="text-sm float-right" f7="chevron_right" />
    </a>
  );
};

export default OptionSelect;
