/*
ordering:
search:
issuer:
fulfillmentAmount
fulfillmentAmount__lt
fulfillmentAmount__gt
fulfillmentAmount__lte
bountyStage
bounty_created__lt
bounty_created__gt
deadline__lt
deadline__gt
bounty_id
categories__normalized_name
categories__normalized_name__contains
categories__normalized_name__startswith
categories__normalized_name__endswith
categories__normalized_name__in
fulfillments__fulfiller
limit
offset

{
  ordering: 'fulfillmentAmount',

}
*/

function checkStages(stages) {
  let result = false;
  Object.keys(stages).forEach(elem => {
    if (stages[elem]) {
      result = true;
    }
  });
  return result;
}

export const readFile = file =>
  new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onloadend = () => {
      resolve(reader);
    };
    reader.readAsArrayBuffer(file);
  });

export const promisify = inner =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  );

export const proxiedWeb3Handler = {
  // override getter
  get: (target, name) => {
    const inner = target[name];
    if (inner instanceof Function) {
      // Return a function with the callback already set.
      return (...args) => promisify(cb => inner(...args, cb));
    } else if (typeof inner === 'object') {
      // wrap inner web3 stuff
      return new Proxy(inner, proxiedWeb3Handler);
    } else {
      return inner;
    }
  }
};
