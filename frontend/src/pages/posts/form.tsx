/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { f7, List, ListInput } from 'framework7-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createObject, updateObject } from '@api';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from '../../js/utils';

const PostNewSchema = Yup.object().shape({
  title: Yup.string().required('필수 입력사항입니다'),
  content: Yup.string()
    .required('필수 입력사항입니다')
    .min(5, '5글자 이상 입력해주셔야합니다')
    .max(1000, '1000자 미만으로 작성해주셔야합니다'),
});

const PostForm = ({ post = null, f7router }) => {
  const { mutate } = !post
    ? useMutation(createObject({ model_name: 'post' }))
    : useMutation(updateObject({ id: post.id, model_name: 'post' }));
  const queryClient = useQueryClient();

  return (
    <List noHairlinesMd>
      <Formik
        initialValues={{
          title: post?.title || '',
          content: post?.content || '',
        }}
        validationSchema={PostNewSchema}
        onSubmit={async (values, { setSubmitting }) => {
          f7.dialog.preloader('잠시만 기다려주세요...');
          setSubmitting(true);
          mutate(
            { post: values },
            {
              onSuccess: (data, variables, context) => {
                f7.dialog.close();
                queryClient.invalidateQueries('posts');
                !!post && queryClient.invalidateQueries(['post', post.id]);
                f7router.back();
                toast
                  .get()
                  .setToastText(`게시글이 성공적으로 ${!post ? '생성' : '수정'}되었습니다.`)
                  .openToast();
              },
            },
          );
        }}
        enableReinitialize
        validateOnMount
      >
        {({ values, isSubmitting, isValid, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <ul>
              <ListInput
                label="제목"
                name="title"
                type="text"
                placeholder="제목을 입력해주세요"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessageForce
                errorMessage={((touched.title && errors.title) as string) || ''}
                clearButton
              />
              <ListInput
                label="내용"
                name="content"
                type="textarea"
                placeholder="내용을 입력해주세요"
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessageForce
                errorMessage={((touched.content && errors.content) as string) || ''}
                clearButton
              />
            </ul>

            <div className="p-5">
              <button
                type="submit"
                className="button button-fill button-large disabled:opacity-50"
                disabled={isSubmitting || !isValid}
              >
                {!post ? '작성' : '수정'}하기
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </List>
  );
};

export default PostForm;
