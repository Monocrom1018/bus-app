import React, { useState, useRef, useEffect } from 'react';
import { f7, Navbar, Page, List, ListInput, Button, ListItem, AccordionContent } from 'framework7-react';
import { convertObjectToFormData, sleep } from '@utils';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { modifyAPI, get, userMeApi } from '../../common/api/index';
import { useRecoilState } from 'recoil';
import useAuth from '@hooks/useAuth';
import { currentUserState } from '@atoms';
import * as fs from 'fs';

const handleArrayChange = (e, arrayName) => {
  const value = e.target.value;
  const valueIndex = arrayName.indexOf(value);
  if (valueIndex !== -1) {
    arrayName.splice(valueIndex, 1);
  } else {
    arrayName.push(value);
  }
};

const UserInfoSchema = Yup.object().shape({
  password: Yup.string(),
  passwordConfirmation: Yup.string().when('password', {
    is: (val: string) => val && val.length > 0,
    then:
      Yup.string().oneOf([Yup.ref('password')], '비밀번호가 일치하지 않아요') &&
      Yup.string().required('필수 입력사항 입니다'),
  }),
  peopleAvailable: Yup.number().typeError('숫자만 입력해주세요'),
  basicKm: Yup.number().typeError('숫자만 입력해주세요'),
  basicCharge: Yup.number().typeError('숫자만 입력해주세요'),
  chargePerKm: Yup.number().typeError('숫자만 입력해주세요'),
  chargePerDay: Yup.number().typeError('숫자만 입력해주세요'),
  serviceCharge: Yup.number().typeError('숫자만 입력해주세요'),
  nightBegin: Yup.string(),
  nightEnd: Yup.string(),
  nightCharge: Yup.number().typeError('숫자만 입력해주세요'),
  busType: Yup.string(),
  busOld: Yup.string(),
  busNumber: Yup.string(),
  introduce: Yup.string(),
});

