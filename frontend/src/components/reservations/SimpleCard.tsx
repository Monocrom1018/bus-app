import { Col, Row, Button, Card, CardContent, CardFooter, CardHeader } from 'framework7-react';
import moment from 'moment';
import React from 'react';

const SimpleCard = ({ reservation }) => {
  const { departureDate, returnDate, driver, schedules, review, id } = reservation;
  const { name } = driver;
  const departure = schedules[0].departure
  const destination = schedules[schedules.length - 1].departure

  return (
    <Card className="bg-white mb-5 rounded relative h-auto" key={1}>
      <CardHeader className="no-border">
        <div>
          <p className="font-bold text-lg">{name}</p>
          <p className="text-sm text-gray-600">
          {`${moment(departureDate).format('YYYY.MM.DD')} ~ ${moment(returnDate).format('YYYY.MM.DD')}`}
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
          <Col width="80" className="text-base text-gray-700 truncate">
            {departure}
          </Col>
        </Row>
        <Row>
          <Col width="20" className="text-center text-red-400 font-semibold">
            ↓
          </Col>
        </Row>
        <Row>
          <Col width="20" className="border-2 rounded-xl border-red-400 text-center text-red-400 font-semibold">
            목적지
          </Col>
          <Col width="80" className="text-base text-gray-700 truncate">
            {destination}
          </Col>
        </Row>
      </CardContent>
      { review === null ? (
        <CardFooter className="flex flex-row justify-center">
          <i className="f7-icons">pencil</i>
          <a className="text-lg font-semibold" href={`/reviews/create/${Number(id)}`}>리뷰작성</a>
        </CardFooter>
      ) : (
        <CardFooter className="flex flex-row justify-center">
          <i className="f7-icons">pencil</i>
          <a className="text-lg font-semibold" href={`/reviews/edit/${Number(id)}`}>리뷰수정</a>
        </CardFooter>
      ) }
      <Button
        style={{ display: 'inline-block' }}
        className="button-to-popover absolute top-4 right-4 border"
        // onClick={}
      >
        상세확인
      </Button>
    </Card>
  );
};

export default SimpleCard;
