import React, { useState } from 'react';
import { f7, Navbar, Page, List, ListInput } from 'framework7-react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import PhoneCertiication from '@components/shared/PhoneCertification';
import DaumAddressSearch from '@components/shared/DaumAddressSearch';
import { convertObjectToFormData, sleep } from '@utils';
import AgreeCheckboxes from '@components/shared/AgreeCheckboxes';
import { signupAPI } from '@api';
import useAuth from '@hooks/useAuth';
import { Address } from 'src/common/constants/users';

interface FormValues extends Address {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  termCheck: boolean;
  privacyCheck: boolean;
  marketingCheck: boolean;
}

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('필수 입력사항 입니다'),
  email: Yup.string().email().required('필수 입력사항 입니다'),
  password: Yup.string().min(4, '길이가 너무 짧습니다').max(50, '길이가 너무 깁니다').required('필수 입력사항 입니다'),
  password_confirmation: Yup.string()
    .min(4, '길이가 너무 짧습니다')
    .max(50, '길이가 너무 깁니다')
    .required('필수 입력사항 입니다'),
  zipcode: Yup.string().min(4, '길이가 너무 짧습니다').max(8, '길이가 너무 깁니다').required('필수 입력사항 입니다'),
  address1: Yup.string().required('필수 입력사항 입니다'),
  phone: Yup.string()
    .min(9, '길이가 너무 짧습니다')
    .max(15, '길이가 너무 깁니다')
    .required('휴대폰 번호를 인증해주세요'),
  termCheck: Yup.boolean().oneOf([true], '이용약관에 동의해주세요'),
  privacyCheck: Yup.boolean().oneOf([true], '개인정보 보호정책에 동의해주세요'),
  marketingCheck: Yup.boolean(),
});

const SignUpPage = () => {
  const [certComplete, setCertComplete] = useState(false);
  const { authenticateUser } = useAuth();
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    zipcode: '',
    address1: '',
    address2: '',
    phone: '',
    termCheck: false,
    privacyCheck: false,
    marketingCheck: false,
  };

  return (
    <Page>
      <Navbar title="회원가입" backLink sliding={false} />
      <p className="font-semibole text-4xl text-center mt-5">배낭버스</p>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting }: FormikHelpers<FormValues>) => {
          await sleep(400);
          setSubmitting(false);
          f7.dialog.preloader('잠시만 기다려주세요...');
          try {
            const fd = convertObjectToFormData({ modelName: 'user', data: values });
            const response = await signupAPI(fd);
            f7.dialog.close();
            authenticateUser(response.data);
          } catch (error) {
            f7.dialog.close();
            f7.dialog.alert(error?.response?.data || error?.message);
          }
        }}
        validateOnMount
        // enableReinitialize
      >
        {({ handleChange, handleBlur, values, errors, touched, isSubmitting, isValid }) => (
          <Form>
            <List noHairlinesMd>
              <div className="p-3 font-semibold bg-white">기본 정보</div>
              <ListInput
                label={i18next.t('login.name')}
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
                label={i18next.t('login.email')}
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
                label={i18next.t('login.password')}
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
                label={i18next.t('login.password_confirmation')}
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

            <DaumAddressSearch />

            <div className="bg-white">
              <PhoneCertiication setCertComplete={setCertComplete} />
            </div>

            <AgreeCheckboxes names={['termCheck', 'privacyCheck', 'marketingCheck']} />

            <div className="p-4">
              <button
                type="submit"
                className="button button-fill button-large disabled:opacity-50"
                disabled={isSubmitting || !isValid || !certComplete}
              >
                회원가입
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default SignUpPage;
