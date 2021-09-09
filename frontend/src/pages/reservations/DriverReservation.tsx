import { Col, Row, Button, Card, CardContent, CardFooter, CardHeader, f7, Icon } from 'framework7-react';
import React, { useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { reservationState } from '@atoms';
import moment from 'moment';
import { createPayment, updateReservation } from '@api';
import { showToast } from '@js/utils';

const DriverReservationPage = ({ reservation, refetch }) => {
  const setReservation = useSetRecoilState(reservationState);
  const actionsToPopover = useRef(null);
  const {
    id,
    user,
    departure,
    destination,
    departureDate,
    status,
    returnDate,
    stopover,
    price,
    people,
    createdDate,
    accompany,
  } = reservation;

  const handleButton = async (param) => {
    if (status === '수락') {
      await showToast('이미 수락한 예약입니다');
      return;
    }

    f7.dialog.confirm(`요청을 ${param.status}하시겠어요?`, async () => {
      f7.preloader.show();
      let message: string;
      try {
        const{ status, reservationId } = param;
        await createPayment(reservation);
        const updatedReservation = await updateReservation(status, reservationId);
        setReservation(updatedReservation);
        message = `예약을 ${param.status}하였습니다`;
      } catch (error) {
        if (typeof error.message === 'string') message = '';
        else message = '예상치 못한 오류가 발생하였습니다';
      } finally {
        f7.preloader.hide();
        f7.dialog.alert(message);
        refetch();
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
            text: '예약수락',
            onClick: () => handleButton({ reservationId: id, status: '수락' }),
          },
          {
            text: '예약거절',
            onClick: () => handleButton({ reservationId: id, status: '거절' }),
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
        {stopover?.map((name) => (
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
        ))}
        <Row className="mb-5">
          <Col width="20" className="border-2 rounded-xl border-red-400 text-center text-red-400 font-semibold">
            도착지
          </Col>
          <Col width="80" className="text-base font-bold text-gray-900">
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

export default DriverReservationPage;
