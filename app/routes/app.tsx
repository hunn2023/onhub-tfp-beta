import type {LoaderFunctionArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Link, Outlet, useLoaderData} from "@remix-run/react";
import {AppProvider} from "@shopify/shopify-app-remix/react";
import {NavMenu} from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

import {authenticate} from "../shopify.server";
import {useEffect, useState} from "react";
import type {User} from "~/routes/Core/services/userServices";

export const links = () => [{rel: "stylesheet", href: polarisStyles}];

export const loader = async ({request}: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return json({apiKey: process.env.SHOPIFY_API_KEY || ""});
};

export default function App() {
  const {apiKey} = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState(true);
  useEffect(() => {
    const userData = localStorage.getItem('userDataKey');
    const parsedDataUser = userData ? JSON.parse(userData) as User : null;
    setActiveTab(!!parsedDataUser);
  }, []);

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        {
          activeTab ? (
            <>
              <Link
                to="/app/dashboard"
              >
                Dashboard
              </Link>
              <Link
                to="/app/configurationList"
              >
                Configuration List
              </Link>
            </>
          ) : ""
        }
      </NavMenu>
      <Outlet/>
    </AppProvider>
  );
}

