import React, { useCallback, useEffect, useState } from "react";
import { Page, Grid, Card, Frame, Toast } from "@shopify/polaris";
import styles from "./apphomePage.module.css";
import type { User } from "../Core/services/userServices";
import HeaderOnHub from "./UI/headerOnHub";
import UserInfoOnHub from "./UI/userInfoOnHub";
import SignUpModal from "./modals/SignUpModal";
import LoginFormOnHub from "./UI/loginFormOnHub";
import AsideOnHub from "./UI/asideOnHub";
import MiddleCompartmentOnHub from "./UI/middleCompartmentOnHub";

const Apphomepage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgetPassWord, setShowForgetPassWord] = useState(false);
  const [signUpNow, setSignUpNow] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [shopifyStoreId, setShopifyStoreId] = useState('');
  const [url, setUrl] = useState('');
  const [nameStore, setNameStore] = useState('');
  const [myshopifyDomain, setMyshopifyDomain] = useState('');
  const [isUserDataAvailable, setIsUserDataAvailable] = useState(false);

  useEffect(() => {
    let shopInfo = localStorage.getItem("ShopInfo") ?? "";
    console.log("new shopInfo: " + shopInfo);
    let localChangeUser = localStorage.getItem('userDataKey');
    let shopData;
    if (shopInfo) {
      shopData = JSON.parse(shopInfo);
      const url = shopData.shop.url;
      const domain = shopData.shop.myshopifyDomain;
      const name = shopData.shop.name;
      setShopifyStoreId(shopData.shop.id ?? "");
      setUrl(url ?? "");
      setNameStore(name ?? "");
      setMyshopifyDomain(domain ?? "");
    }
    else{
      console.log('shopInfo undefined or null');
    }
    if (localChangeUser) {
      let parentLocalChangeUser = JSON.parse(localChangeUser) as User;
      let dataNow = new Date().getTime();
      let expPrefix = parentLocalChangeUser?.exp ?? dataNow;
      shopData = JSON.parse(shopInfo);
      if (expPrefix < dataNow) {
        setUserData(parentLocalChangeUser);
        setEmail(parentLocalChangeUser.email);
        setLoginSuccess(true);
        setIsUserDataAvailable(true);
      }
    } else {
      setLoginSuccess(false);
      setIsUserDataAvailable(false);
    }
  }, []);

  const handleForgetPassword = () => {
    setShowForgetPassWord(!showForgetPassWord);
  }

  const handleSignUp = () => {
    setSignUpNow(!signUpNow);
  }

  const handleChangeAccount = () => {
    localStorage.removeItem('accessTokenKey');
    localStorage.removeItem('userDataKey');
    localStorage.removeItem('ShopInfo')
    localStorage.clear();
    setEmail('');
    setPassword('');
    window.location.reload();
  };

  // Toast message
  const [toastMessage, setToastMessage] = useState('');
  const [toastActive, setToastActive] = useState(false);
  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastActive(true);
  }, []);

  const toastMarkup = toastActive ? (
    <Toast content={toastMessage} error onDismiss={() => setToastActive(false)} />
  ) : null;

  return (
    <Frame>
      <Page>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 8, xl: 8 }}>
            <Card>
              <div className={styles.bodyonhub}>
                {loginSuccess ? (
                  <React.Fragment>
                    <HeaderOnHub title="Connected OnHub Account successfully!"
                      description="Now you can use our TikTok Fraud Prevention solution!" />
                    <UserInfoOnHub userData={userData} />
                    <div className={styles.footerBtnSign}>
                      <div className={styles.footerBtnSignAcount}>
                        <p className={styles.footerBtnSignAcountText}>Don't have an account?</p>
                        <SignUpModal
                          activator={<button className={styles.btnSuccessHome} onClick={handleSignUp} type="button">Sign
                            Up Now</button>}
                          active={signUpNow}
                          handleChange={handleSignUp}
                          shopifyStoreId={shopifyStoreId}
                          websiteUrl={url}
                          nameStore ={nameStore}
                          showToast={showToast}
                        />
                      </div>
                      <div>
                        <button className={`${styles.btnSuccessHomeSignIn} ${styles.btnSuccessHomeSignIn}`}
                          onClick={handleChangeAccount} type="button">Change
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <HeaderOnHub title="Connect with your OnHub Account"
                      description="Connect with your OnHub Account to start using TikTok Fraud Prevention." />
                    <LoginFormOnHub
                      email={email}
                      password={password}
                      setEmail={setEmail}
                      setPassword={setPassword}
                      handleForgetPassword={handleForgetPassword}
                      handleSignUp={handleSignUp}
                      showForgetPassWord={showForgetPassWord}
                      signUpNow={signUpNow}
                      shopifyStoreId={shopifyStoreId}
                      websiteUrl={url}
                      nameStore={nameStore}
                      showToast={showToast}
                      setUserData={setUserData}
                      myshopifyDomain = {myshopifyDomain}
                    />
                  </React.Fragment>
                )}
              </div>
            </Card>
            <MiddleCompartmentOnHub isUserDataAvailable= {isUserDataAvailable} />
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}>
            <AsideOnHub />
          </Grid.Cell>
        </Grid>
        {toastMarkup}
      </Page>
    </Frame>
  );
};


export default React.memo(Apphomepage);





