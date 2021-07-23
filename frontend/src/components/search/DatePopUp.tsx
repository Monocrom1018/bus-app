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

const DatePopUp = () => {
  const [popupOpened, setPopupOpened] = useState(false);
  const [Dates, setDates] = useState([]);
  const [Times, setTimes] = useState({
    departure_time: '',
    arrival_time: '',
  });

  return (
    <>
      <Button fill popupOpen=".demo-popup">
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
                    placeholder="가는날과 탑승시간을 선택해주세요"
                    readonly
                    className="bg-gray-50"
                    value={Dates[0]}
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
                    placeholder="오는날과 탑승시간을 선택해주세요"
                    readonly
                    className="bg-gray-50"
                    value={Dates[1] ? Dates[1] : ''}
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
            <Link popupClose>
              <Button text="완료" className="bg-green-400 text-xl text-white px-20 py-4" />
            </Link>
          </Toolbar>
        </Page>
      </Popup>
    </>
  );
};

export default DatePopUp;
