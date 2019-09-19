import ipfsMiniAPI from 'ipfs-mini';

const ipfsConfig = {
  host:
    'afedcb263daee11e9a62c0e21c210ae1-1865340558.us-east-1.elb.amazonaws.com',
  port: 5001,
  protocol: 'http'
};

const ipfsMini = new ipfsMiniAPI(ipfsConfig);

export const addBufferToIPFS = (filename, bufferContent) =>
  new Promise((resolve, reject) => {
    // due to es5 issues - we load this via a CDN
    const ipfs = window.IpfsApi(ipfsConfig);

    ipfs.add(
      [{ path: `/bounties/${filename}`, content: bufferContent }],
      (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response[1].hash);
      }
    );
  });

export const addJSON = data =>
  new Promise((resolve, reject) => {
    ipfsMini.addJSON(data, (err, response) => {
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  });
