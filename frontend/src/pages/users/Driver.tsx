import { Card, List, ListItem } from 'framework7-react';
import React from 'react';

const Driver = (props) => {
  const a = 'test';
  const { id } = props;
  return (
    <Card outline>
      <List mediaList>
        <ListItem
          link={`/drivers/1`}
          title="김예시"
          subtitle="28인승 대형우등"
          text="2018년식 | 배낭 여행사"
          after="520,000원"
        >
          <img
            slot="media"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=wffnP1KziQ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            width="80"
          />
        </ListItem>
      </List>
    </Card>
  );
};

export default Driver;
