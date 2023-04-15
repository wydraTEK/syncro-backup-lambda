const { getRecords } = require('../utils/syncro');
const { upload } = require('../utils/b2');

module.exports.handler = async () => {
  const backedUpEndpoints = [{
    endpoint: 'tickets',
    path: 'tickets',
  }, {
    endpoint: 'contacts',
    path: 'contacts',
  }, {
    endpoint: 'customers',
    path: 'customers',
  }, {
    endpoint: 'schedules',
    path: 'schedules',
  }, {
    endpoint: 'timelogs',
    path: 'timelogs',
  }, {
    endpoint: 'customer_assets',
    path: 'assets',
  }, {
    endpoint: 'wiki_pages',
    path: 'wiki_pages',
  }, {
    endpoint: 'purchase_orders',
    path: 'purchase_orders',
  }, {
    endpoint: 'products',
    path: 'products',
  }, {
    endpoint: 'contracts',
    path: 'contracts',
  }, {
    endpoint: 'settings',
    path: 'settings',
  }, {
    endpoint: 'invoices',
    path: 'invoices',
  }];

  await backupData(backedUpEndpoints);
};

const backupData = async (endpointArray) => {
  for (const item of endpointArray) {
    const data = await getRecords(item);
    await upload(data, item.endpoint);
  }

  console.log('Backup finished');
};
