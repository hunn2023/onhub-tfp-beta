/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from "../apphomePage.module.css";
import { Card } from "@shopify/polaris";

const AsideOnHub : React.FC = () => {
  return (
    <Card>
      <div className={styles.titleLeftOnhub}>
        <h3 className={styles.titleLeftOnhub}>Success Stories</h3>
        <div className={styles.storyLeftCard}>
          <p className={styles.storyLeftDescription}>
            Refy Beauty reached 2M+ users on TikTok with an engagement rate of 2%.
            Overall, they experienced a 750% increase in organic revenue.
          </p>
          <p className={styles.hashtagsLeft}>#Beauty #2M+ Reach</p>
          <a href="" className={styles.readMoreLeft}>Read story</a>
        </div>
        <div className={styles.storyLeftCard}>
          <p className={styles.storyLeftDescription}>
            Refy Beauty reached 2M+ users on TikTok with an engagement rate of 2%.
            Overall, they experienced a 750% increase in organic revenue.
          </p>
          <p className={styles.hashtagsLeft}>#Beauty #2M+ Reach</p>
          <a href="" className={styles.readMoreLeft}>Read story</a>
        </div>
      </div>
    </Card>
  );
};

export default AsideOnHub;
