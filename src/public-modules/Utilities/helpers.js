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

function queryBuilder(options) {
  console.log('options', options);
  let result = '?';
  if (options.address) {
    result = result + `&issuer=${options.address}`;
  }
  if (options.search) {
    result = result + `&search=${options.search}`;
  }
  if (options.filter) {
    if (options.filter.categories && options.filter.categories.length > 0) {
      let categoriesTerm = 'categories__normalized_name__in=';
      let categoriesQuery = options.filter.categories
        .map(elem => {
          return elem.normalized_name;
        })
        .join(',');
      result = result + categoriesTerm + categoriesQuery;
    }
    if (options.filter.paymentStatus) {
    }
    if (options.filter.difficulty) {
    }
    if (checkStages(options.filter.stage)) {
      let stageStr = '&bountyStage__in=';
      let stages = [];
      if (options.filter.stage.draft) {
        stages.push('0');
      }
      if (options.filter.stage.active) {
        stages.push('1');
      }
      if (options.filter.stage.completed) {
        stages.push('2');
      }
      if (options.filter.stage.expired) {
        stages.push('3');
      }
      if (options.filter.stage.killed) {
        stages.push('4');
      }
      result = result + stageStr + stages.join(',');
    }
  }
  if (options.sort) {
    let sortTerm = options.sort.descending ? '' : '-';
    if (options.sort.sortBy === 'Value') {
      sortTerm = sortTerm + 'usd_price';
    }
    if (options.sort.sortBy === 'Expiry') {
      sortTerm = sortTerm + 'deadline';
    }
    if (options.sort.sortBy === 'Creation Date') {
      sortTerm = sortTerm + 'bounty_created';
    }
    result = result + `&ordering=${sortTerm}`;
  }
  return result;
}

export function searchQueryBuilder(options) {
  return options ? queryBuilder(options) : '';
}

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
