import React from 'react';
import styles from "../apphomePage.module.css";

interface SuccessMessageProps {
  handleClose: () => void;
  buttonText: string;
}

const SuccessMessageOnHub: React.FC<SuccessMessageProps> = ({ handleClose, buttonText }) => {
  return (
    <div>
      <div className={styles.bodyFlexCenter}>
        <img src="images/icon-Main.svg" alt={"logo"} />
      </div>
      <div className={styles.formModalEmailOnhub}>
        <span>Please check your email inbox (including spam/junk folder)</span>
        <span>and click on the link provided in the email</span>
        <span>and reset your password!</span>
        <img className={styles.imgFormOnHub} src="../../public/images/imgEmail.svg" alt={"logo"} />
      </div>
      <div className={styles.bodyFlexCenter}>
        <button type='button' onClick={handleClose} className={`${styles.btnSuccessHomeSignIn}`}>{buttonText}</button>
      </div>
    </div>
  );
};

export default SuccessMessageOnHub;
