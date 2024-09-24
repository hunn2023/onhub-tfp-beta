import {
  Page,

} from "@shopify/polaris";
import Apphomepage from "./components/apphomepage";
import Constants from "./Core/Helpers/constants";
import TitleOnHub from "./components/UI/titleOnhub";
import {json, LoaderFunctionArgs} from '@remix-run/node';
import shopify from '../shopify.server';
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";


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


export default function Index() {
  const ShopInfo = useLoaderData<typeof loader>();
 
  useEffect(() => {
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

    localStorage.removeItem("ShopInfo");
    localStorage.removeItem("ShopifyStoreId");
    localStorage.setItem("ShopInfo", JSON.stringify(ShopInfoConvert));
    localStorage.setItem("ShopifyStoreId", shopifyStoreId ?? "");
  }, []);
  //
  return (
    <>
      <TitleOnHub
        welcomeText = {Constants.DEFAULT_WELCOMETEXT}
        helpCenterLink={Constants.DEFAULT_HELPER_LINK}
      />
    <Page>
        <Apphomepage/>
    </Page>
  </>
  );
}
