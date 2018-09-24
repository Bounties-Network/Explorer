import ipfsMiniAPI from 'ipfs-mini';

const ipfsMini = new ipfsMiniAPI({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

export const addBufferToIPFS = (filename, bufferContent) =>
  new Promise((resolve, reject) => {
    // due to es5 issues - we load this via a CDN
    const ipfs = window.IpfsApi({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    });

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
