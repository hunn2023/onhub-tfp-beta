import React from 'react';
import { Grid, Card } from "@shopify/polaris";
import styles from "../apphomePage.module.css";
import {useNavigate} from "react-router";

const MiddleCompartmentOnHub: React.FC = () => {

  const navigate = useNavigate();
    const handleNavigate = (checkLogin: boolean) => {
    if (checkLogin) {
      navigate('/app/configurationList');
    } else {
      navigate('/app/dashboard');
    }
  };
  return (
    <div className={styles.middleCompartment}>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
          <Card>
            <div className={styles.contentHnhubImg}>
              <div>
                <img
                  alt=""
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  src="~/../public/images/img_Dashboard.png"
                />
              </div>
              <div className={styles.contentOnhubHalf}>
                <div>
                  <p className={styles.headerTitleText}>Dashboard</p>
                </div>
                <div className={styles.contentOnhubHalfDescription}>
                  <span>Short description......</span>
                </div>
                <div>
                  <button className={`${styles.btnSuccessHomeSignIn} ${styles.btnSuccessHomeSignIn}`}  onClick={()=>handleNavigate(false)}>
                    Use now
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
          <Card>
            <div className={styles.contentHnhubImg}>
              <div>
                <img
                  alt=""
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  src="~/../public/images/img_ConfigurationList.png"
                />
              </div>
              <div className={styles.contentOnhubHalf}>
                <div>
                  <p className={styles.headerTitleText}>TFP Configuration</p>
                </div>
                <div className={styles.contentOnhubHalfDescription}>
                  <span>Short description......</span>
                </div>
                <div>
                  <button className={`${styles.btnSuccessHomeSignIn} ${styles.btnSuccessHomeSignIn}`} type="button" onClick={()=>handleNavigate(true)}>
                    Use now
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </Grid.Cell>
      </Grid>
    </div>
  );
};

export default MiddleCompartmentOnHub;
