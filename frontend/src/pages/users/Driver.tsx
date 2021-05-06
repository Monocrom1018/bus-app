import { Card, List, ListItem } from 'framework7-react';
import React from 'react';

const Driver = (props) => {
  const a = 'test';
  return (
    <Card outline>
      <List mediaList>
        <ListItem
          link="#"
          title="Yellow Submarine"
          after="$15"
          subtitle="Beatles"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
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
