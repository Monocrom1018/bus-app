import React, { useState } from 'react';
import { f7, Navbar, Page, List, ListInput } from 'framework7-react';
import { sleep } from '@utils';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@atoms';
import i18next from 'i18next';
import S3ImagePicker from '@components/images/S3ImagePicker';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { MainPlaceHolder } from '@components/images';
import { updateAPI } from '@api';
import { pick } from 'lodash';

const UserInfoSchema = Yup.object().shape({
  password: Yup.string(),
  passwordConfirmation: Yup.string().when('password', {
    is: (val: string) => val && val.length > 0,
    then:
      Yup.string().oneOf([Yup.ref('password')], '비밀번호가 일치하지 않아요') &&
      Yup.string().required('필수 입력사항 입니다'),
  }),
});

const EditPage = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [removedIds, setRemovedIds] = useState<number[]>([]);
  const { name, profile, email } = currentUser;

  return (
    <Page noToolbar>
      <Navbar title="회원정보 수정" backLink sliding={false} />

      <Formik
        enableReinitialize
        initialValues={{
          email,
          name,
          profileImg: currentUser.profile || '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={UserInfoSchema}
        // eslint-disable-next-line consistent-return
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          f7.dialog.preloader('잠시만 기다려주세요...');
          await sleep(400);
          try {
            values.profileImg = pick(values.profileImg, ['key']);
            const { data: user } = await updateAPI(values);
            setCurrentUser({ ...user, isAuthenticated: true });
            f7.dialog.close();
          } catch (error) {
            f7.dialog.close();
            f7.dialog.alert(error?.response?.data || error?.message);
          }
        }}
        validateOnMount
      >
        {({ handleChange, handleBlur, values, errors, touched, isSubmitting, isValid, setFieldValue }) => (
          <Form encType="multipart/form-data">
            <List noHairlinesMd>
              <div className="p-3 font-semibold bg-white">기본 정보</div>
              <div className="flex flex-col items-center bg-white border-t">
                <S3ImagePicker
                  isMultiple={false}
                  initialData={profile ? [profile] : undefined}
                  placeholderComponent={<MainPlaceHolder maxCount={1} isImage />}
                  deleteButtonComponent={<IoCloseCircleSharp size={26} className="text-black bg-white rounded-full" />}
                  removeImageHandler={(key, removedS3Image) => {
                    if (removedS3Image) setRemovedIds((prev) => [...prev, removedS3Image.id]);
                  }}
                  containerClassName="w-full h-full relative"
                  addImageHandler={(v: any) => {
                    setFieldValue('profileImg', v[0]);
                  }}
                />
              </div>
              <ListInput outline label={i18next.t('login.name') as string} type="text" name="name" value={name} />
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

export default EditPage;
