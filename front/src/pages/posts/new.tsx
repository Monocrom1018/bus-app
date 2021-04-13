import React from 'react';
import { f7, Navbar, Page } from 'framework7-react';
import PostForm from './form';

const PostNewPage = ({ f7router }) => {
  return (
    <Page noToolbar>
      <Navbar title="게시글 작성" backLink />
      <PostForm f7router={f7router} />
    </Page>
  );
};

export default PostNewPage;
