import React, { useEffect, useState } from "react";
import ConfigOnHub from "~/routes/rootOnHubs/configOnhub";
import type { User } from "./Core/services/userServices";
import styles from "./components/apphomePage.module.css";

export default function ConfigurationList() {
  const baseUrlFe = ConfigOnHub.HOST_MODULAR_FE;
  const [url, setUrl] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('userDataKey');
    const parsedDataUser = userData ? JSON.parse(userData) as User : null;

    setUrl(changeHandlerUrl(parsedDataUser?.id ?? "", parsedDataUser?.shopifyStoreId ?? ""))
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
        if (dataConvert.messageName === 'REDIRECT_TO') {
          if (dataConvert.data.url.includes('setting?adAccountId')) {

            const shopInfo = localStorage.getItem('ShopInfo');
            const parsedStoreName = shopInfo ? JSON.parse(shopInfo) : null;

            setUrl(dataConvert.data.url + `&shopifyStoreId=${parsedDataUser?.shopifyStoreId ?? ""}&storeName=${parsedStoreName?.name ?? ""}`)
          }
        }
      } catch (error) {
      }
    }
  };

  useEffect(() => {
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
      <iframe src={url} className={styles.screenIframe} />
    </>
  )
}
