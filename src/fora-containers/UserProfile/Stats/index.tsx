/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text } from "@theme-ui/components";
import IssuerFulfillerStatisticsCard from "fora-components/Card/IssuerFulfillerStatisticsCard";
import Divider from "fora-components/Divider";
import { Community } from "fora-components/TopCommunities";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LoadingIcon from "assets/loading";
import { userAverageRatingsVariables, userAverageRatings } from "./__generated__/userAverageRatings";

interface IProps {
  address: string;
}

const CommunityMemberOf = () => (
  <Flex sx={{ flexDirection: "column", "> a:not(:last-of-type)": { mb: 2 } }}>
    <Text variant="bodyStrong">Member of</Text>
    <Divider></Divider>
    <Community
      src={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      name={"code"}
      id={"1234567890"}
      memberCount={1274}
      isOption={false}
    />
    <Community
      src={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      name={"code"}
      id={"1234567890"}
      memberCount={1274}
      isOption={false}
    />
    <Community
      src={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      name={"code"}
      id={"1234567890"}
      memberCount={1274}
      isOption={false}
    />
    <Community
      src={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      name={"code"}
      id={"1234567890"}
      memberCount={1274}
      isOption={false}
    />
  </Flex>
);

const userAverageRatingsQuery = gql`
  query userAverageRatings($address: String!) {
    user_user(where: { public_address: { _eq: $address } }) {
      std_bounties_fulfillments {
        accepted
      }
      std_bounties_fulfillments_aggregate(where: { accepted: { _eq: true } }) {
        aggregate {
          count
        }
      }

      std_bounties_bounties {
        std_bounties_fulfillments_aggregate {
          aggregate {
            count
          }
        }
      }
      std_bounties_bounties_aggregate(where: { std_bounties_fulfillments: { accepted: { _eq: true } } }) {
        nodes {
          std_bounties_fulfillments_aggregate {
            aggregate {
              count
            }
          }
        }
      }

      stdBountiesReviewsByReviewerId_aggregate {
        aggregate {
          avg {
            rating
          }
        }
      }
      std_bounties_reviews_aggregate {
        aggregate {
          avg {
            rating
          }
        }
      }
    }
  }
`;

const Stats: React.FunctionComponent<IProps> = ({ address }) => {
  const { data, error } = useQuery<userAverageRatings, userAverageRatingsVariables>(userAverageRatingsQuery, {
    variables: { address }
  });
  if (error) {
    console.error(error);
    return <div>{JSON.stringify(error, null)}</div>;
  }
  if (data) {
    const user = Array.isArray(data?.user_user) && data.user_user.length && data.user_user[0];
    if (user) {
      const averageRatingGiven =
        Number(Number(user.stdBountiesReviewsByReviewerId_aggregate?.aggregate?.avg?.rating).toFixed(2)) || 0;
      const averageReceivedGivenRating =
        Number(Number(user.std_bounties_reviews_aggregate?.aggregate?.avg?.rating).toFixed(2)) || 0;
      const totalAcceptedFulfillmentsOnIssuedBounties = user.std_bounties_bounties_aggregate.nodes.reduce(
        (current, next) => {
          return current + (next?.std_bounties_fulfillments_aggregate.aggregate?.count || 0);
        },
        0
      );
      const totalFulfillmentsOnIssuedBounties = user.std_bounties_bounties.reduce((current, next) => {
        return current + (next?.std_bounties_fulfillments_aggregate.aggregate?.count || 0);
      }, 0);
      // console.log(totalAcceptedFulfillmentsOnIssuedBounties)
      // console.log(totalFulfillmentsOnIssuedBounties)
      const issuerFulfillmentAcceptanceRatePercentage = Math.floor(
        (totalAcceptedFulfillmentsOnIssuedBounties / totalFulfillmentsOnIssuedBounties) * 100
      );

      const totalAcceptedFulfillments = user.std_bounties_fulfillments_aggregate.aggregate?.count || 0;
      const totalFulfillments = user.std_bounties_fulfillments.length;
      // console.log(totalAcceptedFulfillments)
      // console.log(totalFulfillments)
      const fulfillmentAcceptanceRatePercentage = Math.floor((totalAcceptedFulfillments / totalFulfillments) * 100);

      return (
        <Flex sx={{ flexDirection: "column", pt: 2, "> div:first-of-type": { mb: 5 } }}>
          <IssuerFulfillerStatisticsCard
            averageRatingGiven={averageRatingGiven}
            averageReceivedGivenRating={averageReceivedGivenRating}
            issuerFulfillmentAcceptanceRate={issuerFulfillmentAcceptanceRatePercentage}
            fulfillmentAcceptanceRate={fulfillmentAcceptanceRatePercentage}
          />
          <CommunityMemberOf></CommunityMemberOf>
        </Flex>
      );
    }
  }
  return <LoadingIcon></LoadingIcon>;
};

export default Stats;
