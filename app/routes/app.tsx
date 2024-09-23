import type {LoaderFunctionArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Link, Outlet, useLoaderData, useLocation, useNavigate} from "@remix-run/react";
import {AppProvider} from "@shopify/shopify-app-remix/react";
import {NavMenu} from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

import {authenticate} from "../shopify.server";
import {useEffect, useState} from "react";
import {User} from "~/routes/Core/services/userServices";
import ConfigOnHub from "~/routes/rootOnHubs/configOnhub";

export const links = () => [{rel: "stylesheet", href: polarisStyles}];

export const loader = async ({request}: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return json({apiKey: process.env.SHOPIFY_API_KEY || ""});
};

export default function App() {
  const {apiKey} = useLoaderData<typeof loader>();
  const location = useLocation();
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
                className={location.pathname === "/app/dashboard" ? "active" : ""}
              >
                Dashboard
              </Link>
              <Link
                to="/app/configurationList"
                className={location.pathname === "/app/configurationList" ? "active" : ""}
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

