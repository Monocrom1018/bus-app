import { Button, Card, Link, List, ListItem } from 'framework7-react';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { totalChargeState } from '@atoms';

const Driver = ({ driver }) => {
  const { id, name, profile, totalCharge, company_name, bus } = driver;
  const { people_available, bus_old, bus_type } = bus;
  const setFinalCharge = useSetRecoilState(totalChargeState);

  return (
    <Card outline>
      <List mediaList>
        <ListItem
          link={`/drivers/${id}`}
          title={name}
          subtitle={`${people_available}인승 ${bus_type}`}
          text={`${bus_old}년식 | ${company_name}`}
          after={totalCharge ? `${totalCharge.toLocaleString()}₩` : null}
          onClick={() => setFinalCharge(totalCharge)}
        >
          <img slot="media" src={profile} width="80" alt="profile" />
        </ListItem>
        {/* <Link className="button" href={`/chatroooms/a123/single?user_id=${id}`}>
          메시지
        </Link> */}
      </List>
    </Card>
  );
};

export default Driver;
