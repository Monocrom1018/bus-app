import React from 'react';
import { f7, Navbar, Page, List, ListItem, Fab, Icon } from 'framework7-react';
import { getObjects } from '@api';
import { useQuery } from 'react-query';
import ReactQueryState from '../../components/shared/ReactQueryState';

const PostIndexPage = (props) => {
  const { status, data, error } = useQuery(
    'posts',
    getObjects({
      model_name: 'post',
      q: {
        s: ['created_at desc'],
      },
    }),
  );

  return (
    <Page noToolbar>
      <Navbar backLink title="게시글" />

      <ReactQueryState data={data} status={status} error={error} />
      {data && (
        <List>
          {_.map(data.objects, (post) => (
            <ListItem key={post.id} title={post.title} after={post.user?.name} link={`/posts/${post.id}`}></ListItem>
          ))}
        </List>
      )}
      <Fab href="/posts/new" position="center-bottom" slot="fixed" text="게시글 작성" color="red">
        <Icon ios="f7:plus" aurora="f7:plus" md="material:add" />
      </Fab>
    </Page>
  );
};

export default PostIndexPage;
