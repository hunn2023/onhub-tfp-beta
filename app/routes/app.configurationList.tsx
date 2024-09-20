/* eslint-disable jsx-a11y/iframe-has-title */
import React, {  useEffect, useState } from "react";
import ConfigOnHub from "~/routes/rootOnHubs/configOnhub";
import type { User } from "./Core/services/userServices";
import styles from "./components/apphomePage.module.css";
import { useNavigate } from "@remix-run/react";
import Constants from "./Core/Helpers/constants";
// import TitleOnHub from "~/routes/components/UI/titleOnhub";

export default function ConfigurationList() {
  const baseUrlFe = ConfigOnHub.HOST_MODULAR_FE;
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userDataKey');
    const parsedDataUser = userData ? JSON.parse(userData) as User : null;
    const shopifyStoreId = localStorage.getItem("ShopifyStoreId") ?? "";

    setUrl(changeHandlerUrl(parsedDataUser?.id ?? "", shopifyStoreId ?? ""))
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const changeHandlerUrl = (userId: string, shopifyStoreId: string) => {
    return `${baseUrlFe}/configuration/fraud/configurationList?UserId=${userId}&shopifyStoreId=${shopifyStoreId}`
  };

  const handleMessage = (event: any) => {
    if (event.origin.includes(baseUrlFe)) {
      try {
        const dataConvert = JSON.parse(event.data);
        const userData = localStorage.getItem('userDataKey');
        const parsedDataUser = userData ? JSON.parse(userData) as User : null;
        const shopifyStoreId = localStorage.getItem("ShopifyStoreId") ?? "";
        const shopInfo = localStorage.getItem('ShopInfo');
        const parsedStoreInfo = shopInfo ? JSON.parse(shopInfo) : null;
        const encodedNameStore = encodeURIComponent(parsedStoreInfo?.shop?.name ?? "");
        if (dataConvert.messageName === 'REDIRECT_TO') {
          if (dataConvert.data.url.includes('setting?adAccountId')) {
            setUrl(dataConvert.data.url + `&shopifyStoreId=${shopifyStoreId ?? ""}&nameStore=${encodedNameStore}`)
          }else if(dataConvert.data.url === '/feature?c=Configuration&v=FraudPrevention'){
            setUrl(`${baseUrlFe}/configuration/fraud/prevention?user_id=${parsedDataUser?.id ?? ""}&shopifyStoreId=${shopifyStoreId?? ""}&nameStore=${encodedNameStore}`);
          } else if (dataConvert.data.url === 'loginShopify') {
            navigate('/app');
          }
          else if (dataConvert.data.url === '/feature?c=Configuration&v=List') {
            setUrl(changeHandlerUrl(parsedDataUser?.id ?? "", shopifyStoreId ?? ""))
          }
        }
      } catch (error) {
      }
    }
  };

  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = " (function(d, s, id, t) {\n              if (d.getElementById(id)) return;\n              var js, fjs = d.getElementsByTagName(s)[0];\n              js = d.createElement(s);\n              js.id = id;\n              js.src = 'https://widget.oncustomer.asia/js/index.js?lang=en&token=' + t;\n              fjs.parentNode.insertBefore(js, fjs);}\n            (document, 'script', 'oc-chat-widget-bootstrap', '32bab5cf62c5385d30d0e20422214aa5'));";
    document.body.appendChild(s);


    const userData = localStorage.getItem('userDataKey');
    const dataUser = userData ? JSON.parse(userData) as User : null;
    let userId = dataUser?.id ?? "";
    let shopifyStoreId = dataUser?.shopifyStoreId ?? "";
    setUrl(changeHandlerUrl(userId, shopifyStoreId))
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  return (
    <>
    {/*<TitleOnHub*/}
    {/*      welcomeText = {Constants.DEFAULT_WELCOMETEXT}*/}
    {/*      helpCenterLink={Constants.DEFAULT_HELPER_LINK}*/}
    {/*    />*/}
      p
      <iframe title="" src={url} className={styles.screenIframe}/>
    </>
  )
}
