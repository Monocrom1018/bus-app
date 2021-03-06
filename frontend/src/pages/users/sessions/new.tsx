import Auth, { CognitoUser } from '@aws-amplify/auth';
import React, { useCallback } from 'react';
import { f7, Page, Navbar, List, ListInput } from 'framework7-react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import i18next from 'i18next';
import useAuth from '@hooks/useAuth';

type AmplifySignIn = (param: UserSignInParams) => Promise<CognitoUser>;

interface UserSignInParams {
  email: string;
  password: string;
}

interface FormValues {
  email: string;
  password: string;
}

const amplifySignIn: AmplifySignIn = async (params) => {
  const { email, password } = params;

  const user = await Auth.signIn({
    username: email,
    password,
  });

  return user;
};

const INITIAL_LOG_IN_PARAMS: UserSignInParams = { email: '', password: '' };

const signInSchema = Yup.object().shape({
  email: Yup.string().email().required('필수 입력사항 입니다'),
  password: Yup.string().min(4, '길이가 너무 짧습니다').max(50, '길이가 너무 깁니다').required('필수 입력사항 입니다'),
});

const SessionNewPage: React.FC = () => {
  const { authenticateUser } = useAuth();

  const onSubmitHandler = useCallback(
    async (signInParams: UserSignInParams, { setSubmitting }: FormikHelpers<UserSignInParams>) => {
      setSubmitting(true);
      f7.preloader.show();

      let user: null | CognitoUser = null;
      let message: string;

      //! 아래 주석 해제하면 가입승인 안된 경우 로그인 막습니다.
      // const {
      //   data: { registration_confirmed },
      // } = await userMeApi(signInParams.email);
      // if (!registration_confirmed) {
      //   setSubmitting(false);
      //   f7.preloader.hide();
      //   await showToast('아직 가입승인 대기중입니다');
      //   return;
      // }

      try {
        user = await amplifySignIn(signInParams);
        message = '성공적으로 로그인 하였습니다';
      } catch (error) {
        // amplift error
        if (error.code === "UserNotFoundException") {
          message = "해당 계정이 존재하지 않습니다";
        } else if (error.code === "NotAuthorizedException") {
          message = "이메일 또는 비밀번호를 확인해주세요";
        } else {
          message = '예상치 못한 오류가 발생하였습니다';
        }
      } finally {
        setSubmitting(false);
        f7.preloader.hide();
        if (user) {
          await authenticateUser(user);
          window.location.replace('/');
        } else {
          f7.dialog.alert(message);
        }
      }
    },
    [authenticateUser],
  );

  return (
    <Page className="bg-white" noToolbar>
      <Navbar title={i18next.t('login.title')} backLink sliding={false} />
      <p className="font-semibole text-4xl text-center mt-5">배낭버스</p>
      <Formik
        initialValues={INITIAL_LOG_IN_PARAMS}
        validationSchema={signInSchema}
        onSubmit={onSubmitHandler}
        validateOnMount
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid }) => (
          <form onSubmit={handleSubmit}>
            <List>
              <ListInput
                label={i18next.t('login.email') as string}
                name="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                clearButton
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                errorMessageForce
                errorMessage={touched.email && errors.email}
                outline
              />
              <ListInput
                label={i18next.t('login.password') as string}
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                clearButton
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                errorMessageForce
                errorMessage={touched.password && errors.password}
                outline
              />
            </List>
            <div className="flex justify-end mr-4 -mt-8 mb-6">
              <a href="/users/passwords/new" className="text-red-500 font-semibold italic">
                비밀번호를 잃어버리셨나요?
              </a>
            </div>
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

export default React.memo(SessionNewPage);
