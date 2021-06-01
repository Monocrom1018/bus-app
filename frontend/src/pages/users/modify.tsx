import React, { useState, useRef } from 'react';
import { f7, Navbar, Page, List, ListInput, Button } from 'framework7-react';
import { convertObjectToFormData, sleep } from '@utils';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DaumAddressSearch from '@components/shared/DaumAddressSearch';
import { modifyAPI } from '../../common/api/index';

const UserInfoSchema = Yup.object().shape({
  password: Yup.string(),
  password_confirmation: Yup.string(),
  profile_img: Yup.mixed(),
});

const ModifyPage = () => {
  const [imgState, setImgState] = useState({ file: '', imageURL: null });

  const handleImgButton = () => {
    document.getElementById('imageInput').click();
  };

  const handleFileOnChange = async (event) => {
    event.preventDefault();

    if (event.target.files[0]) {
      let reader = new FileReader();
      let file = event.target.files[0];

      reader.onloadend = () => {
        setImgState({
          file: file,
          imageURL: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

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
          profile_img: '',
        }}
        validationSchema={UserInfoSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await sleep(400);
          setSubmitting(false);
          f7.dialog.preloader('잠시만 기다려주세요...');
          try {
            if (imgState.file !== '') {
              values.profile_img = imgState.file;
            }
            console.log(imgState.file);
            const fd = convertObjectToFormData({ modelName: 'user', data: values });
            const response = await modifyAPI(fd);
            console.log(response);
            f7.dialog.close();
          } catch (error) {
            f7.dialog.close();
            f7.dialog.alert(error?.response?.data || error?.message);
          }
        }}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, values, errors, touched, isSubmitting, isValid }) => (
          <Form encType="multipart/form-data">
            <List noHairlinesMd>
              <div className="p-3 font-semibold bg-white">기본 정보</div>
              <div className="flex flex-col items-center bg-white border-t">
                <img src={imgState.imageURL} className="rounded-3xl mt-4 w-36 h-36 object-cover"></img>
                <Button className="my-2 font-semibold" onClick={handleImgButton}>
                  프로필사진 변경
                </Button>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/jpg,impge/png,image/jpeg,image/gif"
                  name="profile_img"
                  onChange={handleFileOnChange}
                  className="hidden"
                ></input>
              </div>
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

            {/* <input
              type="file"
              name="profile_img"
              accept="image/jpg, image/png, image/jpeg"
              onChange={(e) => setFieldValue('profile_img', e.currentTarget.files[0])}
              className="p-4"
            /> */}
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
