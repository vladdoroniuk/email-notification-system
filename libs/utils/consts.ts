const IS_DOCKER_CONTAINER = process.env.DOCKER_CONTAINER;

export const COINMARKETCAP_API_URL =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

export const PROMETHEUS_API_URL = IS_DOCKER_CONTAINER
  ? 'http://prometheus:9090/api/v1/query'
  : 'http://localhost:9090/api/v1/query';

export const ROUTES = {
  rate: '/rate',
  emails: '/emails',
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
  sendEmailSuccessCounter: {
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

export const SEND_RATE_RESPONSE_MESSAGE =
  'Rate successfully sent to active subscriptions';

export const SCRAPE_INTERVAL_IN_MS = 30_000;
export const EXCHANGE_RATE_INTERVAL_IN_MS = 3_600_000;
export const EXCHANGE_RATE_CACHE_KEY = 'rate';
export const CRON_TIME_ZONE = 'Europe/Kyiv';

export const EMAIL_QUEUE = 'email-queue';
export const EMAIL_SEND_JOB = 'email-send';
export const EMAIL_SUBJECT = 'Updates on UAH-to-BTC exchange rate';
export const EMAIL_TEXT = 'Current UAH-to-BTC exchange rate';
export const EMAIL_FROM = 'Crypto Notifier';
export const EMAIL_TRANSPORTER = 'nodemailer';
