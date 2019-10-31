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
    '> *:nth-of-type(2n)': { mb: 4 }
  })
);

const Container = emotionStyled(Flex)(() =>  css({ '> :first-of-type': { mb: 4 } }));
const Header = emotionStyled(Flex)(() =>  css({ '> :first-of-type': { mr: 'auto', textTransform: 'capitalize' } }));
const RatingReceivedHeader = emotionStyled(Flex)(props =>  css({ '> :first-of-type': { mr: 'auto' } }) );
const RatingReceivedText = emotionStyled(Text)<{ state: 'issuer' | 'fulfiller' }>(props =>  css({ color: props.state === 'issuer' ? 'rose200' : 'seaGlass300' }) );

interface IProps {
  averageRatingReceived: number;
  acceptanceRate: number;
  averageReceivedGivenRating: number;
}

const RatingBarContainer = emotionStyled(Flex)(props =>  css({ '> *:not(:last-of-type)': { mr: 1 } }) );
const SomeBar = emotionStyled('div')<{ fillMe: boolean, state: 'issuer' | 'fulfiller'}>(props =>  css({ backgroundColor: props.fillMe ? props.state ? 'rose200' : 'seaGlass300' : 'gray200', width: '40px', height: '4px', borderRadius: '10px' }) );
const RatingBar: React.FC<Pick<IProps, 'averageRatingReceived'> & { state: 'issuer' | 'fulfiller'}> = ({ averageRatingReceived, state }) => (
  <RatingBarContainer>
    {Array(5).fill('lol', 0, 5).map((_, index) => <SomeBar state={state} fillMe={index < averageRatingReceived}></SomeBar>)}
  </RatingBarContainer>
)

const RatingReceivedContent  = emotionStyled(Flex)(props =>  css({ '> :first-of-type':{ mb: 2 } }) );
const RatingReceivedContainer  = emotionStyled(Flex)(props =>  css({ '> :first-of-type':{ mb: 2 } }) );
const AverageRatingReceived: React.FC<Pick<IProps, 'averageRatingReceived'> & { state: 'issuer' | 'fulfiller' }> = ({ averageRatingReceived, state }) => (
  <RatingReceivedContainer flexDirection="column" >
    <RatingReceivedHeader alignItems='flex-end'>
      <RatingReceivedText variant="numeralMonospaceLarge" state={state}>{`${averageRatingReceived} / 5`}</RatingReceivedText>
      {/*TODO: <_< */}
      <Pill variant='pill.status.completed'>{'Reviews'}</Pill> 
    </RatingReceivedHeader>
    <RatingReceivedContent flexDirection="column">
      <RatingBar state={state} averageRatingReceived={averageRatingReceived}></RatingBar>
      <Text variant='label'>{`Avg ${state} rating received`}</Text>
    </RatingReceivedContent >
  </RatingReceivedContainer >
)
const AcceptanceRate: React.FC<Pick<IProps, 'acceptanceRate'>> = () => (<Flex></Flex>)
const AverageReceivedGivenRating: React.FC<Pick<IProps, 'averageReceivedGivenRating'>> = () => (<Flex></Flex>)


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
      <AverageReceivedGivenRating averageReceivedGivenRating={averageReceivedGivenRating}></AverageReceivedGivenRating>
    </CardContainer>
    </Container>
  )
};

export default IssuerFulfillerStatisticsCard;
