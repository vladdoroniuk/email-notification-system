const IS_DOCKER_CONTAINER = process.env.DOCKER_CONTAINER;

export const COINMARKETCAP_API_URL =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

export const PROMETHEUS_API_URL = IS_DOCKER_CONTAINER
  ? 'http://prometheus:9090/api/v1/query'
  : 'http://localhost:9090/api/v1/query';

export const ROUTES = {
  rate: '/rate',
  emails: '/emails',
  metrics: '/metrics',
};

export const CURRENCIES = {
  fiat: {
    uah: 'UAH',
  },
  crypto: {
    btc: 'BTC',
  },
};

export const METRICS = {
  subscribeEmailCounter: {
    name: 'subscribe_email_count',
    help: 'Counts the number of successful email subscriptions',
  },
  unsubscribeEmailCounter: {
    name: 'unsubscribe_email_count',
    help: 'Counts the number of successful email unsubscriptions',
  },
  sendEmailSuccessfulCounter: {
    name: 'send_email_successful_count',
    help: 'Counts the number of successfully sent emails',
  },
  sendEmailErrorCounter: {
    name: 'send_email_error_count',
    help: 'Counts the number of email sending errors',
  },
  exchangeRateGauge: {
    name: 'exchange_rate_gauge',
    help: 'Tracks the current exchange rate',
  },
};

export const SCRAPE_INTERVAL_IN_MS = 10_000;