const ModifyPage = () => {
  const [imgState, setImgState] = useState({ file: '', imageURL: null });
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const drivableLegion = [...currentUser.drivable_legion];
  const drivableDate = [...currentUser.drivable_date];
  const { name, profile_img, email, user_type } = currentUser;
  const legions = [
    '서울',
    '경기',
    '인천',
    '강원',
    '대전',
    '대구',
    '부산',
    '충북',
    '충남',
    '경남',
    '경북',
    '전북',
    '전남',
    '광주',
    '세종',
    '울산',
    '제주',
  ];
  const daysOfWeek = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  const daysOfEnglish = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
          email: email,
          profileImg: currentUser.profile_img || '',
          password: '',
          passwordConfirmation: '',
          company: currentUser.company || '',
          busNumber: currentUser.bus_number || '',
          busType: currentUser.bus_type || '',
          busOld: currentUser.bus_old || '',
          peopleAvailable: currentUser.people_available || '',
          introduce: currentUser.introduce || '',
          basicCharge: currentUser.basic_charge || '',
          basicKm: currentUser.basic_km || '',
          chargePerKm: currentUser.charge_per_km || '',
          nightCharge: currentUser.night_charge || '',
          nightBegin: currentUser.night_begin || '',
          nightEnd: currentUser.night_end || '',
          chargePerDay: currentUser.charge_per_day || '',
          serviceCharge: currentUser.service_charge || '',
        }}
        validationSchema={UserInfoSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await sleep(400);
          setSubmitting(false);
          f7.dialog.preloader('잠시만 기다려주세요...');
          try {
            if (imgState.file !== '') {
              values.profileImg = imgState.file;
            }

            const fd = convertObjectToFormData({ modelName: 'user', data: values });
            fd.append('user[profile_img]', values.profileImg);

            drivableLegion.forEach((legion) => {
              fd.append('user[drivableLegion]', legion);
            });

            drivableDate.forEach((date) => {
              fd.append('user[drivableDate]', date);
            });

            const response = await modifyAPI(fd);
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
                />
              </div>
              <ListInput disabled outline label={i18next.t('login.name')} type="text" name="name" value={name} />
              <ListInput disabled outline label={i18next.t('login.email')} type="text" name="email" value={email} />
              <ListInput
                outline
                label={i18next.t('login.password')}
                type="password"
                name="password"
                placeholder="새로운 비밀번호를 입력해주세요"
                onBlur={handleBlur}
                onChange={handleChange}
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
                onBlur={handleBlur}
                onChange={handleChange}
                clearButton
                errorMessageForce={true}
                errorMessage={touched.passwordConfirmation && errors.passwordConfirmation}
              />
            </List>

            {user_type === 'driver' || user_type === 'company' ? (
              <>
                <List noHairlinesMd accordionList>
                  <ListItem accordionItem title="출발가능지역 (복수선택 가능)">
                    <AccordionContent>
                      {legions.map((legion) => {
                        return (
                          <ListItem
                            checkbox
                            onChange={(e) => handleArrayChange(e, drivableLegion)}
                            value={legion}
                            title={legion}
                            checked={currentUser.drivable_legion.includes(legion)}
                            name="demo-checkbox"
                          />
                        );
                      })}
                    </AccordionContent>
                  </ListItem>
                </List>

                <List noHairlinesMd accordionList>
                  <ListItem accordionItem title="운행가능날짜 (복수선택 가능)">
                    <AccordionContent>
                      {daysOfWeek.map((day, idx) => {
                        return (
                          <ListItem
                            checkbox
                            title={day}
                            value={daysOfEnglish[idx]}
                            onChange={(e) => handleArrayChange(e, drivableDate)}
                            checked={currentUser.drivable_date.includes(daysOfEnglish[idx])}
                            name="demo-checkbox"
                          />
                        );
                      })}
                    </AccordionContent>
                  </ListItem>
                </List>
                <List noHairlinesMd>
                  <div className="p-3 font-semibold bg-white">차량 정보</div>
                  <ListInput
                    label={i18next.t('차량번호')}
                    type="text"
                    name="busNumber"
                    placeholder="예: 서울12가1234"
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.busNumber}
                    errorMessageForce
                    errorMessage={touched.busNumber && errors.busNumber}
                  />
                  <ListInput
                    label={i18next.t('가용승객수')}
                    type="text"
                    name="peopleAvailable"
                    placeholder="가용 승객수를 숫자만 입력해주세요"
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.peopleAvailable}
                    errorMessageForce
                    errorMessage={touched.peopleAvailable && errors.peopleAvailable}
                  />
                  <ListInput
                    label={i18next.t('차량유형')}
                    type="select"
                    name="busType"
                    defaultValue="대형"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.busType}
                    errorMessageForce
                    errorMessage={touched.busType && errors.busType}
                  >
                    <option value="대형">대형</option>
                    <option value="대형우등">대형우등</option>
                    <option value="중형">중형</option>
                    <option value="중형우등">중형우등</option>
                    <option value="미니버스">미니버스</option>
                    <option value="미니썬롱">미니썬롱</option>
                    <option value="미니우등">미니우등</option>
                    <option value="벤">벤</option>
                  </ListInput>
                  <ListInput
                    label={i18next.t('차량연식')}
                    type="select"
                    name="busOld"
                    defaultValue="2011년식"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.busOld}
                    errorMessageForce
                    errorMessage={touched.busOld && errors.busOld}
                  >
                    <option value="2010">2010년식</option>
                    <option value="2011">2011년식</option>
                    <option value="2012">2012년식</option>
                    <option value="2013">2013년식</option>
                    <option value="2014">2014년식</option>
                    <option value="2015">2015년식</option>
                    <option value="2016">2016년식</option>
                    <option value="2017">2017년식</option>
                    <option value="2018">2018년식</option>
                    <option value="2019">2019년식</option>
                    <option value="2020">2020년식</option>
                    <option value="2021">2021년식</option>
                  </ListInput>

                  <List noHairlinesMd>
                    <div className="p-3 font-semibold bg-white">운행단가 정보</div>
                    <ListInput
                      label={i18next.t('기본요금')}
                      type="text"
                      name="basicCharge"
                      placeholder="숫자만 입력해주세요 (예 : 300000)"
                      clearButton
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.basicCharge}
                      errorMessageForce
                      errorMessage={touched.basicCharge && errors.basicCharge}
                    />
                    <ListInput
                      label={i18next.t('기본운행거리(km)')}
                      type="text"
                      name="basicKm"
                      placeholder="숫자만 입력해주세요 (예 : 100)"
                      clearButton
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.basicKm}
                      errorMessageForce
                      errorMessage={touched.basicKm && errors.basicKm}
                    />
                    <ListInput
                      label={i18next.t('km당 단가')}
                      type="text"
                      name="chargePerKm"
                      placeholder="숫자만 입력해주세요 (예 : 1000)"
                      clearButton
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.chargePerKm}
                      errorMessageForce
                      errorMessage={touched.chargePerKm && errors.chargePerKm}
                    />
                    <ListInput
                      label={i18next.t('심야시간 추가요금')}
                      type="text"
                      name="nightCharge"
                      placeholder="숫자만 입력해주세요 (예 : 50000)"
                      clearButton
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nightCharge}
                      errorMessageForce
                      errorMessage={touched.nightCharge && errors.nightCharge}
                    />
                    <ListInput
                      label={i18next.t('1박 추가시 추가요금')}
                      type="text"
                      name="chargePerDay"
                      placeholder="숫자만 입력해주세요 (예 : 400000)"
                      clearButton
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.chargePerDay}
                      errorMessageForce
                      errorMessage={touched.chargePerDay && errors.chargePerDay}
                    />
                    <ListInput
                      label={i18next.t('봉사료')}
                      type="text"
                      name="serviceCharge"
                      placeholder="숫자만 입력해주세요 (예 : 50000)"
                      clearButton
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.serviceCharge}
                      errorMessageForce
                      errorMessage={touched.serviceCharge && errors.serviceCharge}
                    />
                  </List>

                  <List noHairlinesMd>
                    <div className="p-3 font-semibold bg-white">심야운행 정보</div>
                    <ListInput
                      label={i18next.t('심야시작시간')}
                      type="select"
                      defaultValue="20시"
                      name="nightBegin"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nightBegin}
                      errorMessageForce
                      errorMessage={touched.nightBegin && errors.nightBegin}
                    >
                      <option value="21">21시</option>
                      <option value="22">22시</option>
                      <option value="23">23시</option>
                      <option value="24">24시</option>
                      <option value="1">01시</option>
                      <option value="2">02시</option>
                      <option value="3">03시</option>
                    </ListInput>
                    <ListInput
                      label={i18next.t('심야종료시간')}
                      type="select"
                      defaultValue="04시"
                      name="nightEnd"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nightEnd}
                      errorMessageForce
                      errorMessage={touched.nightEnd && errors.nightEnd}
                    >
                      <option value="4">04시</option>
                      <option value="5">05시</option>
                      <option value="6">06시</option>
                      <option value="7">07시</option>
                    </ListInput>
                  </List>

                  <List noHairlinesMd>
                    <div className="p-3 font-semibold bg-white">자기소개</div>
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
                </List>
                <List noHairlinesMd>
                  <div className="p-3 font-semibold bg-white">차량사진</div>
                  <input className="p-3" type="file" name="busUpload"></input>
                </List>

                {user_type === 'driver' ? (
                  <>
                    <List noHairlinesMd>
                      <div className="p-3 font-semibold bg-white">버스운전자격증 (인증절차에만 사용됩니다)</div>
                      <input className="p-3" type="file" name="certification1Upload"></input>
                    </List>
                    <List noHairlinesMd>
                      <div className="p-3 font-semibold bg-white">공제 가입 확인서 (인증절차에만 사용됩니다)</div>
                      <input className="p-3" type="file" name="certification2Upload"></input>
                    </List>
                  </>
                ) : null}

                {user_type === 'company' ? (
                  <>
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
                  </>
                ) : null}
              </>
            ) : null}
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
