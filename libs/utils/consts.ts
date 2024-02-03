export const COINMARKETCAP_API_URL =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

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
    help: 'subscribe_email_count_help',
  },
  unsubscribeEmailCounter: {
    name: 'unsubscribe_email_count',
    help: 'unsubscribe_email_count_help',
  },
  sendEmailSuccessfulCounter: {
    name: 'send_email_successful_count',
    help: 'send_email_successful_count_help',
  },
  sendEmailErrorCounter: {
    name: 'send_email_error_count',
    help: 'send_email_error_count_help',
  },
  exchangeRateGauge: {
    name: 'exchange_rate_gauge',
    help: 'exchange_rate_gauge_help',
  },
};

export const EVENTS = {
  email_subscribed_event: 'email_subscribed',
};

export const TCP_CLIENTS = {
  email_subscription_client: 'EMAIL_SUBSCRIPTION',
};
