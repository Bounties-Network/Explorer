/** @jsx jsx */
import { jsx } from 'theme-ui'
import PlatformStatisticsCard from "fora-components/Card/PlatformStatisticsCard";
import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import gql from 'graphql-tag';
import LoadingIcon from 'assets/loading';
import { platformStatistics } from './__generated__/platformStatistics';

interface IProps {
  resourceType: 'platform' | 'communities' // platform || community
}

const platformStatisticsQuery = gql`
  query platformStatistics {
    activePlatformBountiesQuery:std_bounties_bounty_aggregate(where: { bounty_stage:  { _in:  [1]} }) {
      aggregate {
        count
      }
    }
    issuedPlatformBountiesQuery:std_bounties_bounty_aggregate(where: { bounty_stage:  { _nin:  [0]} }) {
      aggregate {
        count
      }
    }
    totalValueBountiesIssuedQuery:std_bounties_bounty_aggregate(where: { bounty_stage:  { _nin:  [0]} }) {
      aggregate {
        sum {
          usd_price
        }
      }
    }
  }
`

const PlatformStatisticsContainer: React.FunctionComponent<IProps> = ({ resourceType }) => {
  const { data, loading, error } = useQuery<platformStatistics>(platformStatisticsQuery)
  // console.log(data)
  const activePlatformBounties = Number(data?.activePlatformBountiesQuery?.aggregate?.count)
  const issuedPlatformBounties = Number(data?.issuedPlatformBountiesQuery?.aggregate?.count)
  let totalValueBountiesIssued: number = data?.totalValueBountiesIssuedQuery?.aggregate?.sum?.usd_price

  if (error) {
    error && console.error(error)
    return <div>{JSON.stringify(error, null)}</div>
  }

  if (!loading && !error && totalValueBountiesIssued) {
    return (
      <PlatformStatisticsCard
        resourceType={resourceType}
        activePlatformBounties={activePlatformBounties}
        platformBountiesIssued={issuedPlatformBounties}
        totalBountyIssuedValueInUSD={Number(totalValueBountiesIssued.toFixed(2)) || 0}
      />
    )
  }
  return <LoadingIcon></LoadingIcon>
}

export default PlatformStatisticsContainer