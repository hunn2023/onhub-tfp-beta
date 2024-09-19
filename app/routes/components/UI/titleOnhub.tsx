import React from 'react';
import styles from "../apphomePage.module.css";

interface TitleComponentProps {
  welcomeText: string;
  helpCenterLink: string;
}

const TitleOnHub: React.FC<TitleComponentProps> = ({ welcomeText, helpCenterLink }) => {
  return (
    <div className={styles.boxHeader}>
      <div className={styles.textWelcome}>
        {welcomeText}
      </div>
      <a 
        href={helpCenterLink} 
        rel="noreferrer" 
        target="_blank" 
        className={styles.helpCenter}
      >
        Help Center
      </a>
    </div>
  );
};

export default TitleOnHub;