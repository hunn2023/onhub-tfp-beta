import { Checkbox, Form, FormLayout, Modal, TextField } from '@shopify/polaris';
import type { ReactElement } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import styles from "../apphomePage.module.css";
import configOnHub from "../../rootOnHubs/configOnhub";
import SuccessMessageOnHub from '../UI/successMessageOnHub';
interface SignUpModalProps {
  activator: ReactElement;
  active: boolean;
  handleChange: () => void;
  initShopifyStoreId: string;
  initWebsiteUrl: string;
  initNameStore : string;
  showToast: (message: string) => void;
}

const SignUpModal: React.FC<SignUpModalProps> = (props) => {
  // Regular Expressions
  const phonePattern = /^\+?[0-9]{10,15}$/;
  const fullNamePattern = /^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const roleUser = 'Business'; 
  const { initShopifyStoreId, initWebsiteUrl, initNameStore } = props;

  useEffect(() => {
    setShowActive(props.active);
  
    return () => {   
      setEmail('');
      setFullName('');
      setPhoneNumber('');
      setPasswordSignUp('');
      setConfirmPassword('');

      setCheckEmail('');
      setCheckFullName('');
      setCheckPhone('');
      setCheckPassword('');
      setConfirmPassword('');
      setCheckConfirmPassword('');
    };
  }, [props.active]);

  const [showActive, setShowActive] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPasswordSignUp] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkEmail, setCheckEmail] = useState('');
  const [checkFullName, setCheckFullName] = useState('');
  const [checkPhone, setCheckPhone] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [checkConfirmPassword, setCheckConfirmPassword] = useState('');
  const [isSignSuccess, setIsSignSuccess] = useState(false);

  const handleSubmitSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    let isValid = true;
    setCheckEmail(email ? '' : 'Email information cannot be left blank, please enter it again.');
    setCheckPhone(phoneNumber ? '' : 'Phone number cannot be left blank, please enter it again.');
    setCheckFullName(fullName ? '' : 'Full-name information cannot be left blank, please enter it again.');
    setCheckPassword(password ? '' : 'Password information cannot be left blank, please enter it again.');
    setCheckConfirmPassword(confirmPassword ? '' : 'Confirm Password information cannot be left blank, please enter it again.');
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      isValid = false
    }
    if (!initShopifyStoreId || !initWebsiteUrl) {
        isValid = false;
        props.showToast("Shopify Store ID and Website URL cannot be null or undefined.");
    }
    if (isValid) {
      try {
        if(!newsletter){
          props.showToast("You need to accept...");
          return;
        }
        const response = await fetch(configOnHub.HOST_ONHUB_BE + '/identity/api/auth/sign-up', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              fullName: fullName,
              password: password,
              confirmPassword: confirmPassword,
              role : roleUser,
              signature: '', 
              shopifyStoreId: initShopifyStoreId, 
              websiteUrl: initWebsiteUrl,
              nameStore : initNameStore
            }
          ),
            
        });
        if (response.ok) {
          setEmail('');
          setFullName('');
          setPhoneNumber('');
          setPasswordSignUp('');
          setConfirmPassword('');

          setCheckEmail('');
          setCheckFullName('');
          setCheckPhone('');
          setCheckPassword('');
          setConfirmPassword('');
          setCheckConfirmPassword('');
          // Show modal message success
          setIsSignSuccess(true);
         
        }
        else {
          const responseData = await response.json();
          props.showToast(responseData.message.toString());
        }

      } catch (error) {
        props.showToast("An error occurred during from Server.");
      }
    }
    else {
      props.showToast("IsValid form null !");
    }
  };

  const handleNewsLetterChange = useCallback(
    (value: boolean) => setNewsletter(value),
    [],
  );
  const validateField = (text: string, name: string) => {
    switch (name) {
      case 'fullName':
        setFullName(text);
        if (!text) {
          setCheckFullName('Full-name information cannot be left blank, please enter it again.');
        } else if (text.length < 5 || text.length > 50) {
          setCheckFullName('The Full-name length should be between 5-50 characters, please try again!');
        } else if (!fullNamePattern.test(text)) {
          setCheckFullName('Full-name must be text or number, please try again!');
        } else {
          setCheckFullName('');
        }
        break;
      case 'phoneNumber':
        setPhoneNumber(text);
        if (!text) {
          setCheckPhone('Phone number cannot be left blank, please enter it again.');
        } else if (!phonePattern.test(text)) {
          if (text.replace('+', '').length < 10 || text.replace('+', '').length > 15) {
            setCheckPhone('Invalid phone number (must be between 10 and 15 characters), please try again.');
          } else {
            setCheckPhone('Invalid phone number (must not contain special characters), please try again.');
          }
        } else {
          setCheckPhone('');
        }
        break;

      case 'email':
        setEmail(text);
        if (!text) {
          setCheckEmail('Email information cannot be left blank, please enter it again.1');
        } else {
          if (!emailPattern.test(text)) {
            setCheckEmail('Invalid email address, please try again!');
          } else {
            setCheckEmail('');
          }
        }
        break;

      case 'password':
        setPasswordSignUp(text);
        if (!text) {
          setCheckPassword('Password information cannot be left blank, please enter it again.');
        } else if (text.length < 5 || text.length > 50) {
          setCheckPassword('The password length should be between 5-50 characters, please try again!');
        }
        else {
          setCheckPassword('');
        }
        break;
      case 'confirmPassword':
        setConfirmPassword(text);
        if (!text) {
          setCheckConfirmPassword('Confirm Password information cannot be left blank, please enter it again.');
        } else if (text != password) {
          setCheckConfirmPassword('Password is inconsistent!');
        } else {
          setCheckConfirmPassword('');
        }
        break;

      default:
        break;
    }
  };
  const handleCloseEventEmail = () => {
    setIsSignSuccess(false);
    props.handleChange();
  }
  return (
    <Modal
      activator={props.activator}
      open={showActive}
      onClose={props.handleChange}
      title={undefined}    >

      <div className={styles.modalSignUpMarggin}>
        <Modal.Section>
          {
            isSignSuccess ? (
              <SuccessMessageOnHub handleClose={handleCloseEventEmail} buttonText="Sign In Now" />
            ) : (
              <div>
                <div className={styles.textModalTitles}>Sign Up OnHub Account </div>
                <Form onSubmit={handleSubmitSignUp}>
                  <FormLayout>
                    <div className={styles.bodyFlexCenter}>
                      <img src="../../public/images/icon-Main.svg" alt={"logo"} />
                    </div>
                    <TextField
                      maxHeight={100}
                      value={fullName}
                      onChange={text => validateField(text, 'fullName')}
                      label="Full-name"
                      type="text"
                      error={checkFullName}
                      autoComplete=''
                    />
                    <TextField
                      value={phoneNumber}
                      onChange={text => validateField(text, 'phoneNumber')}
                      label="Phone number"
                      type="text"
                      error={checkPhone}
                      autoComplete=''
                    />
                    <TextField
                      value={email}
                      onChange={text => validateField(text, 'email')}
                      label="Email"
                      type="text"
                      error={checkEmail}
                      autoComplete=''
                    />
                    <TextField
                      value={password}
                      onChange={text => validateField(text, 'password')}
                      label="Password"
                      type="password"
                      error={checkPassword}
                      autoComplete=''
                    />
                    <TextField
                      value={confirmPassword}
                      onChange={text => validateField(text, 'confirmPassword')}
                      label="Confirm Password"
                      type="password"
                      error={checkConfirmPassword}
                      autoComplete=''
                    />
                    <div className={styles.bodyFlexFooter}>
                      <Checkbox
                        checked={newsletter}
                        onChange={handleNewsLetterChange}
                        label={""}
                      />
                      <div>
                        I have read and accepted
                      </div>
                      <div className={styles.textAccepted}>
                        <a className={styles.textTheTermsLink}
                          href="https://docs.novaonads.com/onhub/policy-and-terms-of-service" target="_blank"
                          rel="noopener noreferrer">
                          The terms of service
                        </a>
                      </div>
                    </div>
                    <div className={styles.btnFlexEnd}>
                      <button type='button' onClick={handleSubmitSignUp} className={`${styles.btnSuccessHomeSignIn}`}>Sign Up</button>
                    </div>
                  </FormLayout>
                </Form>
              </div>
            )
          }
        </Modal.Section>
      </div>
    </Modal>
  );
};

export default SignUpModal;
