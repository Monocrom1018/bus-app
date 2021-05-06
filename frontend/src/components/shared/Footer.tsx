import React from 'react';

const Footer = (props) => {
  const pr = props;

  return (
    <div className="bg-gray-100 text-gray-500 p-5">
      <div className="font-semibold">(주)인썸니아</div>
      <div>대표이사 OOO | 사업자등록번호 000-00-00000</div>
      <div> OOO@google.com | 서울특별시 OO구 OO로 1 OO빌딩</div>
      <div>Fax 000-000-0000</div>
      <div>고객센터 0000-0000 | 09:00 ~ 18:00 운영</div>
    </div>
  );
};

export default Footer;
