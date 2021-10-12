module.exports = {
  hostname: 'https://private-00d723-paysera.apiary-proxy.com',
  timeout: 20000, // in ms
  validateStatus: (status) => status >= 200 && status <= 400,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
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
