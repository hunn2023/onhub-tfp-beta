import type { ReactElement } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal, TextField } from "@shopify/polaris";
import styles from "../apphomePage.module.css";
import configOnHub from "../../rootOnHubs/configOnhub";
import SuccessMessageOnHub from '../UI/successMessageOnHub';

interface ForgetPasswordModalProps {
  activator: ReactElement;
  active: boolean;
  handleChange: () => void;
  showToast: (message: string) => void;
}
const ForgetPasswordModal: React.FC<ForgetPasswordModalProps> = (props) => {
  useEffect(() => {
    return () => {
      setCheckEmail('')
      setEmail('')
      setCheckSucces(false)
    };
  }, [props.active]);
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState('');
  const [checkSucces, setCheckSucces] = useState(false);
  const newPassword = '';
  const confirmPassword = '';

  const handleSubmit = useCallback(async () => {
    
    let isValid = true;
    setCheckEmail(email ? '' : 'Email information cannot be left blank, please enter it again.');
    if (!email) {
      isValid = false
    }
    if (isValid) {
      try {
        const response = await fetch(configOnHub.HOST_ONHUB_BE + '/identity/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: email,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          }),
        });
        if (response.ok) {
          setCheckSucces(true);
        }
        else {
          props.showToast("Forgot password failed.");
        }
      } catch (error) {
        props.showToast("Something went wrong, please try again!");
      }
      isValid = true;
    }
  }, [email, props]);

  const validateField = (text: string) => {
    setEmail(text);
    if (!text) {
      setCheckEmail('Email information cannot be left blank, please enter it again.');
    } else {
      if (!emailPattern.test(text)) {
        setCheckEmail('Invalid email address, please try again!');
      } else {
        setCheckEmail('');
      }
    }
  };
  const handleCloseEventEmail = () => {
    setCheckSucces(false)
    props.handleChange();
  }
  return (
    <Modal activator={props.activator} open={props.active} onClose={props.handleChange} title={undefined}>
      <div className={styles.forGetPassWordMargin}>
        <Modal.Section>
          <div className={styles.textModalTitles}>Forget password</div>
          <div>
            {
              checkSucces ? (
                <SuccessMessageOnHub handleClose={handleCloseEventEmail} buttonText="Sign In with new password" />
              ) : (
                <div>
                  <div className={styles.bodyFlexCenter}>
                    <img src="images/icon-Main.svg" alt={"logo"} />
                  </div>
                  <TextField
                    value={email}
                    onChange={text => validateField(text)}
                    label="Email"
                    type="text"
                    error={checkEmail}
                    autoComplete='off'
                    placeholder='Email'
                  />
                  <div className={styles.btnFlexEnd}>
                    <button onClick={handleSubmit} type='button' className={`${styles.btnSuccessHomeSignIn}`}>Forget password</button>
                  </div>
                </div>
              )
            }
          </div>
        </Modal.Section>
      </div>
    </Modal>
  );
};

export default ForgetPasswordModal;
