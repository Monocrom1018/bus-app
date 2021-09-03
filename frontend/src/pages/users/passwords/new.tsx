import { resetPasswordApi } from '@api';
import { f7, List, ListInput, Navbar, Page } from 'framework7-react';
import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const emailSchema = Yup.object().shape({
  email: Yup.string().email().required('필수 입력 사항입니다'),
});

const NewPasswordPage = () => (
  <Page className="bg-white" noToolbar>
    <Navbar backLink sliding />
    <p className="font-semibole text-xl mt-5 ml-4">비밀번호 재설정</p>
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async (values, actions) => {
        f7.preloader.show();
        try {
          await resetPasswordApi(values);
          actions.setSubmitting(false);
          f7.preloader.hide();
          f7.dialog.alert('재설정 이메일이 발송되었습니다!');
        } catch (error) {
          f7.preloader.hide();
          f7.dialog.alert(error.message);
        }
      }}
      validationSchema={emailSchema}
    >
      {({ values, handleSubmit, handleChange, handleBlur, isSubmitting, isValid }) => (
        <form onSubmit={handleSubmit}>
          <List noHairlinesMd>
            <ListInput
              outline
              label="이메일"
              floatingLabel
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="아이디"
              clearButton
            />
          </List>
          <div className="p-1">
            <button
              type="submit"
              className="button button-fill button-large disabled:opacity-50"
              disabled={isSubmitting || !isValid}
            >
              메일 전송
            </button>
          </div>
        </form>
      )}
    </Formik>
  </Page>
);

export default NewPasswordPage;
