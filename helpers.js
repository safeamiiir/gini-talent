const APIConfig = require('./APIConfig');
const axios = require('axios');

function fetch(key) {
  const endpoint = APIConfig.endpoints.find((endpoint) => endpoint.key === key);
  return axios({
    url: `${APIConfig.hostname}${endpoint.url}`,
    method: endpoint.method,
    timeout: APIConfig.timeout,
    withCredentials: true,
  });
}

function RoundUp(price, decimal) {
  return (
    Math.ceil(price * Math.pow(10, decimal)) / Math.pow(10, decimal)
  ).toFixed(2);
}

function isInWeekRange(weekDate, date) {
  const now = new Date(date);
  const first = now.getDate() - now.getDay() + 1;
  // First day is the day of the month - the day of the week
  const last = first + 6;
  // last day is the first day + 6

  const firstDay = new Date(now.setDate(first)).getTime();
  const lastDay = new Date(now.setDate(last)).getTime();
  const operationDate = new Date(weekDate).getTime();

  return firstDay <= operationDate && operationDate <= lastDay;
}

module.exports = { fetch, RoundUp, isInWeekRange };
