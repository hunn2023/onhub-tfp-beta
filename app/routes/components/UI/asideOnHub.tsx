/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from "../apphomePage.module.css";
import { Card } from "@shopify/polaris";

const AsideOnHub : React.FC = () => {
  return (
    <Card>
      <div className={styles.titleLeftOnhub}>
        <div className={styles.storyLeftCard}>
          <p className={styles.storyLeftDescription}>
          Thank you for your trust to use our product. We hope you enjoy your experience with OnHub!
          </p>
          <p className={styles.storyLeftDescription}>
            If you have any struggles while using OnHub, you can find suggested solutions or reach out to us for support in <a href='https://docs.novaonads.com/onhub/getting-started/about-platform' rel="noreferrer" target="_blank" className={styles.storyHref}> Help Center <img src="images/open_in_new.svg" alt="External Link Icon" className={styles.iconHref} /></a>
          </p>
        </div>
        <div className={styles.storyLeftCard}>
            <p className={styles.storyLeftDescription}>
            Is your Tiktok advertising account not performing as expected? Are you having trouble with scaling up Tikok advertising budget? </p>
            <p className={styles.storyLeftDescription}>
            Tiktok Agency Account will be the perfect solution for   
            </p>
            <a href='https://s.novaonads.com/tiktok-agency-account' rel="noreferrer" target="_blank" className={styles.storyHref}> Discover more about our product <img src="images/open_in_new.svg" alt="External Link Icon" className={styles.iconHref} /></a>  
        </div>
        <div className={styles.storyLeftCard}>
          <p className={styles.storyLeftDescription}>
          With over 100,000 satisfied customers, we’ve helped generate hundreds of millions of dollars in revenue through optimizing Tikok advertising campaign, resulting in more than 900 million clicks and over 60 million conversions.  
          </p>
          <a href='https://www.novaonads.com/our-products/tiktok-advertising/' rel="noreferrer" target="_blank" className={styles.storyHref}> Discover more about our service <img src="images/open_in_new.svg" alt="External Link Icon" className={styles.iconHref} /></a>
        </div>
        <div className={styles.storyLeftCard}>
          <p className={styles.storyLeftDescription}>
              <a href='https://www.novaonads.com/' rel="noreferrer" target="_blank" className={styles.storyHref}> Discover more about our work <img src="images/open_in_new.svg" alt="External Link Icon" className={styles.iconHref} /> </a>     
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AsideOnHub;
