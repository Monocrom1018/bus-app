import React from 'react';
import { f7, Navbar, Page, List, ListInput, Button } from 'framework7-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DaumAddressSearch from '@components/shared/DaumAddressSearch';

const UserInfoSchema = Yup.object().shape({
  password: Yup.string(),
  password_confirmation: Yup.string(),
});

const ModifyPage = () => {
  return (
    <Page noToolbar>
      {/* Top Navbar */}
      <Navbar title="회원정보 수정" backLink={true} sliding={false}></Navbar>

      {/* Page Contents */}
      <Formik
        enableReinitialize
        initialValues={{
          password: '',
          password_confirmation: '',
          zipcode: '',
          address1: '',
          address2: '',
        }}
        validationSchema={UserInfoSchema}
        onSubmit={async (values, { setSubmitting }) => {}}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, values, errors, touched, isSubmitting, isValid }) => (
          <Form>
            <List noHairlinesMd>
              <div className="p-3 font-semibold bg-white">기본 정보</div>
              <ListInput disabled outline label={i18next.t('login.name')} type="text" name="name" value="홍길동" />
              <ListInput
                disabled
                outline
                label={i18next.t('login.email')}
                type="text"
                name="email"
                value="test01@bus.com"
              />
              <ListInput
                outline
                label={i18next.t('login.password')}
                type="password"
                name="password"
                placeholder="새로운 비밀번호를 입력해주세요"
                clearButton
                errorMessageForce={true}
                errorMessage={touched.password && errors.password}
              />
              <ListInput
                outline
                label={i18next.t('login.password_confirmation')}
                type="password"
                name="password_confirmation"
                placeholder="비밀번호를 확인해주세요"
                clearButton
                errorMessageForce={true}
                errorMessage={touched.password_confirmation && errors.password_confirmation}
              />
            </List>

            <DaumAddressSearch />

            <div className="p-4">
              <button
                type="submit"
                className="button button-fill button-large disabled:opacity-50"
                disabled={isSubmitting || !isValid}
              >
                정보수정
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default ModifyPage;
