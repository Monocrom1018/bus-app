import { Col, Row, Button, Card, CardContent, CardFooter, CardHeader, f7, Icon } from 'framework7-react';
import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import useAuth from '@hooks/useAuth';

const DriverReservationPage = (props) => {
  const a = props;
  const actionsToPopover = useRef(null);
  const { currentUser } = useAuth();
  //   const { departure, destination, departureDate, returnDate, people, status, accompany, price } = props.reservation;
  //   const { name, bus_old, bus_type } = props.reservation.driver;

  const openActionsPopover = () => {
    if (!actionsToPopover.current) {
      actionsToPopover.current = f7.actions.create({
        buttons: [
          {
            text: '채팅하기',
            bold: true,
          },
          {
            text: '예약수락',
          },
          {
            text: '예약거절',
          },
          {
            text: 'Cancel',
            color: 'red',
          },
        ],
        // Need to specify popover target
        targetEl: '.button-to-popover',
      });
    }

    actionsToPopover.current.open();
  };

  return (
    <Card className="bg-white mb-5 rounded relative h-auto">
      <CardHeader className="no-border">
        <div>
          <p className="font-bold text-lg">김예시 기사님</p>
          <p className="text-sm text-gray-600">2018년식 | 미니우등</p>
        </div>
      </CardHeader>
      <CardContent>
        <Row>
          <Col
            width="20"
            className="border-2 rounded-xl border-red-400 text-center font-semibold text-white bg-red-400"
          >
            출발지
          </Col>
          <Col width="80" className="text-base text-gray-900">
            서울시 진관4로 87
          </Col>
        </Row>
        <Row>
          <Col width="20" className="text-center text-red-400 font-semibold">
            ↓↑
          </Col>
        </Row>
        <Row className="mb-5">
          <Col width="20" className="border-2 rounded-xl border-red-400 text-center text-red-400 font-semibold">
            도착지
          </Col>
          <Col width="80" className="text-base text-gray-900">
            부산시 해운대 해수욕장
          </Col>
        </Row>
        <Row>
          <Col
            width="20"
            className="border-2 rounded-xl border-red-400 text-center font-semibold text-white bg-red-400"
          >
            출발일
          </Col>
          <Col width="80" className="text-base">
            'YYYY년 MM월 DD일 HH시 MM분'
          </Col>
        </Row>
        <Row>
          <Col width="20" className="text-center text-red-400 font-semibold">
            ↓
          </Col>
        </Row>
        <Row className="mb-2">
          <Col width="20" className="border-2 rounded-xl border-red-400 text-center text-red-400 font-semibold">
            복귀일
          </Col>
          <Col width="80" className="text-base">
            'YYYY년 MM월 DD일 HH시 MM분'
          </Col>
        </Row>
        {/* <Row className="pt-4 mb-2">
          <Col width="20" className="border-2 rounded-xl border-gray-300 text-center text-gray-700">
            운행
          </Col>
          <Col width="80">왕복</Col>
        </Row> */}
        <Row className="pt-4 mb-2">
          <Col width="20" className="border-2 rounded-xl border-gray-300 text-center text-gray-700">
            인원
          </Col>
          <Col width="80">10명</Col>
        </Row>
        <Row>
          <Col width="20" className="border-2 rounded-xl border-gray-300 text-center text-gray-700">
            동행
          </Col>
          <Col width="80">동행</Col>
        </Row>
      </CardContent>
      <CardFooter>
        <p>가격: 350,000₩</p>
        <p>상태: 수락대기중</p>
      </CardFooter>
      <Button
        style={{ display: 'inline-block' }}
        className="button-to-popover absolute top-4 right-4"
        onClick={openActionsPopover}
      >
        <Icon f7="bars" />
      </Button>
    </Card>
  );
};

export default DriverReservationPage;
