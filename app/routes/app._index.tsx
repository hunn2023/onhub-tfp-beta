import {
  Page,

} from "@shopify/polaris";
import Apphomepage from "./components/apphomepage";
import Constants from "./Core/Helpers/constants";
// import TitleOnHub from "~/routes/components/UI/titleOnhub";



export default function Index() {

  //
  return (
    <>
    {/*<TitleOnHub*/}
    {/*      welcomeText = {Constants.DEFAULT_WELCOMETEXT}*/}
    {/*      helpCenterLink={Constants.DEFAULT_HELPER_LINK}*/}
    {/*    />*/}
    <Page>
        <Apphomepage/>
    </Page>
  </>
  );
}
