/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Flex, Text, Link } from "@theme-ui/components";
import IssuerFulfillerStatisticsCard from 'fora-components/Card/IssuerFulfillerStatisticsCard';
import Divider from 'fora-components/Divider';
import { Community } from 'fora-components/TopCommunities';

interface IProps {  }

const CommunityMemberOf = () => (
  <Flex sx={{ flexDirection: "column", '> a:not(:last-of-type)': { mb: 2 } }}>
    <Text variant='bodyStrong'>Member of</Text>
    <Divider></Divider>
    <Community
      src={'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'}
      name={'code'}
      id={'1234567890'}
      memberCount={1274}
      isOption={false}
    />
    <Community
      src={'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'}
      name={'code'}
      id={'1234567890'}
      memberCount={1274}
      isOption={false}
    />
    <Community
      src={'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'}
      name={'code'}
      id={'1234567890'}
      memberCount={1274}
      isOption={false}
    />
    <Community
      src={'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'}
      name={'code'}
      id={'1234567890'}
      memberCount={1274}
      isOption={false}
    />
  </Flex>
)

const Stats: React.FunctionComponent<IProps> = (props) => (
  <Flex sx={{ flexDirection: "column", pt: 2, '> div:first-of-type': { mb: 5 } }}>
    <IssuerFulfillerStatisticsCard
      averageRatingReceived={2}
      acceptanceRate={85}
      averageReceivedGivenRating={3}
    />
    <CommunityMemberOf></CommunityMemberOf>
  </Flex>
)

export default Stats