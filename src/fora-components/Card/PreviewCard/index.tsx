import React from 'react';
import emotionStyled from 'lib/emotion-styled';
import { Flex, Card, Text, Box, Link } from 'rebass';
import css from '@styled-system/css';
import Pill from 'fora-components/Pill';
import FormatExpiration from 'lib/format-expiration';

const CardContainer = emotionStyled(Card)(() =>
  css({ variant: 'card', position: 'relative', py: 3, px: 3 })
);
const Description = emotionStyled(Box)(() =>
  css({
    '> *': { display: 'inline-block', textAlign: 'left' },
    '> *:nth-child(2)': { mx: 1 }
  })
);
const Content = emotionStyled(Flex)(() => css({ '> :first-child': { mr: 5 } }));

type PreviewCardProps = {
  href: string
  title: string
  expirationTimestamp: any
  submissionCount: number
  status: string
  ethInUSD: number
  ethAmount: number
}
const PreviewCard: React.FC<PreviewCardProps> = ({
  href,
  title,
  expirationTimestamp,
  submissionCount,
  status,
  ethInUSD,
  ethAmount
}) => (
  <CardContainer>
    <Pill
      css={css(theme => ({
        position: 'absolute',
        left: theme.space[3],
        top: '-10px'
      }))}
      variant={`pill.status.${status}`}
      resourceType={status}
    />
    <Content>
      <Flex flexDirection="column">
        <Link href={href} variant="link">{title}</Link>
        <Description>
          <Text variant="small" color="gray400">
            <FormatExpiration variant='preview' expirationTimestamp={expirationTimestamp}></FormatExpiration>
          </Text>
          <Text variant="small" color="gray400">
            •
          </Text>
          <Text
            variant="small"
            color="gray400"
          >{`${submissionCount} submissions`}</Text>
        </Description>
      </Flex>
      <Flex flexDirection="column">
        <Text fontFamily="secondary" variant="h5">{`$${ethInUSD}`}</Text>
        <Text
          fontFamily="secondary"
          variant="label"
          color="gray400"
        >{`${ethAmount} ETH`}</Text>
      </Flex>
    </Content>
  </CardContainer>
);
export default PreviewCard;
