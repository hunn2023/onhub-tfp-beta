import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useLoaderData,
} from "@remix-run/react";
import shopify from '~/shopify.server';
import {json, LoaderFunctionArgs} from '@remix-run/node';
import {useEffect} from "react";
import configOnHub from "./routes/rootOnHubs/configOnhub";

export async function loader({request}: LoaderFunctionArgs) {
  const {admin} = await shopify.authenticate.admin(request);
  const response = await admin.graphql(
    `#graphql
            query shopInfo {
            shop {
              id
              name
              url
              myshopifyDomain
            }
          }`,
  );

  const result = await response.json();
  return json(result.data);
}

export default function App() {
  const ShopInfo = useLoaderData<typeof loader>();
  const handleVisibilityChange = () => {
    const tabActive = !document.hidden;
    const shopInfo = localStorage.getItem('ShopInfo');
    const parsedNameStore = shopInfo ? JSON.parse(shopInfo) : null;
    const myshopifyDomainParse = parsedNameStore?.shop?.myshopifyDomain ?? "";
    console.log("active:" + tabActive);
    if (tabActive){
      const regex = /[?&]shop=([^&]+)/;
      const match = window.location.href.match(regex);
      console.log("shopMatch:"  + match);
      console.log("myshopifyDomainParse:"  + myshopifyDomainParse);
      if (match && match[1]) {
        const  shopMatch = decodeURIComponent(match[1]);        
        if(shopMatch !== myshopifyDomainParse) {
          window.location.reload();
        }
      }
    }
 };
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    const checkShopifyStore = async (shopifyStoreId : string) => {
      try {
        const response = await fetch(`${configOnHub.HOST_ONHUB_BE}/dynamic/api/shopify/checkShopifyStoreExist?shopifyStoreId=${shopifyStoreId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response.ok) {
          const result = await response.json();
          if(result == false) {
            localStorage.removeItem('accessTokenKey');
            localStorage.removeItem('userDataKey');
          }
        }
      } catch (error) {
        console.log('Shopify store already belongs to another customer.', error);
      }
    };
     // Call api  Clear ShopifyStoreId and usserData.
    localStorage.removeItem('ShopifyStoreId');
    const splitShopData = ShopInfo.shop.id.split('/');
    const shopifyStoreId = splitShopData[splitShopData.length - 1];
    let ShopInfoConvert = {
      shop: {
        id: shopifyStoreId,
        name: ShopInfo.shop.name,
        url: ShopInfo.shop.url,
        myshopifyDomain: ShopInfo.shop.myshopifyDomain,
      }
    }
    checkShopifyStore(shopifyStoreId);
    localStorage.removeItem('ShopInfo');
    localStorage.setItem("ShopInfo", JSON.stringify(ShopInfoConvert));
    localStorage.setItem("ShopifyStoreId", shopifyStoreId ?? "");

    // return () => {
    //   document.removeEventListener("visibilitychange", handleVisibilityChange);
    // };
  }, []);


  return (
    <html>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <link rel="preconnect" href="https://cdn.shopify.com/"/>
      <link
        rel="stylesheet"
        href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
      />
      <Meta/>
      <Links/>
    </head>
    <body>
    <Outlet/>
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
  );
}
