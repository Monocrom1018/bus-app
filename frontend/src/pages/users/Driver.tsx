import { Card, List, ListItem } from 'framework7-react';
import React from 'react';

const Driver = (props) => {
  const a = 'test';
  const { id, name, profile_img, totalCharge } = props.driver;

  return (
    <Card outline>
      <List mediaList>
        <ListItem
          link={`/drivers/${id}`}
          title={name}
          subtitle="28인승 대형우등"
          text="2018년식 | 배낭 여행사"
          after={`${totalCharge.toLocaleString()}₩`}
        >
          <img slot="media" src={profile_img} width="80" />
        </ListItem>
      </List>
    </Card>
  );
};

export default Driver;
