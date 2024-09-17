import React, { useCallback, useEffect, useState } from "react";
import { Page, Grid, Card, Frame, Toast } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import styles from "./apphomePage.module.css";
import type { User } from "../Core/services/userServices";
import { decodeToken } from "../Core/services/userServices";
import HeaderOnHub from "./UI/headerOnHub";
import UserInfoOnHub from "./UI/userInfoOnHub";
import SignUpModal from "./modals/SignUpModal";
import LoginFormOnHub from "./UI/loginFormOnHub";
import AsideOnHub from "./UI/asideOnHub";
import MiddleCompartmentOnHub from "./UI/middleCompartmentOnHub";
import configOnHub from "../rootOnHubs/configOnhub";

const Apphomepage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgetPassWord, setShowForgetPassWord] = useState(false);
  const [signUpNow, setSignUpNow] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [ShopifyStoreId, setShopifyStoreId] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  //const fetcher = useFetcher<typeof action>();
  useEffect(() => {
    let ShopInfo = localStorage.getItem("ShopInfo") ?? "";
    if (ShopInfo) {
      const shopData = JSON.parse(ShopInfo);
      localStorage.setItem("ShopifyStoreId", shopData?.shop?.id ?? "")
      localStorage.setItem("WebsiteUrl", shopData?.shop?.myshopifyDomain ?? "")

      setShopifyStoreId(localStorage.getItem("ShopifyStoreId") ?? "");
      setWebsiteUrl(localStorage.getItem("WebsiteUrl") ?? "")
    }
    let localChangeUser = localStorage.getItem('userDataKey');
    if (localChangeUser) {
      let parentLocalChangeUser = JSON.parse(localChangeUser) as User;
      let dataNow = new Date().getTime();
      let expPrefix = parentLocalChangeUser?.exp ?? dataNow;
      if (expPrefix < dataNow) {
        setUserData(parentLocalChangeUser);
        setEmail(parentLocalChangeUser.email);
        setLoginSuccess(true);
      }
    } else {
      setLoginSuccess(false);
    }
  }, []);

  const handleForgetPassword = () => {
    setShowForgetPassWord(!showForgetPassWord);
  }

  const handleSignUp = () => {
    setSignUpNow(!signUpNow);
  }
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await fetch(configOnHub.HOST_ONHUB_BE + '/identity/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: email,
          password: password,
          shopifyStoreId: ShopifyStoreId,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        //Update and save ShopifyStoreId and DomainWebShopify
        const shopifyStoreId = localStorage.getItem("ShopifyStoreId");
        const domainWebShopify = localStorage.getItem("WebsiteUrl");
        const domainWebShopifyResult = await fetch(configOnHub.HOST_MODULAR_BE + '/modular/api/setting/save-website-shopify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            shopifyStoreId: shopifyStoreId,
            domainWebShopify: domainWebShopify
          }),
        });
        const dataShopifyResult = await domainWebShopifyResult.json();
        if (domainWebShopifyResult.ok) {
           console.log(dataShopifyResult);
        }
        const accessToken = data.data;
        const userInfos = decodeToken(accessToken);
        setUserData(userInfos);
        setLoginSuccess(true);
      } else {
        showToast('Login failed, please check your information again.')
      }
    } catch (error) {
      showToast('An error occurred while connecting to the server.')
    }
  };

  const handleChangeAccount = () => {
    localStorage.clear();
    setEmail('');
    setPassword('');
    setLoginSuccess(false);
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
        <TitleBar title="Welcome to OnHub - Tiktok Fraud Prevention solution!" />
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
                            Up now</button>}
                          active={signUpNow}
                          handleChange={handleSignUp}
                          initShopifyStoreId={ShopifyStoreId}
                          initwebsiteUrl={websiteUrl}
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
                      handleSubmit={handleSubmit}
                      handleForgetPassword={handleForgetPassword}
                      handleSignUp={handleSignUp}
                      showForgetPassWord={showForgetPassWord}
                      signUpNow={signUpNow}
                      initShopifyStoreId={ShopifyStoreId}
                      initwebsiteUrl={websiteUrl}
                      showToast={showToast}
                    />
                  </React.Fragment>
                )}
              </div>
            </Card>
            <MiddleCompartmentOnHub />
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





