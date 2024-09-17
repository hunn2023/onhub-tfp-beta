import React from 'react';
import styles from "../apphomePage.module.css";
import type { User } from '~/routes/Core/services/userServices';

interface UserInfoProps {
  userData: User | null;
}

const UserInfoOnHub: React.FC<UserInfoProps> = ({ userData }) => {
  return (
    <div className={styles.userCardOnhub}>
      <div className={styles.avatarOnhub}></div>
      <div className={styles.userInfoOnhub}>
        <strong className={styles.userNameOnhub}>{userData?.fullname}</strong>
        <strong className={styles.userEmailOnhub}>{userData?.email}</strong>
      </div>
    </div>
  );
};

export default UserInfoOnHub;
