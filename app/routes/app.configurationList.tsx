/* eslint-disable jsx-a11y/iframe-has-title */
import React, {useEffect, useState} from "react";
import ConfigOnHub from "~/routes/rootOnHubs/configOnhub";
import type {User} from "./Core/services/userServices";
import styles from "./components/apphomePage.module.css";
import {useNavigate} from "@remix-run/react";
import Constants from "./Core/Helpers/constants";
import {MessageParentName} from "~/routes/_index/messageParentName";
import TitleOnHub from "~/routes/components/UI/titleOnhub";

export default function ConfigurationList() {
  const baseUrlFe = ConfigOnHub.HOST_MODULAR_FE;
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleEvent = (event: any) => {
    MessageParentName(event, navigate);
  };

  useEffect(() => {
    const userData = localStorage.getItem('userDataKey');
    const shopInfo = localStorage.getItem("ShopInfo") ?? "";
    const parsedDataUser = userData ? JSON.parse(userData) as User : null;
    const parsedShopInfo = userData ? JSON.parse(shopInfo) : null;
    setUrl(`${baseUrlFe}/configuration/fraud/configurationList?UserId=${parsedDataUser?.id ?? ""}&shopifyStoreId=${parsedShopInfo?.shop?.id ?? ""}`)
    if (parsedDataUser?.id) {
      RenderScripts();
    }
    window.addEventListener('message', handleEvent);
    return () => {
      window.removeEventListener('message', handleEvent);
    };
  }, []);

  const RenderScripts = () => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `window.$crisp=[];window.CRISP_WEBSITE_ID="23c2ece7-f74a-49f9-abf6-02ee23173b99";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
    document.body.appendChild(s);

    var script = document.createElement('script');
    script.id = 'autoAdsMaxLead-widget-script';
    script.src = 'https://cdn-onmar.novaontech.com/scripts/autoads-maxlead-widget.js?business_id=E0299742DB6340B2BE6AB178E25D352D';
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.async = true;
    document.body.appendChild(script);
  }

  return (
    <>
      <TitleOnHub
        welcomeText={Constants.PREVENTION_CONFIGURATION}
        helpCenterLink={Constants.DEFAULT_HELPER_LINK}
      />
      <iframe title="" src={url} className={styles.screenIframe}/>
    </>
  )
}
