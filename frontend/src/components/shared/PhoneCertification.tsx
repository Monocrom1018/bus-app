import React, { useState, useRef, useEffect } from 'react';
import { f7, Row, Col, List, ListInput } from 'framework7-react';
import { getSmsAuth } from '@api';
import { useField } from 'formik';
import { toast } from '@js/utils.js';

const PhoneCertiication = (props) => {
  const [code, setCode] = useState<string>('');
  const [certComplete, setCertComplete] = useState<boolean>(false);
  const [sended, setSended] = useState<boolean>(false);
  const [timeLeftOn, setTimeLeftOn] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<string>('3:00');

  const $phoneInput = useRef(null);
  const $codeInput = useRef(null);
  const timeLeftInterval = useRef(null);

  const [field, meta] = useField({ name: 'phone' });

  const onChangeCode = (e) => setCode(e.target.value);

  const calcLeftTime = () => {
    if (timeLeftOn) clearInterval(timeLeftInterval.current);
    setTimeLeftOn(true);
    setTimeLeft('3:00');
    let maxTime: number = 180; // 3 minutes
    let min;
    let sec;
    timeLeftInterval.current = setInterval(() => {
      min = Math.floor(maxTime / 60);
      sec = maxTime % 60;
      setTimeLeft(`${min}:${sec >= 10 ? sec : `0${sec}`}`);
      maxTime--;
      if (maxTime < 0) {
        clearInterval(timeLeftInterval.current);
        setTimeLeft('인증시간이 초과되었습니다');
      }
    }, 1000);
  };

  const onClickSendPhoneCert = async () => {
    const ts = toast.get();
    let phone = field.value;

    if (phone === '') {
      ts.setToastText('휴대폰 번호를 입력해주세요.').openToast();
      $phoneInput.current.focus();
    } else if (phone.length < 10 || phone.length > 12) {
      ts.setToastText('휴대폰 번호가 올바르지 않습니다').openToast();
      $phoneInput.current.focus();
    } else {
      if (phone.includes('-')) {
        phone = phone.replaceAll('-', '');
        meta.setFieldValue('phone', phone);
      }
      f7.dialog.preloader('잠시만 기다려주세요...');

      try {
        const { success } = (await getSmsAuth({ phone })).data;
        if (success) {
          setSended(true);
          ts.setToastText('인증번호가 발송되었습니다.').openToast();
          f7.dialog.close();
          $codeInput.current.focus();
          calcLeftTime();
        } else ts.setToastText('인증번호 발송이 불가능한 번호입니다').openToast();
        f7.dialog.close();
      } catch (err) {
        window.err = err;
        ts.setToastText(`${err.response.status} ${err.response.statusText}`).openToast();
        f7.dialog.close();
      }
    }
  };

  const onClickCert = async () => {
    const ts = toast.get();
    if (code === '') {
      ts.setToastText('인증번호를 입력해주세요').openToast();
    } else {
      f7.dialog.preloader('잠시만 기다려주세요...');

      try {
        const { success, message } = (
          await getSmsAuth({
            phone: field.value,
            code,
          })
        ).data;
        if (success) {
          clearInterval(timeLeftInterval.current);
          setCertComplete(true);
          if (props.setCertComplete) props.setCertComplete(true);
        } else {
          $codeInput.current.focus();
        }
        ts.setToastText(message).openToast();
        f7.dialog.close();
      } catch (err) {
        if (err.response) ts.setToastText(`${err.response.status} ${err.response.statusText}`).openToast();
        f7.dialog.close();
      }
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      onClickCert();
    }
  }, [code]);

  return (
    <div>
      <List noHairlinesMd>
        <div className="p-3 font-semibold">휴대폰 인증</div>
        <ul>
          <Row>
            <Col width="70">
              <ListInput
                outline
                floatingLabel
                label={i18next.t('login.phone')}
                ref={() => ($phoneInput.current = f7.$el.find('input[name=phone]'))}
                type="text"
                name="phone"
                placeholder={i18next.t('login.phone')}
                onChange={field.onChange}
                value={field.value}
                readonly={certComplete}
                errorMessageForce
                errorMessage={meta.touched.phone && meta.errors.phone}
              />
            </Col>
            <Col width="30" className="p-3">
              <button
                onClick={onClickSendPhoneCert}
                type="button"
                id="cert-button"
                className="button button-outline button-large text-xs disabled:opacity-50"
                disabled={certComplete}
              >
                {sended ? '재전송' : '인증번호전송'}
              </button>
            </Col>
          </Row>
          {sended && (
            <>
              <ListInput
                outline
                floatingLabel
                label="인증번호"
                ref={() => ($codeInput.current = f7.$el.find('input[name=code]'))}
                type="text"
                name="code"
                placeholder="인증번호"
                onChange={onChangeCode}
                value={code}
                readonly={certComplete}
              />
              <p className="text-right pr-4 pb-2">
                {certComplete ? (
                  '인증되었습니다'
                ) : (
                  <>
                    남은시간: <span className="font-semibold">{timeLeft}</span>
                  </>
                )}
              </p>
            </>
          )}
        </ul>
      </List>
    </div>
  );
};

export default PhoneCertiication;
