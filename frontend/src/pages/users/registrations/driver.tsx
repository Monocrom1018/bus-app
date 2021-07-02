import { signupAPI } from '@api';
import AgreeCheckboxes from '@components/shared/AgreeCheckboxes';
import React, { useState, useCallback } from 'react';
import { f7, Navbar, Page, List, ListInput } from 'framework7-react';
import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import { CognitoUser, ISignUpResult } from 'amazon-cognito-identity-js';
import { AxiosError } from 'axios';
import { Auth } from 'aws-amplify';
import i18next from 'i18next';
import * as Yup from 'yup';
import PhoneCertiication from '@components/shared/PhoneCertification';
import { convertObjectToFormData, sleep } from '@utils';
import useAuth from '@hooks/useAuth';

interface DriverSignUpParams {
  user_type: string;
  name: string;
  company_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  driver_license: any;
  deductible_confirmation: any;
  // phone: string;
  termCheck: boolean;
  privacyCheck: boolean;
  marketingCheck: boolean;
}

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('필수 입력사항 입니다'),
  company_name: Yup.string().required('필수 입력사항 입니다'),
  email: Yup.string().email().required('필수 입력사항 입니다'),
  password: Yup.string().min(8, '길이가 너무 짧습니다').max(50, '길이가 너무 깁니다').required('필수 입력사항 입니다'),
  password_confirmation: Yup.string()
    .required('필수 입력사항 입니다')
    .when('password', {
      is: (val: string) => val && val.length > 0,
      then: Yup.string().oneOf([Yup.ref('password')], '비밀번호가 일치하지 않아요'),
    }),
  // phone: Yup.string()
  //   .min(9, '길이가 너무 짧습니다')
  //   .max(15, '길이가 너무 깁니다')
  //   .required('휴대폰 번호를 인증해주세요'),
  termCheck: Yup.boolean().oneOf([true], '이용약관에 동의해주세요'),
  privacyCheck: Yup.boolean().oneOf([true], '개인정보 보호정책에 동의해주세요'),
  marketingCheck: Yup.boolean(),
});

const INITIAL_SIGN_UP_PARAMS: DriverSignUpParams = {
  user_type: 'DRIVER',
  name: '',
  company_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  // phone: '',
  termCheck: false,
  privacyCheck: false,
  marketingCheck: false,
  driver_license: null,
  deductible_confirmation: null,
};

type AmplifySignUp = (param: DriverSignUpParams) => Promise<ISignUpResult>;

const amplifySignUp: AmplifySignUp = async (params: DriverSignUpParams) => {
  // attributs 에는 whitelist 된 attributes 만 올 수 있음
  delete params.password_confirmation;

  const { email: username, password, ...attributes } = params;

  const user = await Auth.signUp({
    username,
    password,
    attributes: { email: username },
  });

  return user;
};

