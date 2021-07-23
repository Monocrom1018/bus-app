import React, { useState } from 'react';
import {
  Row,
  Col,
  Popup,
  Button,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  Icon,
  Toolbar,
  List,
  ListInput,
} from 'framework7-react';
import Calendar from '@components/search/Calendar';
import TimePicker from '@components/search/TimePicker';
import moment from 'moment';

const DatePopUp = () => {
  const [popupOpened, setPopupOpened] = useState(false);
  const [Dates, setDates] = useState([]);
  const [Times, setTimes] = useState({
    departure_time: '',
    arrival_time: '',
  });

  return (
    <>
      <Button fill popupOpen=".demo-popup" className="bg-red-500 text-white mt-8 mx-4 h-8 text-base">
        날짜
      </Button>
      <Popup
        className="demo-popup mt-20"
        swipeToClose
        animate
        opened={popupOpened}
        onPopupClosed={() => setPopupOpened(false)}
      >
        <Page>
          <Navbar title="날짜">
            <NavRight>
              <Link popupClose>
                <Icon f7="multiply" />
              </Link>
            </NavRight>
          </Navbar>
          <Block>
            <div className="my-20">
              <Row>
                <Col width="50">
                  <ListInput
                    label="가는날"
                    type="text"
                    placeholder="가는날을 선택해주세요"
                    readonly
                    className="bg-gray-50 mb-4 h-20 border rounded-lg ml-3 p-3"
                    value={moment(Dates[0]).format('YYYY년 MM월 DD일')}
                    wrap={false}
                  />
                </Col>
                <Col width="50">
                  <TimePicker el="departure_time" times={Times} setTimes={setTimes} />
                </Col>
                <Col width="50">
                  <ListInput
                    label="오는날"
                    type="text"
                    placeholder="오는날을 선택해주세요"
                    readonly
                    className="bg-gray-50 h-20 border rounded-lg ml-3 p-3"
                    value={Dates[1] ? moment(Dates[1]).format('YYYY년 MM월 DD일') : ''}
                    wrap={false}
                  />
                </Col>
                <Col width="50">
                  <TimePicker el="arrival_time" times={Times} setTimes={setTimes} />
                </Col>
              </Row>
            </div>
            <Calendar Dates={Dates} setDates={setDates} />
          </Block>
          <Toolbar position="bottom" className="mb-20 justify-end">
            <Link popupClose className="w-full">
              <Button text="완료" className="w-60 text-xl py-4" fill />
            </Link>
          </Toolbar>
        </Page>
      </Popup>
    </>
  );
};

export default DatePopUp;
