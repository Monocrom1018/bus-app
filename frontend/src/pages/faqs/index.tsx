import React from 'react';
import { f7, Navbar, Page, List, ListItem, AccordionContent } from 'framework7-react';
import { useQuery } from 'react-query';
import { getObjects } from '@api';
import ReactQueryState from '@components/shared/ReactQueryState';

const FaqIndexPage = (props) => {
  // const { status, data, error } = useQuery('faqs', getObjects({ model_name: 'faq' }));

  return (
    <Page noToolbar>
      <Navbar title="FAQ" backLink />

      {/* <ReactQueryState data={data} status={status} error={error} />
      {data && (
        <List accordionList className="m-0">
          {_.map(data.objects, (faq) => (
            <ListItem key={faq.id} accordionItem title={faq.question}>
              <AccordionContent>
                <div className="p-3">
                  <p>{faq.answer}</p>
                </div>
              </AccordionContent>
            </ListItem>
          ))}
        </List>
      )} */}

      <List accordionList className="m-0">
        <ListItem key={1} accordionItem title="어제는 쌀쌀했는데 오늘은 또 왜 푸근한건가요?">
          <AccordionContent>
            <div className="p-3">
              <p>어제는 비가 와서 그렇습니다</p>
            </div>
          </AccordionContent>
        </ListItem>
        <ListItem key={2} accordionItem title="밥은 어제도 먹었는데 왜 또 배가 고플까요?">
          <AccordionContent>
            <div className="p-3">
              <p>충분히 먹지 않아서 그런게 아닐까요?</p>
            </div>
          </AccordionContent>
        </ListItem>
      </List>
    </Page>
  );
};

export default FaqIndexPage;
