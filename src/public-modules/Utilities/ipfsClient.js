import ipfsAPI from 'ipfs-api';

const ipfs = ipfsAPI({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

export const addBufferToIPFS = (filename, bufferContent) =>
  new Promise((resolve, reject) => {
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

export default ipfs;
