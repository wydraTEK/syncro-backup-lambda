const axios = require('axios').default;
const rax = require('retry-axios');
const { setupCache } = require('axios-cache-adapter');
require('dotenv').config();

rax.attach();

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

const get = async (endpoint) => {
  const api = axios.create({
    adapter: cache.adapter,
  });

  try {
    const response = await api({
      method: 'GET',
      url: `${process.env.API_URL}/${endpoint}`,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      raxConfig: {
        retry: 3,
        noResponseRetries: 2,
        retryDelay: 100,
        httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
        statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
        backoffType: 'exponential',
        onRetryAttempt: (err) => {
          const cfg = rax.getConfig(err);
          console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
        },
      },
    });

    return response.data;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  get,
};
