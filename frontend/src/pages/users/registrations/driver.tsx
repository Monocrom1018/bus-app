import { signupAPI } from '@api';
import AgreeCheckboxes from '@components/shared/AgreeCheckboxes';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { f7, Navbar, Page, List, ListInput, Checkbox, Button } from 'framework7-react';
import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import { CognitoUser, ISignUpResult } from 'amazon-cognito-identity-js';
import Amplify, { API, Auth } from 'aws-amplify';
import { configs } from '@config';
import i18next from 'i18next';
import * as Yup from 'yup';
import useAuth from '@hooks/useAuth';
import S3MultiFilePicker from '@components/files/S3MultiFilePicker';
import { callPhoneCertification } from '@graphql/mutations';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { MainPlaceHolder } from '@components/images';
import { showToast } from '@js/utils';
import { sleep } from '@utils';

interface DriverSignUpParams {
  user_type: string;
  name: string;
  company_name: string;
  director_name: string;
  director_email: string;
  director_phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  phone_certification: number | null;
  phone_matched: boolean;
  driver_license: File;
  deductible_confirmation: File;
  termCheck: boolean;
  privacyCheck: boolean;
  marketingCheck: boolean;
  files: Array<any>;
}

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('필수 입력사항 입니다'),
  company_name: Yup.string().required('필수 입력사항 입니다'),
  director_name: Yup.string(),
  director_email: Yup.string(),
  director_phone: Yup.number().typeError('숫자만 입력해주세요'),
  email: Yup.string().email().required('필수 입력사항 입니다'),
  password: Yup.string().min(8, '길이가 너무 짧습니다').max(50, '길이가 너무 깁니다').required('필수 입력사항 입니다'),
  password_confirmation: Yup.string()
    .required('필수 입력사항 입니다')
    .when('password', {
      is: (val: string) => val && val.length > 0,
      then: Yup.string().oneOf([Yup.ref('password')], '비밀번호가 일치하지 않아요'),
    }),
  phone: Yup.string()
    .min(9, '길이가 너무 짧습니다')
    .max(15, '길이가 너무 깁니다')
    .required('휴대폰 번호를 입력해주세요'),
  phone_matched: Yup.boolean().oneOf([true], '휴대폰 인증을 완료해주세요'),
  termCheck: Yup.boolean().oneOf([true], '이용약관에 동의해주세요'),
  privacyCheck: Yup.boolean().oneOf([true], '개인정보 보호정책에 동의해주세요'),
  marketingCheck: Yup.boolean(),
  files: Yup.mixed().test("fileLength", "파일을 모두 첨부해주세요", (value) => {
    if (value.length < 2) return false
    return true
  }),

});

