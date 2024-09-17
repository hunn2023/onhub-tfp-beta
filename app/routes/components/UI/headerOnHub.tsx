import React from 'react';
import styles from "../apphomePage.module.css";

interface HeaderProps {
  title: string;
  description: string;
}

const HeaderOnHub: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <div>
      <h1 className={styles.headerTitleText}>{title}</h1>
      <p className={styles.headerTitleDecscription}>{description}</p>
    </div>
  );
};

export default HeaderOnHub;