import {
  Page,

} from "@shopify/polaris";
import Apphomepage from "./components/apphomepage";
// import TitleOnHub from "../routes/components/UI/titleOnHub";
import Constants from "./Core/Helpers/constants";



export default function Index() {

  //
  return (
    <>
    {/*<TitleOnHub    */}
    {/*      welcomeText = {Constants.DEFAULT_WELCOMETEXT}*/}
    {/*      helpCenterLink={Constants.DEFAULT_HELPER_LINK}*/}
    {/*    />*/}
    <Page>
        <Apphomepage/>
    </Page>
  </>
  );
}
