import React, { useState } from 'react';
import { f7, Navbar, Page, List, ListInput, Button } from 'framework7-react';
import { convertObjectToFormData, sleep } from '@utils';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@atoms';
import i18next from 'i18next';
import { modifyAPI } from '../../common/api/index';

const UserInfoSchema = Yup.object().shape({
  password: Yup.string(),
  passwordConfirmation: Yup.string().when('password', {
    is: (val: string) => val && val.length > 0,
    then:
      Yup.string().oneOf([Yup.ref('password')], '비밀번호가 일치하지 않아요') &&
      Yup.string().required('필수 입력사항 입니다'),
  }),
});

const ModifyPage = () => {
  const [imgState, setImgState] = useState({ file: '', imageURL: null });
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const { name, profile_img, email, user_type } = currentUser;

  const handleImgButton = () => {
    document.getElementById('imageInput').click();
  };

  const handleFileOnChange = async (event) => {
    event.preventDefault();

    if (event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onloadend = () => {
        setImgState({
          file,
          imageURL: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Page noToolbar>
      {/* Top Navbar */}
      <Navbar title="회원정보 수정" backLink sliding={false} />

      {/* Page Contents */}
      <Formik
        enableReinitialize
        initialValues={{
          email,
          profileImg: currentUser.profile_img || '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={UserInfoSchema}
        // eslint-disable-next-line consistent-return
        onSubmit={async (values, { setSubmitting }) => {
          if (imgState.file !== '') {
            values.profileImg = imgState.file;
          }

          if ((values.profileImg === currentUser.profile_img || '') && values.password === '') {
            return f7.dialog.alert('수정할 사항이 없습니다');
          }
          setSubmitting(false);
          f7.dialog.preloader('잠시만 기다려주세요...');
          await sleep(400);
          try {
            const fd = convertObjectToFormData({ modelName: 'user', data: values });
            fd.append('user[profile_img]', values.profileImg);

            const { data: user } = await modifyAPI(fd);
            setCurrentUser({ ...user, isAuthenticated: true });
            f7.dialog.close();
          } catch (error) {
            f7.dialog.close();
            f7.dialog.alert(error?.response?.data || error?.message);
          }
        }}
        validateOnMount
      >
        {({ handleChange, handleBlur, values, errors, touched, isSubmitting, isValid }) => (
          <Form encType="multipart/form-data">
            <List noHairlinesMd>
              <div className="p-3 font-semibold bg-white">기본 정보</div>
              <div className="flex flex-col items-center bg-white border-t">
                <img src={imgState.imageURL} className="rounded-3xl mt-4 w-36 h-36 object-cover" alt="user_image" />
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
                />
              </div>
              <ListInput
                disabled
                outline
                label={i18next.t('login.name') as string}
                type="text"
                name="name"
                value={name}
              />
              <ListInput
                disabled
                outline
                label={i18next.t('login.email') as string}
                type="text"
                name="email"
                value={email}
              />
              <ListInput
                outline
                label={i18next.t('login.password') as string}
                type="password"
                name="password"
                placeholder="새로운 비밀번호를 입력해주세요"
                onBlur={handleBlur}
                onChange={handleChange}
                clearButton
                errorMessageForce
                errorMessage={touched.password && errors.password}
              />
              <ListInput
                outline
                label={i18next.t('login.password_confirmation') as string}
                type="password"
                name="password_confirmation"
                placeholder="비밀번호를 확인해주세요"
                onBlur={handleBlur}
                onChange={handleChange}
                clearButton
                errorMessageForce
                errorMessage={touched.passwordConfirmation && errors.passwordConfirmation}
              />
            </List>

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
