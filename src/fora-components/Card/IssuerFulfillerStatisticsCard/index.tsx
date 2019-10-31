import React from 'react';
import { Card, Flex, Text } from 'rebass';
import emotionStyled from 'lib/emotion-styled';
import css from '@styled-system/css';
import SegmentedControl from 'fora-components/SegmentedControl';
import Pill from 'fora-components/Pill';

const CardContainer = emotionStyled(Card)(() =>
  css({
    flexDirection: 'column',
    variant: 'card',
    '> *:not(:last-of-type)': { mb: 5 }
  })
);

const Container = emotionStyled(Flex)(() => css({ '> :first-of-type': { mb: 4 } }));
const Header = emotionStyled(Flex)(() => css({ '> :first-of-type': { mr: 'auto', textTransform: 'capitalize' } }));
const RatingReceivedHeader = emotionStyled(Flex)(props => css({ '> :first-of-type': { mr: 'auto' } }));
const RatingReceivedText = emotionStyled(Text)<{ state: 'issuer' | 'fulfiller' }>(props => css({ color: props.state === 'issuer' ? 'rose200' : 'seaGlass300' }));

interface IProps {
  averageRatingReceived: number;
  acceptanceRate: number;
  averageReceivedGivenRating: number;
}

const RatingBarContainer = emotionStyled(Flex)(props => css({ '> *:not(:last-of-type)': { mr: 1 } }));
const SomeBar = emotionStyled('div')<{ fillMe: boolean, state: 'issuer' | 'fulfiller', resourceType?: 'given' }>(props => {
  let backgroundColor = 'gray200'
  if (props.fillMe) {
    if (props.resourceType === 'given') {
      backgroundColor = props.state === 'issuer' ? 'amber200' : 'rose200'
    } else {
      backgroundColor = props.state === 'issuer' ? 'rose200' : 'seaGlass300'
    }
  }

  return css({
    backgroundColor,
    width: '40px', height: '4px', borderRadius: '10px'
  })
});
const RatingBar: React.FC<Pick<IProps, 'averageRatingReceived'> & { state: 'issuer' | 'fulfiller', resourceType?: 'given' }> = ({ averageRatingReceived, state, resourceType }) => (
  <RatingBarContainer>
    {Array(5).fill('lol', 0, 5).map((_, index) => <SomeBar resourceType={resourceType} state={state} fillMe={index < averageRatingReceived}></SomeBar>)}
  </RatingBarContainer>
)

const RatingReceivedContent = emotionStyled(Flex)(props => css({ '> :first-of-type': { mb: 2 } }));
const RatingReceivedContainer = emotionStyled(Flex)(props => css({ '> :first-of-type': { mb: 2 } }));
const AverageRatingReceived: React.FC<Pick<IProps, 'averageRatingReceived'> & { state: 'issuer' | 'fulfiller' }> = ({ averageRatingReceived, state }) => (
  <RatingReceivedContainer flexDirection="column" >
    <RatingReceivedHeader alignItems='flex-end'>
      <RatingReceivedText variant="numeralMonospaceLarge" state={state}>{`${averageRatingReceived} / 5`}</RatingReceivedText>
      <Pill variant='pill.status.completed'>{'Reviews'}</Pill>
    </RatingReceivedHeader>
    <RatingReceivedContent flexDirection="column">
      <RatingBar state={state} averageRatingReceived={averageRatingReceived}></RatingBar>
      <Text variant='label'>{`Avg ${state} rating received`}</Text>
    </RatingReceivedContent >
  </RatingReceivedContainer >
)

const AcceptanceRateBar = emotionStyled('div')(props => css({ backgroundColor: 'gray200', height: '4px', borderRadius: 1 }));
const ProgressBar = emotionStyled('div')<{ acceptanceRate: number }>(props =>
  css({
    backgroundColor: 'seaGlass300', width: `${props.acceptanceRate}%`,
    height: '4px', borderRadius: 1
  })
)
const AcceptanceRateContainer = emotionStyled(Flex)(props => css({ '> :first-of-type': { mb: 2 }, '> :nth-of-type(2)': { mb: 1 } }));
const AcceptanceRate: React.FC<Pick<IProps, 'acceptanceRate'>> = ({ acceptanceRate }) => (
  <AcceptanceRateContainer flexDirection="column">
    <Text color='seaGlass300' variant='numeralMonospaceLarge'>{`${acceptanceRate}%`}</Text>
    <AcceptanceRateBar>
      <ProgressBar acceptanceRate={acceptanceRate}></ProgressBar>
    </AcceptanceRateBar>
    <Text variant='label'>{'Submission acceptance rate'}</Text>
  </AcceptanceRateContainer >)

const AverageReceivedGivenRatingContainer = RatingReceivedContainer
const AverageReceivedGivenRatingHeader = RatingReceivedHeader
const AverageReceivedGivenRatingText = emotionStyled(RatingReceivedText)(props => css({ color: props.state === 'issuer' ? 'amber200' : 'rose200'  }))
const AverageReceivedGivenRatingContent = RatingReceivedContent

const AverageReceivedGivenRating: React.FC<{
  averageReceivedGivenRating: IProps['averageReceivedGivenRating']
  state: 'issuer' | 'fulfiller'
}> = ({ averageReceivedGivenRating, state }) => (
  <AverageReceivedGivenRatingContainer flexDirection="column">
    <AverageReceivedGivenRatingHeader alignItems='flex-end'>
      <AverageReceivedGivenRatingText variant="numeralMonospaceLarge" state={state}>{`${averageReceivedGivenRating} / 5`}</AverageReceivedGivenRatingText>
    </AverageReceivedGivenRatingHeader>
    <AverageReceivedGivenRatingContent flexDirection="column">
      <RatingBar resourceType={'given'} state={state} averageRatingReceived={averageReceivedGivenRating}></RatingBar>
      <Text variant='label'>{state === 'issuer' ? `Avg rating given to fulfillers` : `Avg rating given to issuers`}</Text>
    </AverageReceivedGivenRatingContent>
  </AverageReceivedGivenRatingContainer >)


const IssuerFulfillerStatisticsCard: React.FC<IProps> = ({
  averageRatingReceived,
  acceptanceRate,
  averageReceivedGivenRating
}) => {
  const [state, setState] = React.useState<'issuer' | 'fulfiller'>('issuer')

  return (
    <Container flexDirection="column">
      <Header>
        <Text variant='h3'>{`${state} stats`}</Text>
        <SegmentedControl
          firstOption={"Issuer"}
          firstOptionHandleClick={() => setState('issuer')}
          secondOption={"Fulfiller"}
          secondOptionHandleClick={() => setState('fulfiller')}
        />
      </Header>
      <CardContainer>
        <AverageRatingReceived state={state} averageRatingReceived={averageRatingReceived}></AverageRatingReceived>
        <AcceptanceRate acceptanceRate={acceptanceRate}></AcceptanceRate>
        <AverageReceivedGivenRating state={state} averageReceivedGivenRating={averageReceivedGivenRating}></AverageReceivedGivenRating>
      </CardContainer>
    </Container>
  )
};

export default IssuerFulfillerStatisticsCard;
