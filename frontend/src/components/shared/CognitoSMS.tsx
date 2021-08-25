import React, { useCallback, useEffect } from 'react';
import { Page, Navbar, List, ListInput, f7 } from 'framework7-react';
import { CognitoAuthError, F7Route, I18NextCognitoErrorResult, SignUpParams } from '@interfaces';
import S3Image from '@components/shared/S3Image';
import Button from '@components/shared/Button';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { formatCognitoPhoneNumber, formatPhoneNumber, toFormData } from '@utils';
import { CognitoUser, ISignupResult, AuthenticationDetails } from 'amazon-cognito-identity-js';
import i18next from 'i18next';
import { signupAPI, userPhonecheckAPI, userPhoneConfirmAPI } from '@api';
import { AxiosError } from 'axios';
import useAuth from '@hooks/useAuth';
import Auth from '@aws-amplify/auth';

interface CognitoSMSConfirmPageProps {
  signUpParams: SignUpParams;
}

interface CognitoSMSParams {
  phone_number: string;
  code: string | null;
  cognito_user: CognitoUser | null;
}

const INITIAL_SMS_PARAMS: CognitoSMSParams = {
  phone_number: '',
  code: null,
  cognito_user: null,
};

const cognitoSMSSchema = Yup.object().shape({
  phone_number: Yup.string()
    .required('핸드폰 번호를 입력 해주세요')
    .min(13, '핸드폰 번호 길이에 맞지 않아요')
    .max(13, '핸드폰 번호 길이에 맞지 않아요'),
  code: Yup.string().nullable().required('인증 코드를 입력 해주세요'),
});

const amplifySignUp = async (
  signUpParams: SignUpParams,
  cognitoSMSParams: CognitoSMSParams,
): Promise<ISignUpResult> => {
  const { email: username, password } = signUpParams;
  const { phone_number: phone_number_with_dashes } = cognitoSMSParams;
  const cognito_phone_number = formatCognitoPhoneNumber(phone_number_with_dashed);
  const unconfirmed_user = await Auth.signUp({
    usename,
    password,
    attributes: { email: username, phone_number: cognito_phone_number },
  });

  return unconfirmed_user;
};

const CognitoSMSConfirmPage: React.FC<CognitoSMSConfirmPageProps & F7Route> = ({ signUpParams, f7router }) => {
  const { authenticateUser } = useAuth();
  const onSubmitHandler = useCallback(
    async (values: CognitoSMSParams, { setFieldError }: FormikHelpers<CognitoSMSParams>) => {
      let user = null;

      try {
        f7.preloader.show();
        await Auth.confirmSignUp(signUpParams.email, `${values.code}`);
        user = await Auth.signIn({
          username: signUpParams.email,
          password: signUpParams.password,
        });

        await userPhoneConfirmAPI(values.phone_number);
      } catch (error) {
        const { code } = error as CognitoAuthError;
        const message = i18next.t<I18NextCognitoErrorResult>('signup.errors')[code];

        setFieldError('code', message);
        f7.preloader.hide();
        f7.dialog.alert(message);
        return;
      }

      await authenticateUser(user);
      f7.preloader.hide();
      f7.dialog.alert('성공적으로 회원가입 하였습니다.');
      f7router.navigate('/', { clearPreviousHistory: true, reloadAll: true, transition: 'f7-dive' });
    },
    [authenticateUser, f7router, signUpParams],
  );

  const { values, setFieldValue, handleBlur, touched, errors, setFieldError, handleChange, submitForm } =
    useFormik<CognitoSMSParams>({
      initialValues: INITIAL_SMS_PARAMS,
      onSubmit: onSubmitHandler,
      validateOnMount: true,
      validationSchema: cognitoSMSSchema,
    });

  const phoneNumberChangeHandler = useCallback(
    ({ target: { value } }) => {
      setFieldValue('phone_number', formatPhoneNumber(value));
    },
    [setFieldValue],
  );

  const signUpHandler = useCallback(
    async (cognitoSMSParams: CognitoSMSParams) => {
      let message = '';
      f7.preloader.show();
      const { phone_number: phone_number_with_dashes } = cognitoSMSParams;

      try {
        await userPhonecheckAPI(phone_number_with_dashes);
      } catch (error) {
        message = (error as AxiosError).response?.data.error_msg || '예상치 못한 오류가 발생 했습니다';
        f7.dialog.alert(message);
        f7.preloader.hide();
      }

      try {
        const { password, password_confirmation, ...busSignUpParams } = signUpParams;

        const fd = toFormData({
          modelName: 'user',
          data: busSignUpParams,
        });

        fd.append('user[phone_number]', phone_number_with_dashes);
        await signupAPI(fd);

        const cognitoUser = await amplifySignUp(signUpParams, cognitoSMSParams);
        setFieldValue('cognito_user', cognitoUser.user);
        f7.dialog.alert('인증 코드를 발송하였습니다');
      } catch (error) {
        if ((error as AxiosError).isAxiosError) {
          message = (error as AxiosError).response?.data.error_msg || '예상치 못한 오류가 발생 했습니다';
        } else {
          const { code } = error as CognitoAuthError;
          message = i18next.t<I18NextCognitoErrorResult>('signup.errors')[code];
        }
        f7.dialog.alert(message);
      } finally {
        f7.preloader.hide();
      }
    },
    [setFieldValue, signUpParams],
  );

  return (
    <Page noToolbar>
      <Navbar backLink title="핸드폰 인증" />
      <div className="flex flex-col items-center justify-center">
        <S3Image imageKey={signUpParams?.image?.key} className="w-24 h-24 rounded-2xl overflow-hidden" />
        <div className="bus-title">{signUpParams?.name}</div>
      </div>
      <form className="py-4 px-2">
        <List>
          <ListInput
            label="핸드폰 번호"
            name="phone_number"
            inputmode="decimal"
            type="text"
            placeholder={values.cognito_user ? '' : '본인인증을 위해 핸드폰 번호를 입력 해주세요'}
            disabled={!!values.cognito_user}
            onChange={phoneNumberChangeHandler}
            onBlur={handleBlur}
            value={values.phone_number}
            errorMessageForce
            errorMessage={(touched.phone_number && errors.phone_number) || ''}
          />
          <ListInput
            label="인증코드"
            name="code"
            type="number"
            placeholder={values.cognito_user ? '발송된 인증코드를 입력 해주세요' : ''}
            value={`${values.code}`}
            disabled={!values.cognito_user}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessageForce
            errorMessage={(touched.code && errors.code) || ''}
          />
        </List>
      </form>
      {values.cognito_user ? (
        <Button fixedBottom title="가입완료" disabled={!!errors.code} clickHandler={submitForm} />
      ) : (
        <Button
          fixedBottom
          title="인증코드 발송"
          disabled={!!errors.phone_number}
          clickHandler={() => signUpHandler(values)}
        />
      )}
    </Page>
  );
};

export default CognitoSMSConfirmPage;
