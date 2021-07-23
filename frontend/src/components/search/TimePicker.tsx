import React, { useState, useEffect } from 'react';
import { f7, Input, ListInput } from 'framework7-react';
import { searchingOptionState } from '@atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

const TimePicker = (props) => {
  const { el } = props;
  // const { Times, setTimes } = props;
  // const searchingOption = useRecoilValue(searchingOptionState);
  const [searchingOption, setSearchingOption] = useRecoilState(searchingOptionState);

  useEffect(() => {
    f7.picker.create({
      inputEl: `#${el}_picker`,
      rotateEffect: true,
      backdrop: true,
      cols: [
        {
          textAlign: 'left',
          values: '0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23'.split(' '),
        },
        {
          values: '00 10 20 30 40 50'.split(' '),
        },
      ],
      on: {
        change(p, v: Array<string>, d) {
          console.log(v);
          setSearchingOption({ ...searchingOption, time: { ...searchingOption.time, [el]: v } });
        },
      },
    });
  }, []);

  return (
    <div className="">
      <ListInput
        label="탑승시간"
        wrap={false}
        type="text"
        placeholder="탑승시간을 선택해주세요"
        readonly
        inputId={`${el}_picker`}
        className="bg-gray-50 mb-4 h-20 border rounded-lg mr-3 p-3"
      />
    </div>
  );
};

export default TimePicker;
