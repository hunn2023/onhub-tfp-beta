import Constants from "~/routes/Core/Helpers/constants";
import styles from "~/routes/components/apphomePage.module.css";
import React, {useEffect, useState} from "react";
import ConfigOnHub from "~/routes/rootOnHubs/configOnhub";
import {useLocation, useNavigate} from "@remix-run/react";
import {User} from "~/routes/Core/services/userServices";
import {MessageParentName} from "~/routes/_index/messageParentName";
import TitleOnHub from "./components/UI/titleOnhub";


export default function Setting() {
  const [url, setUrl] = useState('');
  const [showContent, setShowContent] = useState(true)
  const baseUrlFe = ConfigOnHub.HOST_MODULAR_FE;
  const location = useLocation();
  const navigate = useNavigate();

  const handleEvent = (event: any) => {
    MessageParentName(event, navigate);
  };

  useEffect(() => {
    const redirectTo = location?.state?.redirectTo ?? "";
    const shopInfo = localStorage.getItem('ShopInfo');
    const userData = localStorage.getItem('userDataKey');
    const parsedDataUser = userData ? JSON.parse(userData) as User : null;
    const parsedNameStore = shopInfo ? JSON.parse(shopInfo) : null;
    const encodedNameStore = encodeURIComponent(parsedNameStore?.shop?.name ?? "");
    const shopifyStoreId = parsedNameStore?.shop?.id ?? "";

    if (redirectTo == "ConfigurationFraudPrevention"){
      setShowContent(true)
      setUrl(`${baseUrlFe}/configuration/fraud/prevention?user_id=${parsedDataUser?.id ?? ""}&shopifyStoreId=${shopifyStoreId}&nameStore=${encodedNameStore}`)
    }else if(redirectTo == "SettingFraudPrevention"){
      setShowContent(false)
      setUrl(location.state.userSettingFraudPrevention + `&shopifyStoreId=${shopifyStoreId ?? ""}&nameStore=${encodedNameStore}`)
    }else{
      navigate('/app');
    }


    window.addEventListener('message', handleEvent);
    return () => {
      window.removeEventListener('message', handleEvent);
    };
  }, []);

  return (
    <>
      <>
        <TitleOnHub
          welcomeText={showContent ? Constants.PREVENTION_CONFIGURATION : Constants.FRAUD_PREVENTION_SETTING }
          helpCenterLink={Constants.DEFAULT_HELPER_LINK}
        />
        <iframe src={url} className={styles.screenIframe}/>
      </>
    </>
  )
}
