import React from 'react';
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
  ListInput,
} from 'framework7-react';
import Calendar from '@components/search/Calendar';
import TimePicker from '@components/search/TimePicker';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { searchingOptionDateSelector } from '@atoms';

const DatePopUp = ({ popupOpened, setPopupOpened }) => {
  const { departureDate, returnDate } = useRecoilValue(searchingOptionDateSelector);

  return (
    <>
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
                    value={moment(departureDate).format('YYYY년 MM월 DD일')}
                    wrap={false}
                  />
                </Col>
                <Col width="50">
                  <TimePicker el="departureTime" />
                </Col>
                <Col width="50">
                  <ListInput
                    label="오는날"
                    type="text"
                    placeholder="오는날을 선택해주세요"
                    readonly
                    className="bg-gray-50 h-20 border rounded-lg ml-3 p-3"
                    value={returnDate ? moment(returnDate).format('YYYY년 MM월 DD일') : ''}
                    wrap={false}
                  />
                </Col>
                <Col width="50">
                  <TimePicker el="returnTime" />
                </Col>
              </Row>
            </div>
            <Calendar />
          </Block>
          <Toolbar position="bottom" className="mb-20 justify-end">
            <div className="w-full">
              <Button popupClose text="완료" className="w-60 text-xl py-4" fill style={{ margin: '0 auto' }} />
            </div>
          </Toolbar>
        </Page>
      </Popup>
    </>
  );
};

export default DatePopUp;
