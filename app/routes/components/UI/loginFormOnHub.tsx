import React, { useState } from 'react';
import { Form, FormLayout, TextField } from "@shopify/polaris";
import styles from "../apphomePage.module.css";
import ForgetPasswordModal from '../modals/ForgetPasswordModal';
import SignUpModal from '../modals/SignUpModal';

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleForgetPassword: () => void;
  handleSignUp: () => void;
  showForgetPassWord: boolean;
  signUpNow: boolean;
  initShopifyStoreId: string;
  initWebsiteUrl: string;
  initNameStore : string;
  showToast: (message: string) => void;
}
const LoginFormOnHub: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  handleForgetPassword,
  handleSignUp,
  showForgetPassWord,
  signUpNow,
  initShopifyStoreId,
  initWebsiteUrl,
  initNameStore,
  showToast
}) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [checkEmail, setCheckEmail] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const validateField = (text: string) => {
    setEmail(text);
    if (!text) {
      setCheckEmail('Email information cannot be left blank, please enter it again.');
    } else {
      if (!text.includes('@')) {
        setCheckEmail('Incorrect email address, please try again!');
      } else if (!emailPattern.test(text)) {
        setCheckEmail('Invalid email address, please try again!');
      } else {
        setCheckEmail('');
      }
    }
  };
const validatePassword = (password: string) => {
    setPassword(password);
    if (!password) {
      setCheckPassword('Password information cannot be left blank, please enter it again.');
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.contentLayoutForm}>
        <FormLayout>
          <TextField
            value={email}
            onChange={(value) => validateField(value)}
            label="Email"
            type="email"
            autoComplete='off'
            placeholder='Email'
            error={checkEmail}
          />
          <TextField
            value={password}
            onChange={(value) => validatePassword(value)}
            label="Password"
            type="password"
            autoComplete="off"
            placeholder='Password'
            error={checkPassword}
          />
        </FormLayout>
      </div>
      <div className={styles.pupupForgetPassword}>
        <ForgetPasswordModal
          activator={
            <button
              className={styles.btnSuccessHome}
              onClick={handleForgetPassword}
              type="button"
            >
              Forget your password?
            </button>
          }
          active={showForgetPassWord}
          handleChange={handleForgetPassword}
          showToast={showToast}
        />
      </div>
      <div className={styles.footerBtnSign}>
        <div className={styles.footerBtnSignAcount}>
          <p className={styles.footerBtnSignAcountText}>Don't have an account?</p>
          <SignUpModal
            activator={
              <button
                className={styles.btnSuccessHome}
                onClick={handleSignUp}
                type="button"
              >
                Sign Up Now
              </button>
            }
            active={signUpNow}
            handleChange={handleSignUp}
            initShopifyStoreId={initShopifyStoreId}
            initWebsiteUrl={initWebsiteUrl}
            initNameStore = {initNameStore}
            showToast={showToast}
          />
        </div>
        <div>
          <button
            className={`${styles.btnSuccessHomeSignIn} ${styles.btnSuccessHomeSignIn}`}
            type="submit"
          >
            Sign in
          </button>
        </div>
      </div>
    </Form>
  );
};

export default LoginFormOnHub;