const INITIAL_SIGN_UP_PARAMS: DriverSignUpParams = {
  user_type: 'DRIVER',
  name: '',
  company_name: '',
  director_name: '',
  director_email: '',
  director_phone: '',
  email: '',
  password: '',
  password_confirmation: '',
  phone: '',
  phone_certification: null,
  phone_matched: false,
  termCheck: false,
  privacyCheck: false,
  marketingCheck: false,
  driver_license: null,
  deductible_confirmation: null,
  files: [],
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
  const [isCompany, setIsCompany] = useState(false);
  const { authenticateUser } = useAuth();
  const [code, setCode] = useState('');
  const certificateCode = useRef(code);

  useEffect(() => {
    Amplify.configure({
      aws_appsync_authenticationType: configs.AWS_API_KEY,
    });
  }, []);

  const sendPhoneCertification = async () => {
    const tempCode = `${Math.floor(1000 + Math.random() * 1000)}`;
    const phoneNumber = (values.phone).replace(/-/g, '');
    setCode(tempCode);
    certificateCode.current = tempCode;

    await API.graphql(
      {
        query: callPhoneCertification,
        variables: { code: certificateCode.current, phone_number: phoneNumber },
      },
      {
        'x-api-key': configs.AWS_API_KEY,
      },
    );

    showToast("인증번호가 발송되었습니다")
  };

  const checkPhoneCertification = async () => {
    const isMatched = values.phone_certification === Number(code)
    f7.preloader.show();
    await sleep(500);
    f7.preloader.hide();
    if(isMatched) {
      setFieldValue('phone_matched', true);
      showToast("인증이 완료되었습니다")
      return;
    } else {
      setFieldValue('phone_certification', null);
      showToast("인증번호가 일치하지 않습니다")
    }
  }

  const onSubmitHandler = useCallback(
    async (signUpParams: DriverSignUpParams, { setSubmitting, setFieldValue }: FormikHelpers<DriverSignUpParams>) => {
      setSubmitting(true);
      f7.preloader.show();
      let cognitoUserSession: null | CognitoUser = null; // cognito 유저 생성 여부 실패 시 null
      let isSignUpSuccess = false; // 서버 회원가입 성공 여부
      let message: string; // 에러 메시지 혹은 성공 메시지

      // amplify signup 시도
      try {
        // if (values.files.length < 2) {
        //   showToast('파일을 모두 첨부해주세요');
        //   return;
        // }
        Amplify.configure({
          aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
        });
        await amplifySignUp(signUpParams);
        cognitoUserSession = await Auth.signIn({
          username: signUpParams.email,
          password: signUpParams.password,
        });
      } catch (error) {
        message = error.message;
        if (error.code === 'UsernameExistsException') {
          setFieldValue('email', '');
          setFieldValue('password', '');
          setFieldValue('password_confirmation', '');
          message = '이미 가입된 이메일 입니다';
        }
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
        if (typeof error.message === 'string') message = error.message;
        else message = '예상치 못한 오류가 발생하였습니다';

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
        window.location.replace('/');
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
    <Page noToolbar>
      <Navbar title="회원가입 - 기사님" backLink sliding={false} />
      <p className="font-semibole text-4xl text-center mt-5">배낭버스</p>
      <FormikProvider value={value}>
        <form encType="multipart/form-data">
          <List noHairlinesMd>
            <div className="mr-4 flex justify-end pb-1">
              <Checkbox onChange={() => setIsCompany(!isCompany)} />
              <span className="ml-1 text-gray-700 text-base font-semibold">회사 담당자님이신가요?</span>
            </div>
            <div className="p-3 font-semibold bg-white">기사 정보</div>
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
            <li className="grid grid-cols-12 gap-4">
              <div className="col-span-9">
                <ListInput
                  label="핸드폰번호"
                  type="text"
                  name="phone"
                  placeholder="핸드폰 번호를 입력해주세요"
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  errorMessageForce
                  errorMessage={touched.phone && errors.phone}
                />
              </div>
              <div className="col-span-3 my-auto mr-4">
                <Button outline onClick={sendPhoneCertification}>
                  인증받기
                </Button>
              </div>
            </li>
            <li className="grid grid-cols-12 gap-4">
              <div className="col-span-9">
                <ListInput
                  label="인증번호"
                  type="number"
                  name="phone_certification"
                  placeholder="인증번호를 입력해주세요"
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_certification}
                  errorMessageForce
                  errorMessage={touched.phone_certification && errors.phone_certification}
                />
              </div>
              <div className="col-span-3 my-auto mr-4">
                <Button
                  fill
                  onClick={checkPhoneCertification}
                >
                  인증확인
                </Button>
              </div>
            </li>
          </List>
          {isCompany && (
            <>
              <List noHairlinesMd>
                <div className="p-3 font-semibold bg-white">회사 정보</div>
                <ListInput
                  label={i18next.t('담당자 이름') as string}
                  type="text"
                  name="director_name"
                  placeholder="담당자 이름을 입력해주세요"
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.director_name}
                  errorMessageForce
                  errorMessage={touched.director_name && errors.director_name}
                />
                <ListInput
                  label={i18next.t('담당자 이메일') as string}
                  type="text"
                  name="director_email"
                  placeholder="담당자 이메일을 입력해주세요"
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.director_email}
                  errorMessageForce
                  errorMessage={touched.director_email && errors.director_email}
                />
                <ListInput
                  label={i18next.t('담당자 연락처') as string}
                  type="text"
                  name="director_phone"
                  placeholder="담당자 연락처를 입력해주세요"
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.director_phone}
                  errorMessageForce
                  errorMessage={touched.director_phone && errors.director_phone}
                />
              </List>
              <List noHairlinesMd>
                <div className="p-3 font-semibold bg-white">사업자 등록증(인증절차에만 사용됩니다)</div>
                <S3MultiFilePicker
                  isMultiple={false}
                  initialData={undefined}
                  placeholderComponent={<MainPlaceHolder maxCount={1} />}
                  containerClassName="flex justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-md py-6 mt-5 -mb-4 relative"
                  deleteButtonComponent={<IoCloseCircleSharp size={26} className="text-black bg-white rounded-full" />}
                  removeFileHandler={(key, removedS3File) => {
                    if (removedS3File) setRemovedIds((prev) => [...prev, removedS3File.id]);
                  }}
                  addFileHandler={(v: any) => {
                    // 이미지 컬럼 변경 후 여기도 변경해야함
                    setFieldValue('file_contents', v[0]);
                  }}
                />
              </List>
              <List noHairlinesMd>
                <div className="p-3 font-semibold bg-white">
                  여객자동차 운송사업등록증
                  <br />
                  (인증절차에만 사용됩니다)
                </div>
                <S3MultiFilePicker
                  isMultiple={false}
                  initialData={undefined}
                  placeholderComponent={<MainPlaceHolder maxCount={1} />}
                  containerClassName="flex justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-md py-6 mt-5 -mb-4 relative"
                  deleteButtonComponent={<IoCloseCircleSharp size={26} className="text-black bg-white rounded-full" />}
                  removeFileHandler={(key, removedS3File) => {
                    if (removedS3File) setRemovedIds((prev) => [...prev, removedS3File.id]);
                  }}
                  addFileHandler={(v: any) => {
                    // 이미지 컬럼 변경 후 여기도 변경해야함
                    setFieldValue('file_contents', v[0]);
                  }}
                />
              </List>
            </>
          )}

          <List noHairlinesMd>
            <div className="p-3 font-semibold bg-white">버스운전자격증 (인증절차에만 사용됩니다)</div>
            <S3MultiFilePicker
              isMultiple={false}
              initialData={undefined}
              placeholderComponent={<MainPlaceHolder maxCount={1} />}
              containerClassName="flex justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-md py-6 mt-5 -mb-4 relative"
              deleteButtonComponent={<IoCloseCircleSharp size={26} className="text-black bg-white rounded-full" />}
              removeFileHandler={(key, removedS3File) => {
                if (removedS3File) setRemovedIds((prev) => [...prev, removedS3File.id]);
              }}
              addFileHandler={(v: any) => {
                setFieldValue('files[0]', v[0]);
              }}
            />
          </List>
          <List noHairlinesMd>
            <div className="p-3 font-semibold bg-white">공제 가입 확인서 (인증절차에만 사용됩니다)</div>
            <S3MultiFilePicker
              isMultiple={false}
              initialData={undefined}
              placeholderComponent={<MainPlaceHolder maxCount={1} />}
              containerClassName="flex justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-md py-6 mt-5 -mb-4 relative"
              deleteButtonComponent={<IoCloseCircleSharp size={26} className="text-black bg-white rounded-full" />}
              removeFileHandler={(key, removedS3File) => {
                if (removedS3File) setRemovedIds((prev) => [...prev, removedS3File.id]);
              }}
              addFileHandler={(v: any) => {
                // 이미지 컬럼 변경 후 여기도 변경해야함
                setFieldValue('files[1]', v[0]);
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
function setRemovedIds(arg0: (prev: any) => any[]) {
  throw new Error('Function not implemented.');
}
