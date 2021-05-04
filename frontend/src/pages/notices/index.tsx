import React from 'react';
import { Navbar, Page, List, ListItem } from 'framework7-react';
import { getObjects } from '@api';
import { sleep } from '@js/utils';
import ReactQueryState from '@components/shared/ReactQueryState';
import { useQuery } from 'react-query';

const NoticeIndexPage = () => {
  const { status, data, error, refetch, isFetching } = useQuery('notices', getObjects({ model_name: 'notice' }));

  const onRefresh = async (done) => {
    refetch();
    await sleep(1000);
    done();
  };

  return (
    <Page className="bg-white" noToolbar ptr ptrMousewheel onPtrRefresh={onRefresh}>
      <Navbar title="공지사항" backLink />

      <ReactQueryState data={data} status={status} error={error} isFetching={isFetching} />
      {data && (
        <List mediaList className="m-0">
          {data.objects.map((notice) => (
            <ListItem
              key={notice.id}
              link={`/notices/${notice.id}/`}
              title={notice.title}
              subtitle="관리자"
              text={notice.body}
            />
          ))}
        </List>
      )}
    </Page>
  );
};

export default NoticeIndexPage;
