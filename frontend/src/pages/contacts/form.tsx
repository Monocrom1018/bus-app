/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { f7, List, ListInput } from 'framework7-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createObject, updateObject } from '@api';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from '../../js/utils';

const ContactNewSchema = Yup.object().shape({
  title: Yup.string().required('필수 입력사항입니다'),
  content: Yup.string()
    .required('필수 입력사항입니다')
    .min(5, '5글자 이상 입력해주셔야합니다')
    .max(1000, '1000자 미만으로 작성해주셔야합니다'),
});

const ContactForm = ({ contact = null, f7router }) => {
  const { mutate } = !contact
    ? useMutation(createObject({ model_name: 'contact' }))
    : useMutation(updateObject({ id: contact.id, model_name: 'contact' }));
  const queryClient = useQueryClient();

  return (
    <List noHairlinesMd>
      <Formik
        initialValues={{
          title: contact?.title || '',
          content: contact?.content || '',
        }}
        validationSchema={ContactNewSchema}
        onSubmit={async (values, { setValues, setSubmitting }) => {
          f7.dialog.preloader('잠시만 기다려주세요...');
          setSubmitting(true);
          mutate(
            { contact: values },
            {
              onSuccess: (data, variables, context) => {
                f7.dialog.close();
                queryClient.invalidateQueries('contacts');
                !!contact && queryClient.invalidateQueries(['contact', contact.id]);
                f7router.back();
                toast
                  .get()
                  .setToastText(`게시글이 성공적으로 ${!contact ? '생성' : '수정'}되었습니다.`)
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
                errorMessage={touched.title && errors.title}
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
                errorMessage={touched.content && errors.content}
                clearButton
              />
            </ul>

            <div className="p-5">
              <button
                type="submit"
                className="button button-fill button-large disabled:opacity-50"
                disabled={isSubmitting || !isValid}
              >
                {!contact ? '작성' : '수정'}하기
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </List>
  );
};

export default ContactForm;
