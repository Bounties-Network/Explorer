import React from "react";
import { Card, Flex, Text, Link } from "@theme-ui/components";
import emotionStyled from "lib/emotion-styled";
import css from "@styled-system/css";
import SegmentedControl from "fora-components/SegmentedControl";
import Button from "fora-components/Button";

const CardContainer = emotionStyled(Card)(() =>
  css({
    display: 'flex',
    flexDirection: "column",
    "> *:not(:last-of-type)": { mb: 5 }
  })
);

const Container = emotionStyled(Flex)(() =>
  css({ flexDirection: "column", "> :first-of-type": { mb: 4 } })
);
const Header = emotionStyled(Flex)(() =>
  css({ alignItems: 'center', "> :first-of-type": { mr: "auto", textTransform: "capitalize" } })
);
const RatingReceivedHeader = emotionStyled(Flex)(() =>
  css({ width: '100%', alignItems: 'center', "> a:first-of-type": { ml: "auto" } })
);
const RatingReceivedText = emotionStyled(Text)<{
  state: "issuer" | "fulfiller";
}>(props =>
  css({
    variant: 'numeric',
    fontSize: '2xl',
    color: props.state === "issuer" ? "brandDestructive.200" : "brandPrimary.300",
  })
);

interface IProps {
  averageRatingGiven: number;
  averageReceivedGivenRating: number;
  issuerFulfillmentAcceptanceRate: number;
  fulfillmentAcceptanceRate: number;
}

const RatingBarContainer = emotionStyled(Flex)(() =>
  css({ "> *:not(:last-of-type)": { mr: 1 } })
);
const SomeBar = emotionStyled("div")<{
  fillMe: boolean;
  state: "issuer" | "fulfiller";
  resourceType?: "given";
}>(props => {
  let backgroundColor = "brandGray.200";
  if (props.fillMe) {
    if (props.resourceType === "given") {
      backgroundColor = props.state === "issuer" ? "brandTertiary.200" : "brandDestructive.200";
    } else {
      backgroundColor = props.state === "issuer" ? "brandDestructive.200" : "brandPrimary.300";
    }
  }

  return css({
    backgroundColor,
    width: "40px",
    height: "4px",
    borderRadius: "10px"
  });
});
const RatingBar: React.FC<Pick<IProps, "averageRatingGiven"> & {
  state: "issuer" | "fulfiller";
  resourceType?: "given";
}> = ({ averageRatingGiven, state, resourceType }) => (
  <RatingBarContainer>
    {Array(5)
      .fill("lol", 0, 5)
      .map((_, index) => (
        <SomeBar
          resourceType={resourceType}
          state={state}
          fillMe={index < averageRatingGiven}
        ></SomeBar>
      ))}
  </RatingBarContainer>
);

const RatingReceivedContent = emotionStyled(Flex)(() =>
  css({ flexDirection: "column", "> :first-of-type": { mb: 2 } })
);
const RatingReceivedContainer = emotionStyled(Flex)(() =>
  css({
    width: '100%',
    flexDirection: "column",
    "> :first-of-type": { mb: 2 }
  })
);
const AverageRatingReceived: React.FC<Pick<IProps, "averageRatingGiven"> & {
  state: "issuer" | "fulfiller";
}> = ({ averageRatingGiven, state }) => (
  <RatingReceivedContainer>
    <RatingReceivedHeader>
      <RatingReceivedText
        variant="numeric"
        state={state}
      >{`${averageRatingGiven} / 5`}</RatingReceivedText>
      <Link href={'/reviews'}>
        <Button onClick={() => {}} size="small" variant="secondary" label={'Reviews'}></Button>
      </Link>
    </RatingReceivedHeader>
    <RatingReceivedContent>
      <RatingBar
        state={state}
        averageRatingGiven={averageRatingGiven}
      ></RatingBar>
      <Text variant="label"  color='brandGray.400'>{`Avg ${state} rating ${state === 'issuer' ? 'given' : 'received'}`}</Text>
    </RatingReceivedContent>
  </RatingReceivedContainer>
);

const AcceptanceRateBar = emotionStyled("div")(() =>
  css({ backgroundColor: "brandGray.200", height: "4px", borderRadius: 1 })
);
const ProgressBar = emotionStyled("div")<{ acceptanceRate: number }>(props =>
  css({
    backgroundColor: "brandGray.300",
    width: `${props.acceptanceRate}%`,
    height: "4px",
    borderRadius: 1
  })
);
const AcceptanceRateContainer = emotionStyled(Flex)(() =>
  css({ flexDirection: 'column' ,"> :first-of-type": { mb: 2 }, "> :nth-of-type(2)": { mb: 1 } })
);
const AcceptanceRate: React.FC<{ acceptanceRate: number, state: "issuer" | "fulfiller" }> = ({
  acceptanceRate,
  state
}) => (
  <AcceptanceRateContainer>
    <RatingReceivedText
      color="brandPrimary.300"
      variant="numeric"
    >
      {`${acceptanceRate}%`}
    </RatingReceivedText>
    <AcceptanceRateBar>
      <ProgressBar acceptanceRate={acceptanceRate}></ProgressBar>
    </AcceptanceRateBar>
    <Text variant="label" color='brandGray.400'>{`${state === 'issuer' ? "Fulfillment" : "Submission" } acceptance rate`}</Text>
  </AcceptanceRateContainer>
);

const IssuerFulfillerStatisticsCard: React.FC<IProps> = ({
  averageRatingGiven,
  averageReceivedGivenRating,
  issuerFulfillmentAcceptanceRate,
  fulfillmentAcceptanceRate
}) => {
  const [state, setState] = React.useState<"issuer" | "fulfiller">("issuer");

  return (
    <Container>
      <Header>
        <Text variant="headingSans">{`${state} stats`}</Text>
        <SegmentedControl
          firstOption={"Issuer"}
          firstOptionHandleClick={() => setState("issuer")}
          secondOption={"Fulfiller"}
          secondOptionHandleClick={() => setState("fulfiller")}
        />
      </Header>
      <CardContainer>
        <AverageRatingReceived
          state={state}
          averageRatingGiven={state === 'issuer' ? averageRatingGiven : averageReceivedGivenRating }
        ></AverageRatingReceived>
        <AcceptanceRate state={state} acceptanceRate={state === 'issuer' ? issuerFulfillmentAcceptanceRate : fulfillmentAcceptanceRate}></AcceptanceRate>
      </CardContainer>
    </Container>
  );
};

export default IssuerFulfillerStatisticsCard;
