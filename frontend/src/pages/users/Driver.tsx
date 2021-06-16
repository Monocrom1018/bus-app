import { Card, List, ListItem } from 'framework7-react';
import React from 'react';

const Driver = (props) => {
  const a = 'test';
  const { id, name, profile_img, totalCharge, people_available, bus_old, bus_type, company_name } = props.driver;

  return (
    <Card outline>
      <List mediaList>
        <ListItem
          link={`/drivers/${id}`}
          title={name}
          subtitle={`${people_available}인승 ${bus_type}`}
          text={`${bus_old}년식 | ${company_name}`}
          after={`${totalCharge.toLocaleString()}₩`}
        >
          <img slot="media" src={profile_img} width="80" />
        </ListItem>
      </List>
    </Card>
  );
};

export default Driver;
