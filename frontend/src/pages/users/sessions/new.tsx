import React, { useContext } from 'react';
import { f7, Page, Navbar, List, ListInput } from 'framework7-react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useAuth from '@hooks/useAuth';
import { loginAPI } from '@api';
import { convertObjectToFormData } from '@utils';

interface FormValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required('필수 입력사항 입니다'),
  password: Yup.string().min(4, '길이가 너무 짧습니다').max(50, '길이가 너무 깁니다').required('필수 입력사항 입니다'),
});

const initialValues: FormValues = { email: '', password: '' };

const SessionNewPage = () => {
  const { authenticateUser } = useAuth();

  const handleLogin = async (params, setSubmitting) => {
    setSubmitting(true);
    try {
      const fd = convertObjectToFormData({ modelName: 'user', data: params });
      const response = await loginAPI(fd);
      authenticateUser(response.data);
      f7.dialog.alert('성공적으로 로그인 하였습니다. ');
    } catch (error) {
      f7.dialog.alert('정보를 확인 해주세요. ');
      setSubmitting(false);
    }
  };

  return (
    <Page className="bg-white">
      <Navbar title={i18next.t('login.title')} backLink sliding={false} />
      <p className="font-semibole text-4xl text-center mt-5">배낭버스</p>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) => handleLogin(values, setSubmitting)}
        validateOnMount
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid }) => (
          <form onSubmit={handleSubmit}>
            <List>
              <ListInput
                label={i18next.t('login.email')}
                name="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                clearButton
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                errorMessageForce
                errorMessage={touched.email && errors.email}
              />
              <ListInput
                label={i18next.t('login.password')}
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                clearButton
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                errorMessageForce
                errorMessage={touched.password && errors.password}
              />
            </List>
            <div className="p-1">
              <button
                type="submit"
                className="button button-fill button-large disabled:opacity-50"
                disabled={isSubmitting || !isValid}
              >
                로그인
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Page>
  );
};

export default SessionNewPage;