const DriverSignUpPage: React.FC = () => {
  const { authenticateUser } = useAuth();
  // const [certComplete, setCertComplete] = useStat

  const onSubmitHandler = useCallback(
    async (signUpParams: DriverSignUpParams, { setSubmitting }: FormikHelpers<DriverSignUpParams>) => {
      setSubmitting(true);
      f7.preloader.show();
      let cognitoUserSession: null | CognitoUser = null; // cognito 유저 생성 여부 실패 시 null
      let isSignUpSuccess = false; // 서버 회원가입 성공 여부
      let message: string; // 에러 메시지 혹은 성공 메시지

      // amplify signup 시도
      try {
        await amplifySignUp(signUpParams);
        cognitoUserSession = await Auth.signIn({
          username: signUpParams.email,
          password: signUpParams.password,
        });
      } catch (error) {
        message = error.message;
        setSubmitting(false);
        f7.preloader.hide();
        f7.dialog.alert(message);
      }
      // amplify signup 실패 시
      if (!cognitoUserSession) return;

      // signup api 시도
      try {
        // TODO signup api
        const { password, ...apiSignUpParams } = signUpParams;
        const values = { password, ...apiSignUpParams };
        await signupAPI(values);
        isSignUpSuccess = true;
        message = '성공적으로 가입 하였습니다';
      } catch (error) {
        console.log(error);
        message = (error as AxiosError).response?.data?.message;

        // TODO: need test amplify 유저 풀 삭제
        cognitoUserSession.deleteUser((deleteUserError) => {
          if (deleteUserError) throw deleteUserError;
          Auth.signOut({ global: true });
        });
      } finally {
        setSubmitting(false);
        f7.preloader.hide();
        f7.dialog.alert(message);
        if (isSignUpSuccess) authenticateUser(cognitoUserSession);
        location.replace('/');
      }
    },
    [authenticateUser],
  );

  const value = useFormik<DriverSignUpParams>({
    initialValues: INITIAL_SIGN_UP_PARAMS,
    validateOnMount: true,
    onSubmit: onSubmitHandler,
    validationSchema: SignUpSchema,
  });

  const { setFieldValue, handleChange, submitForm, values, isValid, handleBlur, errors, touched, isSubmitting } = value;

  return (
    <Page>
      <Navbar title="회원가입 - 기사님" backLink sliding={false} />
      <p className="font-semibole text-4xl text-center mt-5">배낭버스</p>
      <FormikProvider value={value}>
        <form encType="multipart/form-data">
          <List noHairlinesMd>
            <div className="p-3 font-semibold bg-white">기본 정보</div>
            <ListInput
              label={i18next.t('login.name') as string}
              type="text"
              name="name"
              placeholder="이름을 입력해주세요"
              clearButton
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              errorMessageForce
              errorMessage={touched.name && errors.name}
            />
            <ListInput
              label={i18next.t('소속회사') as string}
              type="text"
              name="company_name"
              placeholder="소속된 회사의 이름을 입력해주세요"
              clearButton
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.company_name}
              errorMessageForce
              errorMessage={touched.company_name && errors.company_name}
            />
            <ListInput
              label={i18next.t('login.email') as string}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              clearButton
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              errorMessageForce
              errorMessage={touched.email && errors.email}
            />
            <ListInput
              label={i18next.t('login.password') as string}
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              clearButton
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              errorMessageForce
              errorMessage={touched.password && errors.password}
            />
            <ListInput
              label={i18next.t('login.password_confirmation') as string}
              type="password"
              name="password_confirmation"
              placeholder="비밀번호를 확인해주세요"
              clearButton
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password_confirmation}
              errorMessageForce
              errorMessage={touched.password_confirmation && errors.password_confirmation}
            />
          </List>

          {/* <div className="bg-white">
          <PhoneCertiication setCertComplete={setCertComplete} />
        </div> */}

          <List noHairlinesMd>
            <div className="p-3 font-semibold bg-white">버스운전자격증 (인증절차에만 사용됩니다)</div>
            <input
              className="p-3"
              type="file"
              name="driver_license"
              onChange={(event) => {
                setFieldValue('driver_license', event.currentTarget.files[0]);
              }}
            />
          </List>
          <List noHairlinesMd>
            <div className="p-3 font-semibold bg-white">공제 가입 확인서 (인증절차에만 사용됩니다)</div>
            <input
              className="p-3"
              type="file"
              name="deductible_confirmation"
              onChange={(event) => {
                setFieldValue('deductible_confirmation', event.currentTarget.files[0]);
              }}
            />
          </List>

          <AgreeCheckboxes names={['termCheck', 'privacyCheck', 'marketingCheck']} />

          <div className="p-4">
            <button
              type="submit"
              className="button button-fill button-large disabled:opacity-50"
              onClick={submitForm}
              disabled={isSubmitting || !isValid}
            >
              회원가입
            </button>
          </div>
        </form>
      </FormikProvider>
    </Page>
  );
};

export default React.memo(DriverSignUpPage);
