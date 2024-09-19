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
  const ShopInfo =  useLoaderData<typeof loader>();

  useEffect(() => {
    localStorage.setItem("ShopInfo", JSON.stringify(ShopInfo));
    const shopData = localStorage.getItem('ShopInfo');
    if (shopData) {
      const shopDataInfor = JSON.parse(shopData) ?? null;
      const splitShopData = shopDataInfor.shop.id.split('/');
      localStorage.setItem("ShopifyStoreId", splitShopData[splitShopData.length - 1] ?? "")
    }
  }, []);


  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
