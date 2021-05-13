import React, { useState } from 'react';
import { f7, Navbar, Page, List, ListInput } from 'framework7-react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import PhoneCertiication from '@components/shared/PhoneCertification';
import { convertObjectToFormData, sleep } from '@utils';
import AgreeCheckboxes from '@components/shared/AgreeCheckboxes';
import { signupAPI } from '@api';
import useAuth from '@hooks/useAuth';

// interface FormValues extends Address {
interface FormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  company: string;
  legion: string;
  bus_number: string;
  bus_type: string;
  bus_old: string;
  people_available: number;
  certification1: string;
  certification2: string;
  introduce: string;
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
  // phone: Yup.string()
  //   .min(9, '길이가 너무 짧습니다')
  //   .max(15, '길이가 너무 깁니다')
  //   .required('휴대폰 번호를 인증해주세요'),
  // termCheck: Yup.boolean().oneOf([true], '이용약관에 동의해주세요'),
  // privacyCheck: Yup.boolean().oneOf([true], '개인정보 보호정책에 동의해주세요'),
  // marketingCheck: Yup.boolean(),
});

const CompanySignUpPage = () => {
  const [certComplete, setCertComplete] = useState(false);
  const { authenticateUser } = useAuth();
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    company: '',
    legion: '',
    bus_number: '',
    bus_type: '',
    bus_old: '',
    people_available: null,
    certification1: '',
    certification2: '',
    introduce: '',
    // phone: '',
    // termCheck: false,
    // privacyCheck: false,
    // marketingCheck: false,
  };

  return (
    <Page>
      <Navbar title="회원가입 - 버스회사" backLink sliding={false} />
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
                placeholder="회사 이름을 입력해주세요"
                clearButton
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                errorMessageForce
                errorMessage={touched.name && errors.name}
              />
              <ListInput
                label={i18next.t('소속회사')}
                type="text"
                name="company"
                placeholder="담당자의 이름을 입력해주세요"
                clearButton
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                errorMessageForce
                errorMessage={touched.company && errors.company}
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

            <div className="bg-white">
              <PhoneCertiication setCertComplete={setCertComplete} />
            </div>

            <List noHairlinesMd>
              <div className="p-3 font-semibold bg-white">출발가능지역</div>
              <ListInput
                // label={i18next.t('출발가능지역')}
                type="text"
                name="legion"
                placeholder="예: 서울특별시"
                clearButton
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.legion}
                errorMessageForce
                errorMessage={touched.legion && errors.legion}
              />
            </List>

            <List noHairlinesMd>
              <div className="p-3 font-semibold bg-white">회사소개</div>
              <ListInput
                //   label={i18next.t('자기소개')}
                type="textarea"
                name="introduce"
                placeholder="승객에게 표시되는 문구입니다."
                clearButton
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.introduce}
                errorMessageForce
                errorMessage={touched.introduce && errors.introduce}
              />
            </List>

            <List noHairlinesMd>
              <div className="p-3 font-semibold bg-white">회사로고</div>
              <input className="p-3" type="file" name="companyUpload"></input>
            </List>
            <List noHairlinesMd>
              <div className="p-3 font-semibold bg-white">사업자 등록증 사본 (인증절차에만 사용됩니다)</div>
              <input className="p-3" type="file" name="certification1Upload"></input>
            </List>
            <List noHairlinesMd>
              <div className="p-3 font-semibold bg-white">
                여객자동차 운송사업등록증 사본 <br />
                (인증절차에만 사용됩니다)
              </div>
              <input className="p-3" type="file" name="certification2Upload"></input>
            </List>
            <List noHairlinesMd>
              <div className="p-3 font-semibold bg-white">차량사진</div>
              <input className="p-3" type="file" name="busUpload"></input>
            </List>

            <AgreeCheckboxes names={['termCheck', 'privacyCheck', 'marketingCheck']} />

            <div className="p-4">
              <button
                type="submit"
                className="button button-fill button-large disabled:opacity-50"
                // disabled={isSubmitting || !isValid || !certComplete}
                disabled={isSubmitting || !isValid}
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

export default CompanySignUpPage;
