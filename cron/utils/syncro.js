const _ = require('lodash');
const { get } = require('./http');

const getRecords = async (endpoint) => {
  const records = [];
  let keepGoing = true;
  let page = 1;

  while (keepGoing) {
    const response = await get(`/${endpoint.endpoint}?page=${page}`);
    const total_pages = _.get(response, 'meta.total_pages', false);

    if (total_pages) {
      if (response.meta.total_pages === page || response.meta.total_pages === 0) {
        keepGoing = false;
      } else {
        page++;
      }
    } else {
      keepGoing = false;
    }

    records.push(response[endpoint.path]);
  }

  return _.flatten(records);
};

module.exports = {
  getRecords,
};
