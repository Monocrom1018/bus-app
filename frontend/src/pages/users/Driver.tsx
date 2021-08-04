import { Card, List, ListItem } from 'framework7-react';
import React from 'react';
import { useRecoilState } from 'recoil';
import { totalChargeState } from '@atoms';

const Driver = (props) => {
  const { id, name, profile_img, totalCharge, people_available, bus_old, bus_type, company_name } = props.driver;
  const [finalCharge, setFinalCharge] = useRecoilState(totalChargeState);

  return (
    <Card outline>
      <List mediaList>
        <ListItem
          link={`/drivers/${id}`}
          title={name}
          subtitle={`${people_available}인승 ${bus_type}`}
          text={`${bus_old}년식 | ${company_name}`}
          // after={`${totalCharge.toLocaleString()}₩`}
          onClick={() => setFinalCharge(totalCharge)}
        >
          <img slot="media" src={profile_img} width="80" alt="profile_img" />
        </ListItem>
      </List>
    </Card>
  );
};

export default Driver;
