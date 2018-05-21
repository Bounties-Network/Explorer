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

function queryBuilder(options) {
  let result = '?';
  Object.keys(options).forEach(term => {
    result = result + `&${term}=${options[term]}`;
  });
  return result;
}

export function searchQueryBuilder(options) {
  return options ? queryBuilder(options) : '';
}
