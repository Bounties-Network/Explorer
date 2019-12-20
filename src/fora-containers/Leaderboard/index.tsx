/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState } from "react";
import { Flex } from "@theme-ui/components";
import { useQuery } from "@apollo/react-hooks";
import SegmentedControl from "fora-components/SegmentedControl";
import Leaderboard from "fora-components/Leaderboard";
import gql from "graphql-tag";
import LoadingIcon from "assets/loading";
import { issuerLeaderboard, issuerLeaderboardVariables } from "./__generated__/issuerLeaderboard";
import { fulfillerLeaderboard, fulfillerLeaderboardVariables } from "./__generated__/fulfillerLeaderboard";

const fulfillerLeaderboardQuery = gql`
  query fulfillerLeaderboard($offset: Int = 0, $limit: Int = 10) {
    std_bounties_token(where: { name: { _eq: "Ethereum" } }) {
      name
      price_usd
    }
    user_user(
      offset: $offset
      limit: $limit
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

const issuerLeaderboardQuery = gql`
  query issuerLeaderboard($offset: Int = 0, $limit: Int = 10) {
    std_bounties_token(where: { name: { _eq: "Ethereum" } }) {
      name
      price_usd
    }
    user_user(
      offset: $offset
      limit: $limit
      where: {
        std_bounties_bounties: {
          usd_price: { _is_null: false }
          std_bounties_fulfillments: { accepted: { _eq: true }, usd_price: { _is_null: false } }
        }
      }
      order_by: { std_bounties_bounties_aggregate: { sum: { usd_price: desc } } }
    ) {
      name
      small_profile_image_url
      public_address
      std_bounties_bounties_aggregate {
        aggregate {
          sum {
            usd_price
          }
        }
      }
    }
  }
`;

const extractFulfillerData = currentETHUsdPrice => fulfiller => ({
  name: fulfiller.name,
  screenName: fulfiller.name,
  address: fulfiller.public_address,
  ethInUSD: Number(fulfiller.std_bounties_fulfillments_aggregate?.aggregate.sum.usd_price).toFixed(2),
  ethAmount: Number(
    fulfiller.std_bounties_fulfillments_aggregate?.aggregate.sum.usd_price / currentETHUsdPrice
  ).toFixed(2)
});

const extractIssuerData = currentETHUsdPrice => issuer => ({
  name: issuer.name,
  screenName: issuer.name,
  address: issuer.public_address,
  ethInUSD: Number(issuer.std_bounties_bounties_aggregate?.aggregate.sum.usd_price).toFixed(2),
  ethAmount: Number(issuer.std_bounties_bounties_aggregate?.aggregate.sum.usd_price / currentETHUsdPrice).toFixed(2)
});

const LeaderboardContainer: React.FC = () => {
  const [state, setState] = useState<string>("Issuers");
  const [page, setPage] = useState<number>(0);
  const { data, error, loading, fetchMore } = useQuery<
    issuerLeaderboard | fulfillerLeaderboard,
    issuerLeaderboardVariables | fulfillerLeaderboardVariables
  >(state === "Issuers" ? issuerLeaderboardQuery : fulfillerLeaderboardQuery);

  const currentETHUsdPrice = data?.std_bounties_token[0]?.price_usd;
  const leaderboardData =
    data?.user_user &&
    Array.isArray(data?.user_user) &&
    // @ts-ignore - TypeScript doesn't understand union types with .map =_=
    data?.user_user.map(
      state === "Issuers"
        ? (extractIssuerData(currentETHUsdPrice) as any)
        : (extractFulfillerData(currentETHUsdPrice) as any)
    );

  // console.log(data, error);

  if (data && !loading) {
    return (
      <Flex sx={{ flexDirection: "column", "> div:first-of-type": { ml: "auto", mb: 4 } }}>
        <SegmentedControl
          firstOption={"Issuers"}
          firstOptionHandleClick={() => {
            setPage(0);
            setState("Issuers");
          }}
          secondOption={"Fulfillers"}
          secondOptionHandleClick={() => {
            setPage(0);
            setState("Fulfillers");
          }}
        />
        <Leaderboard
          loadMore={() => {
            const offset = page + 1;
            const limit = (offset + 1) * 10;
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
              setPage(offset);
            });
          }}
          data={leaderboardData}
        />
      </Flex>
    );
  }
  if (error) {
    console.error(error);
    return <div>{JSON.stringify(error, null)}</div>;
  }
  return <LoadingIcon />;
};

export default LeaderboardContainer;
