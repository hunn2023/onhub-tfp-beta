/* eslint-disable jsx-a11y/iframe-has-title */
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import ConfigOnHub from "~/routes/rootOnHubs/configOnhub";
import type {User} from "./Core/services/userServices";
import styles from "./components/apphomePage.module.css";
// import TitleOnHub from "../routes/components/UI/titleOnHub";
import Constants from "../routes/Core/Helpers/constants";

export default function Dashboard() {
  const baseUrlFe = ConfigOnHub.HOST_MODULAR_FE;
  const [url, setUrl] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const shopifyStoreId = localStorage.getItem("ShopifyStoreId") ?? "";
    const userData = localStorage.getItem('userDataKey');
    const parsedDataUser = userData ? JSON.parse(userData) as User : null;
    if (parsedDataUser != null) {
      RenderScripts();
    }
    setUrl(changeHandlerUrl(parsedDataUser?.id ?? "", shopifyStoreId ?? "", false));
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const changeHandlerUrl = (userId: string, shopifyStoreId: string, showUrlConfigurationList: boolean) => {
    if (showUrlConfigurationList) {
      const shopInfo = localStorage.getItem('ShopInfo');
      const parsedNameStore = shopInfo ? JSON.parse(shopInfo) : null;
      const encodedNameStore = encodeURIComponent(parsedNameStore?.shop?.name ?? "");
      return `${baseUrlFe}/configuration/fraud/prevention?user_id=${userId}&shopifyStoreId=${shopifyStoreId}&nameStore=${encodedNameStore}`;
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

  const RenderScripts = () => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `(function(d, s, id, t) {
        if (d.getElementById(id)) return;
        var js, fjs = d.getElementsByTagName(s)[0];
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://widget.oncustomer.asia/js/index.js?lang=en&token=' + t;
        fjs.parentNode.insertBefore(js, fjs);}
      (document, 'script', 'oc-chat-widget-bootstrap', '32bab5cf62c5385d30d0e20422214aa5'));`
    document.body.appendChild(s);

    var script = document.createElement('script');
    script.id = 'autoAdsMaxLead-widget-script';
    script.src = 'https://cdn-onmar.novaontech.com/scripts/autoads-maxlead-widget.js?business_id=E0299742DB6340B2BE6AB178E25D352D';
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.async = true;
    document.body.appendChild(script);
  }
  const handleMessage = (event: MessageEvent) => {
    if (event.origin.includes(baseUrlFe)) {
      try {

        const dataConvert = JSON.parse(event.data);
        const userData = localStorage.getItem('userDataKey');
        const shopifyStoreId = localStorage.getItem("ShopifyStoreId") ?? "";
        const parsedDataUser = userData ? JSON.parse(userData) as User : null;

        if (dataConvert.messageName === 'REDIRECT_TO') {
          if (dataConvert.data.url === '/feature?c=Configuration&v=FraudPrevention') {
            setUrl(changeHandlerUrl(parsedDataUser?.id ?? "", shopifyStoreId ?? "", true));
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
      {/*<TitleOnHub*/}
      {/*  welcomeText={Constants.DEFAULT_WELCOMETEXT}*/}
      {/*  helpCenterLink={Constants.DEFAULT_HELPER_LINK}*/}
      {/*/>*/}
      <iframe src={url} className={styles.screenIframe}/>
    </>
  );
}
