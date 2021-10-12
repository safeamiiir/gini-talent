module.exports = {
  hostname: 'https://private-00d723-paysera.apiary-proxy.com',
  timeout: 20000, // in ms
  headers: {
    'Content-Type': 'application/json',
  },
  endpoints: [
    {
      key: 'cash-in',
      url: '/cash-in',
      method: 'GET',
    },
    {
      key: 'cash-out-natural',
      url: '/cash-out-natural',
      method: 'GET',
    },
    {
      key: 'cash-out-juridical',
      url: '/cash-out-juridical',
      method: 'GET',
    },
  ],
};
