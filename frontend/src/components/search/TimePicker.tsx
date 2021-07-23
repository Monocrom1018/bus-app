import React, { useState, useEffect } from 'react';
import { f7, Input } from 'framework7-react';

const TimePicker = (props) => {
  const { el } = props;
  const { Times, setTimes } = props;

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
          setTimes((prev) => ({
            ...prev,
            [el]: v,
          }));
        },
      },
    });
  }, []);

  return (
    <div className="">
      <Input wrap={false} type="text" placeholder="select time" readonly inputId={`${el}_picker`} />
    </div>
  );
};

export default TimePicker;
