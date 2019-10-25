import React from 'react'
import moment from "moment";
import emotionStyled from "./emotion-styled";
import css from "@styled-system/css";
import { Text, Flex } from "rebass";

const MetaDetail = emotionStyled(Flex)(props => css({ "> :first-of-type": { mr: 1 }, textAlign: "center" }));

const formatExpiration = (expirationTimestamp: any) => {
  return moment(expirationTimestamp).isSameOrAfter(Date.now()) ? (
    <MetaDetail>
      <Text variant="bodyStrong">{moment(expirationTimestamp).fromNow(true)}</Text>
      <Text variant="bodyStrong" color="gray300">
        remaining
      </Text>
    </MetaDetail>
  ) : (
    <MetaDetail>
    <Text variant="bodyStrong">Expired</Text>
    <Text variant="bodyStrong" color="gray300">
      {moment(expirationTimestamp).fromNow(false)}
    </Text>
  </MetaDetail>
  );
};

export default formatExpiration;
