import React from 'react';
import { f7, Navbar, Page, Row, Col } from 'framework7-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getObject, destroyObject } from '@api';
import ReactQueryState from '@components/shared/ReactQueryState';
import { toast } from '@js/utils';

const PostShowPage = ({ f7route, f7router }) => {
  const postId = f7route.params.id;
  const POST_KEY = ['post', parseInt(postId, 10)];
  const queryClient = useQueryClient();

  const {
    status,
    data: post,
    error,
  } = useQuery(
    POST_KEY,
    getObject({
      id: postId,
      model_name: 'post',
    }),
    {
      placeholderData: () => queryClient.getQueryData('posts').objects?.find((d) => d.id === parseInt(postId, 10)),
      enabled: !!postId,
    },
  );
  const { mutate } = useMutation(
    destroyObject({
      id: postId,
      model_name: 'post',
    }),
  );

  const onClickDestroy = () => {
    f7.dialog.confirm('정말 삭제하시겠습니까?', 'Bone', () => {
      f7.dialog.preloader('잠시만 기다려주세요...');
      mutate(null, {
        onSuccess: () => {
          f7.dialog.close();
          f7router.back();
          queryClient.invalidateQueries('posts');
          toast.get().setToastText('게시글이 성공적으로 삭제되었습니다.').openToast();
        },
      });
    });
  };

  return (
    <Page noToolbar>
      {post && (
        <>
          <Navbar backLink title="게시글" />

          <ReactQueryState data={post} status={status} error={error} />
          {post && (
            <div className="p-5">
              <h1>{post.title}</h1>
              <p>{post.content}</p>

              <Row className="pt-10">
                <Col>
                  <a href={`/posts/${postId}/edit`} className="button button-large button-fill">
                    수정하기
                  </a>
                </Col>
                <Col>
                  <a onClick={onClickDestroy} className="button button-large button-outline">
                    삭제하기
                  </a>
                </Col>
              </Row>
            </div>
          )}
        </>
      )}
    </Page>
  );
};

export default PostShowPage;
