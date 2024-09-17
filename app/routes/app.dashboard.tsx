import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import ConfigOnHub from "~/routes/rootOnHubs/configOnhub";
import type {User} from "./Core/services/userServices";
import styles from "./components/apphomePage.module.css";

export default function Dashboard() {
  const baseUrlFe = ConfigOnHub.HOST_MODULAR_FE;
  const [url, setUrl] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem('userDataKey');
    const parsedDataUser = userData ? JSON.parse(userData) as User : null;

    setUrl(changeHandlerUrl(parsedDataUser?.id ?? "", parsedDataUser?.shopifyStoreId ?? "", false));

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const changeHandlerUrl = (userId: string, shopifyStoreId: string, showUrlConfigurationList: boolean) => {
    if (showUrlConfigurationList) {
       const shopInfo = localStorage.getItem('ShopInfo');
       const parsedStoreName = shopInfo ? JSON.parse(shopInfo) : null;
       
      return `${baseUrlFe}/configuration/fraud/prevention?user_id=${userId}&shopifyStoreId=${shopifyStoreId}&storeName=${parsedStoreName?.name ?? ""}`;
    }
    return `${baseUrlFe}/dashboard?UserId=${userId}&shopifyStoreId=${shopifyStoreId}`;
  };

  const handleNavigate = (checkLogin: boolean) => {
    if (checkLogin) {
      navigate('/app/configurationList');
    } else {
      navigate('/app');
    }
  };
  
  const handleMessage = (event: MessageEvent) => {
    if (event.origin.includes(baseUrlFe)) {
      try {
        const dataConvert = JSON.parse(event.data);
        const userData = localStorage.getItem('userDataKey');
        const parsedDataUser = userData ? JSON.parse(userData) as User : null;
        if (dataConvert.messageName === 'REDIRECT_TO') {
          if (dataConvert.data.url === '/feature?c=Configuration&v=FraudPrevention') {
            setUrl(changeHandlerUrl(parsedDataUser?.id ?? "", parsedDataUser?.shopifyStoreId ?? "", true));
          } else if (dataConvert.data.url === '/feature?c=Configuration&v=List') {
            handleNavigate(true);
          } else if (dataConvert.data.url === 'loginShopify') {
            handleNavigate(false);
          }
        }
      } catch (error) {
      }
    }
  };

  return (
    <>
      <iframe src={url} className={styles.screenIframe}/>
    </>
  );
}
