import { Col, Row, Button, Card, CardContent, CardFooter, CardHeader, f7, Icon } from 'framework7-react';
import React, { useRef } from 'react';
import moment from 'moment';
import { updateReservation } from '@api';
import { useRecoilState } from 'recoil';
import { reservationState } from '@atoms';

const ReservationItem = (props) => {
  const a = props;
  const actionsToPopover = useRef(null);
  const [reservation, setReservation] = useRecoilState(reservationState);
  const { id, departure, destination, departureDate, returnDate, people, status, accompany, price, stopover } =
    props.reservation;
  const { name, bus_old, bus_type } = props.reservation.driver;

  const handleReservationCancel = async (param) => {
    f7.dialog.confirm('예약을 취소하시겠어요?', async () => {
      f7.preloader.show();
      let message: string;
      try {
        const updatedReservation = await updateReservation(param);
        setReservation(updatedReservation);
        message = '예약이 취소되었습니다';
      } catch (error) {
        if (typeof error.message === 'string') message = '이미 수락된 예약은 취소할 수 없습니다';
        else message = '예상치 못한 오류가 발생하였습니다';
      } finally {
        f7.preloader.hide();
        f7.dialog.alert(message);
      }
    });
  };

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
            onClick: () => handleReservationCancel({ reservationId: id, status: '취소' }),
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
          <Col width="80" className="text-base font-bold text-gray-900">
            {departure}
          </Col>
        </Row>
        <Row>
          <Col width="20" className="text-center text-red-400 font-semibold">
            ↓
          </Col>
        </Row>
        {stopover?.map((name) => {
          return (
            <>
              <Row>
                <Col width="20" className="border-2 rounded-xl border-red-400 text-center text-red-400 font-semibold">
                  경유지
                </Col>
                <Col width="80" className="text-base text-gray-900">
                  {name}
                </Col>
              </Row>
              <Row>
                <Col width="20" className="text-center text-red-400 font-semibold">
                  ↓
                </Col>
              </Row>
            </>
          );
        })}
        <Row className="mb-3">
          <Col
            width="20"
            className="border-2 rounded-xl border-red-400 text-center font-semibold text-white bg-red-400"
          >
            도착지
          </Col>
          <Col width="80" className="text-base font-bold text-gray-900">
            {destination}
          </Col>
        </Row>
        <hr className="my-4" />
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
        <hr className="my-4" />
        {/* <Row className="pt-4 mb-2">
          <Col width="20" className="border-2 rounded-xl border-gray-300 text-center text-gray-700">
            운행
          </Col>
          <Col width="80">왕복</Col>
        </Row> */}
        <Row className="mb-2">
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
