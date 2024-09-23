/* eslint-disable jsx-a11y/iframe-has-title */
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import ConfigOnHub from "~/routes/rootOnHubs/configOnhub";
import type {User} from "./Core/services/userServices";
import styles from "./components/apphomePage.module.css";
import Constants from "../routes/Core/Helpers/constants";
import {MessageParentName} from "~/routes/_index/messageParentName";
import TitleOnHub from "~/routes/components/UI/titleOnhub";

export default function Dashboard() {
  const baseUrlFe = ConfigOnHub.HOST_MODULAR_FE;
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleEvent = (event: any) => {
    MessageParentName(event, navigate);
  };

  useEffect(() => {
    const shopInfo = localStorage.getItem("ShopInfo") ?? "";
    const userData = localStorage.getItem('userDataKey');
    const parsedDataUser = userData ? JSON.parse(userData) as User : null;
    const parsedShopInfo = userData ? JSON.parse(shopInfo) : null;

    if (parsedDataUser != null) {
      RenderScripts();
    }
    setUrl(`${baseUrlFe}/dashboard?UserId=${parsedDataUser?.id ?? ""}&shopifyStoreId=${parsedShopInfo?.shop?.id ?? ""}`);
    window.addEventListener('message', handleEvent);
    return () => {
      window.removeEventListener('message', handleEvent);
    };
  }, []);

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

  return (
    <>
      <TitleOnHub
        welcomeText="Dashboard"
        helpCenterLink=""
      />
      <iframe src={url} className={styles.screenIframe}/>
    </>
  );
}
