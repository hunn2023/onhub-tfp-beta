import ConfigOnHub from "~/routes/rootOnHubs/configOnhub";

export function MessageParentName(event: MessageEvent, navigate: Function) {
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
      }
    } catch (error) {
      navigate('/app');
    }
  }
}
