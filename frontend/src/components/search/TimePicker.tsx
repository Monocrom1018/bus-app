import React, { useEffect } from 'react';
import { f7, ListInput } from 'framework7-react';
import { searchingOptionState } from '@atoms';
import { useSetRecoilState } from 'recoil';
import { formatTime } from '@utils';

const TimePicker = (props: { el: string }) => {
  const setSearchingOption = useSetRecoilState(searchingOptionState);
  const { el } = props;

  useEffect(() => {
    f7.picker.create({
      inputEl: `#${el}_picker`,
      rotateEffect: true,
      backdrop: true,
      value: ['0', '00'],
      formatValue: function (values) {
        return `${values[0]} : ${values[1]}`;
      },
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
        change(picker, value: Array<string>, displayValues) {
          setSearchingOption((state) => ({ ...state, ...{ [`${el}`]: value.join(' ') } }));
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
