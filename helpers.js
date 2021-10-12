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
  ).toFixed(decimal);
}

function isInWeekRange(weekDate, date) {
  weekDate = new Date(weekDate);
  date = new Date(date);

  const day = weekDate.getDay();
  const diff = weekDate.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  const startOfTheWeek = new Date(weekDate.setDate(diff)).getTime();
  const endOfTheWeek = new Date(weekDate.setDate(diff + 6)).getTime(); //end of the week is more 6 days
  return startOfTheWeek <= date && date <= endOfTheWeek;
}

module.exports = { fetch, RoundUp, isInWeekRange };
