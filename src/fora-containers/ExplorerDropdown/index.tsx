/** @jsx jsx */
import { jsx } from "theme-ui";
import ExplorerDropdown from "fora-components/ExplorerDropdown";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import gql from "graphql-tag";
import LoadingIcon from "assets/loading";
import { Props as RSProps } from "react-select";
import ExplorerCard from "fora-components/Card/ExplorerCard";
import moment from "moment";
import { BigNumber } from "bignumber.js";
import { DIFFICULTY_MAPPINGS } from "public-modules/Bounty/constants";

const query = gql`
  query {
    user_user {
      id
    }
  }
`;

const allBountiesQuery = gql`
  query($platform: String!, $tags: jsonb = []) {
    std_bounties_bounty(
      limit: 10,
      where: { platform: { _in: [$platform] }, bounty_stage: { _in: [1] }, data_categories: { _contains: $tags } }
      order_by: { deadline: asc }
    ) {
      id
      deadline
      title
      balance
      experience_level
      data_categories
      token_symbol
      calculated_fulfillment_amount
      usd_price
      std_bounties_fulfillments {
        id
      }
      user_user {
        name
        public_address
      }
    }
  }
`;

const collectionOptions = [
  {
    value: "yourCommunities",
    label: "Your Communities"
  },
  {
    value: "allBounties",
    label: "All Bounties"
  }
];

const PlatformStatisticsContainer: React.FunctionComponent<RSProps> = props => {
  const [state, setState] = React.useState<{ value: string; label: string } | null>(null);
  const [tags, setTag] = React.useState<string[]>([]);
  const { data: communitiesData, loading, error } = useQuery(query);
  const options = [
    { label: "Bounty collections", options: collectionOptions },
    { label: "From your communities", options: [] }
  ];
  const getPlatformVariable = (value): string => {
    if (value === "allBounties") {
      return "bounties-network";
    }
    return "";
  };
  const platform = getPlatformVariable(state?.value);
  const { data, loading: bountiesLoading, error: bountiesError } = useQuery<any, { platform: string; tags: string[] }>(
    allBountiesQuery,
    {
      variables: {
        platform,
        tags
      }
    }
  );
  // const { data } = useQuery(query)
  if (error || bountiesError) {
    error && console.error(error);
    return (
      <div>
        {JSON.stringify(error, null)}
        {JSON.stringify(bountiesError, null)}
      </div>
    );
  }

  if (!loading && !error && communitiesData) {
    return (
      <div>
        <ExplorerDropdown
          {...props}
          handleChange={option => {
            setState(option);
            setTag([]);
          }}
          value={state}
          options={options}
        />
        <div sx={{ display: "flex", flexDirection: "column", "> *": { mb: 5 }, mt: 5 }}>
          {!bountiesError && !bountiesLoading &&
            platform.length > 0 &&
            data?.std_bounties_bounty.map(bounty => {
              // console.log(bounty)
              return (
                <ExplorerCard
                  key={bounty.id}
                  avatar={{
                    screenName: bounty?.user_user?.name,
                    name: bounty?.user_user?.name,
                    address: bounty?.user_user?.public_address,
                    variant: "user",
                    size: "small",
                    onDark: false
                  }}
                  token={bounty.token_symbol}
                  difficulty={DIFFICULTY_MAPPINGS[bounty.experience_level]}
                  tags={bounty.data_categories}
                  tokenInUSD={Number(bounty.usd_price.toFixed(2))}
                  tokenValue={Number(new BigNumber(bounty.calculated_fulfillment_amount, 10).toString())}
                  submissionCount={bounty?.std_bounties_fulfillments.length}
                  deadline={moment(bounty.deadline)}
                  href={`/bounty/${bounty.id}`}
                  title={bounty.title}
                  status={"active"}
                  handleTagClick={tag => setTag(tag)}
                ></ExplorerCard>
              );
            })}
        </div>
      </div>
    );
  }
  return <LoadingIcon></LoadingIcon>;
};

export default PlatformStatisticsContainer;
