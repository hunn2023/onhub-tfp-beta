interface ConfigOnHub {
  HOST_ONHUB_BE: string;
  HOST_MODULAR_BE: string;
  HOST_MODULAR_FE: string;
}

const configOnHub: ConfigOnHub = {
  // HOST_ONHUB_BE: 'http://localhost:5293',
  // HOST_MODULAR_BE: 'http://localhost:5014',
  // HOST_MODULAR_FE: 'http://localhost:4200',

  HOST_ONHUB_BE: 'https://api-onhub.redis.asia',
  HOST_MODULAR_BE: 'https://api-onhub.redis.asia',
  HOST_MODULAR_FE: 'https://modular-onhub-test.web.app',
};

export default configOnHub;
