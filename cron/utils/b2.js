require('dotenv').config();
const B2 = require('backblaze-b2');

const b2 = new B2({
  applicationKeyId: process.env.B2_APPLICATION_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

const upload = async (data, filename) => {
  await b2.authorize();

  const buffer = Buffer.from(JSON.stringify(data));

  const uploadUrl = await b2.getUploadUrl({
    bucketId: process.env.B2_BUCKET_ID,
  });

  await b2.uploadFile({
    uploadUrl: uploadUrl.data.uploadUrl,
    uploadAuthToken: uploadUrl.data.authorizationToken,
    fileName: `${filename}.json`,
    data: buffer,
    info: {
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    },
  });
};

module.exports = {
  upload,
};
