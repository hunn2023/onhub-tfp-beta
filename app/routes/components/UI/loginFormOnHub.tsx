import React, { useState } from 'react';
import { Form, FormLayout, TextField } from "@shopify/polaris";
import styles from "../apphomePage.module.css";
import ForgetPasswordModal from '../modals/ForgetPasswordModal';
import SignUpModal from '../modals/SignUpModal';
import { decodeToken } from "../../Core/services/userServices";
import type { User } from '../../Core/services/userServices';
import configOnHub from "../../rootOnHubs/configOnhub";

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleForgetPassword: () => void;
  handleSignUp: () => void;
  showForgetPassWord: boolean;
  signUpNow: boolean;
  shopifyStoreId: string;
  websiteUrl: string;
  nameStore : string;
  showToast: (message: string) => void;
  setUserData: (userData: User | null) => void;
  myshopifyDomain : string;
}
const LoginFormOnHub: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleForgetPassword,
  handleSignUp,
  showForgetPassWord,
  signUpNow,
  shopifyStoreId,
  websiteUrl,
  nameStore,
  showToast,
  setUserData,
  myshopifyDomain,
}) => {
  const emailPattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
  const validateFieldPassWord = (text: string) => {
    setPassword(text);
    if(text == null || text == '' || text == undefined){
      setCheckPassword('Password information cannot be left blank, please enter it again');
    }
    else if(text.length < 5 || text.length > 50) {
      setCheckPassword('The password length should be between 5-50 characters, please try again!');
    }
    else{
      setCheckPassword('')
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    localStorage.removeItem('accessTokenKey');
    localStorage.removeItem('userDataKey');
    setCheckEmail('');
    setCheckPassword('');
    if (!email && !password) {
      setCheckEmail('Email information cannot be left blank, please enter it again.');
      setCheckPassword('Password information cannot be left blank, please enter it again.');
      return;
    }

    if (!email) {
      setCheckEmail('Email information cannot be left blank, please enter it again.');
      return;
    }

    if (!password) {
      setCheckPassword('Password information cannot be left blank, please enter it again.');
      return;
    }
    try {
      const response = await fetch(configOnHub.HOST_ONHUB_BE + '/identity/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: email,
          password: password,
          shopifyStoreId: shopifyStoreId,
          websiteUrl : websiteUrl,
          nameStore : nameStore
        }),
      });
      const data = await response.json();
      if (response.ok) {

        const domainWebShopifyResult = await fetch(configOnHub.HOST_MODULAR_BE + '/modular/api/setting/save-website-shopify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            shopifyStoreId: shopifyStoreId,
            domainWebShopify: myshopifyDomain
          }),
        });
        const dataShopifyResult = await domainWebShopifyResult.json();
        if (domainWebShopifyResult.ok) {
           console.log(dataShopifyResult);
        }
        const accessToken = data.data;
        const userInfos = decodeToken(accessToken);
        setUserData(userInfos);
        window.location.reload();
      } else {
        showToast(data.message);
      }
    } catch (error) {
      showToast('Something went wrong, please try again!')
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
            type="text"
            autoComplete='on'
            placeholder='Email'
            error={checkEmail}
          />
          <TextField
            value={password}
            onChange={(value) => validateFieldPassWord(value)}
            label="Password"
            type="password"
            autoComplete="on"
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
            shopifyStoreId={shopifyStoreId}
            websiteUrl={websiteUrl}
            nameStore = {nameStore}
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
