/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LoadingIcon from 'assets/loading';
import PreviewCard from 'fora-components/Card/BountyPreviewCard';
import { STAGE_VALUES } from 'public-modules/Bounty/constants';

const query = gql`
  query($address: String) {
    std_bounties_bounty(
      where: { 
        user_user: { public_address: { _eq: $address } },
        bounty_stage: { _neq: 0 }
      },
      order_by: { bounty_stage: asc }
    ) {
      id
      title
      deadline
      std_bounties_fulfillments_aggregate {
        aggregate {
          count
        }
      } 
      bounty_stage
      usd_price
      calculated_fulfillment_amount
    }
  }
`

interface IProps {  }

const Bounties: React.FunctionComponent<IProps> = (props) => {
  const { data, loading, error } = useQuery(query, { variables: { address: "0x0f7977cfa7fba5921ff52d9cacd844eeac0eb421" } })
  if (error) {
    console.error(error)
    return <div>{JSON.stringify(error, null)}</div>
  }
  if (data) {
    const bounties = data?.std_bounties_bounty
    console.log(bounties)
    return Array.isArray(bounties) && bounties.length ? 
      <div sx={{ '> :not(:last-of-type)': { mb: 5 } }}>
        {
              bounties.map(({
                id,
                title,
                deadline,
                bounty_stage,
                usd_price,
                calculated_fulfillment_amount,
                // community,
                std_bounties_fulfillments_aggregate: { aggregate: { count } }
              }) =>
                <PreviewCard
                key={id}
                title={title}
                href={`/bounty/${id}`}
                expirationTimestamp={deadline}
                submissionCount={count}
                status={String(STAGE_VALUES[bounty_stage]).replace('stages.', '')}
                ethInUSD={Number(Number(usd_price).toFixed(2))}
                ethAmount={Number(Number(calculated_fulfillment_amount).toFixed(2))}
                // community?: CommunityProps;
              />
              )
}
    </div>

     : <div>This user has no bounties</div>
  }
  if (loading) {
    return <LoadingIcon></LoadingIcon>
  }
  return <LoadingIcon></LoadingIcon>
}

export default Bounties