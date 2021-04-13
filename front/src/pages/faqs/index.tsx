import React from 'react';
import { f7, Navbar, Page, List, ListItem, AccordionContent } from 'framework7-react';
import { useQuery } from 'react-query';
import { getObjects } from '@api';
import ReactQueryState from '@components/shared/ReactQueryState';

const FaqIndexPage = (props) => {
  const { status, data, error } = useQuery('faqs', getObjects({ model_name: 'faq' }));

  return (
    <Page noToolbar>
      <Navbar title="FAQ" backLink />

      <ReactQueryState data={data} status={status} error={error} />
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
      )}
    </Page>
  );
};

export default FaqIndexPage;
