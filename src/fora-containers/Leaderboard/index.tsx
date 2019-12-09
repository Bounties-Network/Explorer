/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState } from "react";
import { Flex } from "@theme-ui/components";
import { useQuery } from "@apollo/react-hooks";
import SegmentedControl from "fora-components/SegmentedControl";
import Leaderboard from "fora-components/Leaderboard";
import gql from "graphql-tag";
import LoadingIcon from "assets/loading";

const fulfillerQuery = gql`
  query($offset: Int = 0, $limit: Int = 10) {
    user_user(
      offset: $offset
      limit: $limit,
      where: { std_bounties_fulfillments: { accepted: { _eq: true }, usd_price: { _is_null: false, _gt: 0 } } }
      order_by: { std_bounties_fulfillments_aggregate: { sum: { usd_price: desc } } }
    ) {
      name
      small_profile_image_url
      public_address
      std_bounties_fulfillments_aggregate(order_by: { usd_price: desc_nulls_last }) {
        aggregate {
          sum {
            usd_price
          }
        }
      }
    }
  }
`;

const LeaderboardContainer: React.FC = () => {
  const [state, setState] = useState<string>("Issuers");
  const [page, setPage] = useState<number>(0);
  const { data, error, loading, fetchMore } = useQuery<any, any>(state === "Issuers" ? fulfillerQuery : fulfillerQuery);
  const currentETHUsdPrice = 145;
  const leaderboardData =
    Array.isArray(data?.user_user) &&
    data?.user_user.map(fulfiller => ({
      name: fulfiller.name,
      screenName: fulfiller.name,
      address: fulfiller.public_address,
      ethInUSD: Number(fulfiller.std_bounties_fulfillments_aggregate?.aggregate.sum.usd_price).toFixed(2),
      ethAmount: Number(fulfiller.std_bounties_fulfillments_aggregate?.aggregate.sum.usd_price * currentETHUsdPrice).toFixed(2)
    }));
  console.log(data, error);

  if (data && !loading) {
    return (
      <Flex sx={{ flexDirection: "column", '> div:first-of-type': { ml: 'auto', mb: 4 } }}>
        <SegmentedControl
          firstOption={"Issuers"}
          firstOptionHandleClick={() => {
            setState("Issuers");
          }}
          secondOption={"Fulfillers"}
          secondOptionHandleClick={() => {
            setState("Fulfillers");
          }}
        ></SegmentedControl>
        <Leaderboard loadMore={() => {
              const offset = page + 1
              console.log(offset)
              const limit = (offset + 1) * 10
              fetchMore({
                variables: {
                  offset: 0,
                  limit
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    user_user: fetchMoreResult.user_user
                  });
                }
              }).then(() => {
                setPage(offset)
              })
        }} data={leaderboardData}></Leaderboard>
      </Flex>
    );
  }
  if (error) {
    console.error(error);
    return <div>{JSON.stringify(error, null)}</div>;
  }
  return <LoadingIcon></LoadingIcon>;
};

export default LeaderboardContainer;
