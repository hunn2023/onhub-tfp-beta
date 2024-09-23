import ConfigOnHub from "~/routes/rootOnHubs/configOnhub";

export function MessageParentName(event: MessageEvent, navigate: any) {
  const baseUrlFe = ConfigOnHub.HOST_MODULAR_FE;
  if (event.origin.includes(baseUrlFe)) {
    try {
      const dataConvert = JSON.parse(event.data);
      if (dataConvert.messageName === 'REDIRECT_TO') {
        if (dataConvert.data.url === '/feature?c=Configuration&v=FraudPrevention') {
          navigate('/app/setting', {state: {redirectTo: 'ConfigurationFraudPrevention'}})
        } else if (dataConvert.data.url.includes('setting?adAccountId')) {
          navigate('/app/setting', {
            state: {
              redirectTo: 'SettingFraudPrevention',
              userSettingFraudPrevention: dataConvert.data.url
            }
          })
        } else if (dataConvert.data.url === '/feature?c=Configuration&v=List') {
          navigate('/app/configurationList');
        } else {
          navigate('/app');
        }
      } else if (dataConvert.messageName === 'NOTICE_SUCCESS') {
        shopify.toast.show(dataConvert.data.mess, {duration: 3000});
      } else if (dataConvert.messageName === 'NOTICE_ERROR') {
        shopify.toast.show(dataConvert.data.mess, {duration: 3000, isError: true});
      }
    } catch (error) {
      navigate('/app');
    }
  }
}
