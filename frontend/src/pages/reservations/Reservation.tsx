import { Col, Row, Button, Card, CardContent, CardFooter, CardHeader, f7, Icon } from 'framework7-react';
import React, { useRef } from 'react';
import moment from 'moment';
import { updateReservation } from '@api';

const ReservationItem = (props) => {
  const a = props;
  const actionsToPopover = useRef(null);
  const { departure, destination, departureDate, returnDate, people, status, accompany, price } = props.reservation;
  const { name, bus_old, bus_type } = props.reservation.driver;

  const openActionsPopover = () => {
    if (!actionsToPopover.current) {
      actionsToPopover.current = f7.actions.create({
        buttons: [
          {
            text: '채팅하기',
            bold: true,
          },
          {
            text: '예약취소',
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
          <p className="font-bold text-lg">{name} 기사님</p>
          <p className="text-sm text-gray-600">
            {bus_old}년식 | {bus_type}
          </p>
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
            {departure}
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
            {destination}
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
            {moment(departureDate).format('YYYY년 MM월 DD일 HH시 MM분')}
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
            {moment(returnDate).format('YYYY년 MM월 DD일 HH시 MM분')}
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
          <Col width="80">{people}명</Col>
        </Row>
        <Row>
          <Col width="20" className="border-2 rounded-xl border-gray-300 text-center text-gray-700">
            동행
          </Col>
          <Col width="80">{accompany}</Col>
        </Row>
      </CardContent>
      <CardFooter>
        <p>가격: {price.toLocaleString()}₩</p>
        <p>상태: {status}</p>
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

export default ReservationItem;
