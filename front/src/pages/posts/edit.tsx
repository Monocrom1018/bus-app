import React, { useState, useCallback } from 'react';
import { f7, Navbar, Page } from 'framework7-react';
import { getObject } from '@api';
import { useQuery } from 'react-query';
import ReactQueryState from '../../components/shared/ReactQueryState';
import PostForm from './form';

const PostEditPage = ({ f7route, f7router }) => {
  const postId = f7route.params.id;
  const POST_KEY = ['post', parseInt(postId)];
  const { status, data: post, error } = useQuery(
    POST_KEY,
    getObject({
      id: postId,
      model_name: 'post',
    }),
    {
      enabled: !!postId,
    },
  );

  return (
    <Page noToolbar>
      <Navbar title="게시글 수정" backLink />
      <ReactQueryState data={post} status={status} error={error} />
      {post && <PostForm post={post} f7router={f7router} />}
    </Page>
  );
};

export default PostEditPage;
