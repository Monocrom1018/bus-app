import React from 'react';
import { Navbar, Page, List, ListItem } from 'framework7-react';
import { getObjects } from '@api';
import { sleep } from '@js/utils';
import ReactQueryState from '@components/shared/ReactQueryState';
import { useQuery } from 'react-query';

const NoticeIndexPage = () => {
  // const { status, data, error, refetch, isFetching } = useQuery('notices', getObjects({ model_name: 'notice' }));

  // const onRefresh = async (done) => {
  //   refetch();
  //   await sleep(1000);
  //   done();
  // };

  return (
    <Page className="bg-white" noToolbar ptr ptrMousewheel>
      {/* <Page className="bg-white" noToolbar ptr ptrMousewheel onPtrRefresh={onRefresh}> */}
      <Navbar title="공지사항" backLink />

      {/* <ReactQueryState data={data} status={status} error={error} isFetching={isFetching} />
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
      )} */}

      <List mediaList className="m-0">
        <ListItem
          key={1}
          link={`/notices/1/`}
          title="안녕하세요"
          subtitle="관리자"
          text="임시로 게시하는 공지사항 예시입니다"
        />
        <ListItem
          key={2}
          link={`/notices/2/`}
          title="반갑습니다"
          subtitle="관리자"
          text="임시로 띄워놓는 공지사항입니다."
        />
      </List>
    </Page>
  );
};

export default NoticeIndexPage;
