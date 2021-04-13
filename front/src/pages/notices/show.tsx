import React from 'react';
import { Navbar, Page } from 'framework7-react';
import { getObject } from '@api';
import { useQuery, useQueryClient } from 'react-query';
import ReactQueryState from '../../components/shared/ReactQueryState';
import sanitizeHtml from '../../js/utils/sanitizeHtml';
import { dateFormat } from '@js/utils';

const NoticeShowPage = ({ f7route }) => {
  const noticeId = f7route.params.id;
  const queryClient = useQueryClient();

  const { status, data: notice, error } = useQuery(
    ['notice', parseInt(noticeId, 10)],
    getObject({
      id: noticeId,
      model_name: 'notice',
    }),
    {
      placeholderData: () => queryClient.getQueryData('notices').objects?.find((d) => d.id === parseInt(noticeId, 10)),
      enabled: !!noticeId,
    },
  );

  return (
    <Page className="bg-white" noToolbar>
      <Navbar title="공지사항" backLink />

      <ReactQueryState data={notice} status={status} error={error} />
      {notice && (
        <div className="p-5">
          <h1 className="text-2xl font-bold">{notice.title}</h1>
          <p className="pt-2 text-gray-500 font-semibold">{dateFormat(notice.created_at, 'time')}</p>
          {sanitizeHtml(notice.body, { className: 'pt-5' })}
        </div>
      )}
    </Page>
  );
};

export default NoticeShowPage;
