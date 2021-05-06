import { Block, BlockTitle, Button, Card, CardContent, CardFooter, CardHeader, f7, Icon } from 'framework7-react';
import React, { useRef } from 'react';

const ReservationItem = (props) => {
  const a = props;
  const actionsToPopover = useRef(null);

  const openActionsPopover = () => {
    if (!actionsToPopover.current) {
      actionsToPopover.current = f7.actions.create({
        buttons: [
          {
            text: 'Do something',
            label: true,
          },
          {
            text: 'Button 1',
            bold: true,
          },
          {
            text: 'Button 2',
          },
          {
            text: 'Cancel',
            color: 'red',
          },
        ],
        // Need to specify popover target
        targetEl: '.button-to-popover',
      });
    }

    actionsToPopover.current.open();
  };

  return (
    <Card className="bg-white mb-5 rounded relative h-auto">
      <CardHeader className="no-border">나의 일정</CardHeader>
      <CardContent>
        <p className="date">Posted on January 21, 2015</p>
      </CardContent>
      <CardFooter>
        <p>인원: 10인</p>
        <p>상태: 승인</p>
      </CardFooter>
      <Button
        style={{ display: 'inline-block' }}
        className="button-to-popover absolute top-1 right-4"
        onClick={openActionsPopover}
      >
        <Icon f7="bars" />
      </Button>
    </Card>
  );
};

export default ReservationItem;
