import React, { FormEvent, useEffect } from 'react';
import { Card } from '@app/components/card';
import { ErrorMessage, FormGroup, Input, Label } from '@app/components/form';
import { useForm } from '@app/hooks';
import './login-page.scss';
import { useDispatch, useSelector } from 'react-redux';
import { initPageActionCreator, loginActionCreator, resetPageStateActionCreator } from './actions';
import { AppState } from '@app/store';
import { RouteURL, useNavigation } from '@modules/router';

interface LoginForm {
  account: string;
  password: string;
}

export type LoginPageProps = {};

/** A hook to redirect to HomePage when user is logged. */
const useRedirectHomePage = () => {
  const isLogged = useSelector((state: AppState) => state.pages.login.isLogged);
  const navigation = useNavigation();

  useEffect(() => {
    if (isLogged) {
      navigation.replace(RouteURL.CRYPTO_PERSONAL_INFO);
    }
  }, [isLogged]);
};

export const LoginPage: React.FC<LoginPageProps> = () => {
  const dispatch = useDispatch();

  const { formData, updateFormData, validator, validateAll } = useForm<LoginForm>({
    /** 帳號 */
    account: {
      initialValue: '',
      validate: ({ value }) => (!value ? { required: '請輸入帳號' } : {}),
    },
    /** 密碼 */
    password: {
      initialValue: '',
      validate: ({ value }) => (!value ? { required: '請輸入密碼' } : {}),
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 檢核所有欄位
    const { isValid } = validateAll();

    if (isValid) {
      dispatch(loginActionCreator(formData.account, formData.password));
    }
  };

  useRedirectHomePage();

  useEffect(() => {
    // ComponentDidMount
    dispatch(initPageActionCreator());

    // ComponentWillUnmount
    return () => {
      dispatch(resetPageStateActionCreator());
    };
  }, [dispatch]);

  return (
    <div className="nrg-login-page-container">
      <form className="nrg-login-page-form" onSubmit={handleSubmit}>
        <Card>
          <Card.Header className="nrg-login-page-card-header">
            <h1>資金清查系統</h1>
          </Card.Header>
          <Card.Body className="nrg-login-page-card-body">
            <FormGroup>
              <Label>帳號</Label>
              <Input type="text" value={formData.account} onChange={(e) => updateFormData({ account: e.target.value })} />
              {validator.account.errors.required && <ErrorMessage>{validator.account.errors.required}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <Label>密碼</Label>
              <Input type="password" value={formData.password} onChange={(e) => updateFormData({ password: e.target.value })} />
              {validator.password.errors.required && <ErrorMessage>{validator.password.errors.required}</ErrorMessage>}
            </FormGroup>
          </Card.Body>
          <Card.Footer className="nrg-login-page-card-footer">
            <button type="submit" className="btn btn-primary btn-width-xlg">
              登入
            </button>
          </Card.Footer>
        </Card>
      </form>
    </div>
  );
};
