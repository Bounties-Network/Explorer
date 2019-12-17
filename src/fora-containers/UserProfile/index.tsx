/** @jsx jsx */
import { jsx } from "theme-ui";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Flex, Text, Link } from "@theme-ui/components";
import gql from "graphql-tag";
import LoadingIcon from "assets/loading";
import AvatarImage from "fora-components/AvatarImage";
import Pill from "fora-components/Pill";
import { shortenAddress } from "utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faComments, faGlobe } from "@fortawesome/pro-regular-svg-icons";
import Profile from './Profile/index'
import Content from './Content/index'
import Stats from './Stats/index'

// const query = gql`

// `;

const mobileLayoutGrid = `
  "background"
  "profile"
  "content"
  "stats"
`;

const desktopLayoutGrid = `
  "background background background"
  "profile content stats"
`;

const gridLayoutStyle = {
  display: "grid",
  gridGap: 4,
  gridTemplateAreas: [mobileLayoutGrid, desktopLayoutGrid],
  gridTemplateColumns: [
    "auto", // default to a stacked layout on small screens
    "1fr 2fr 1fr", // use columns for larger screens
  ],
};

const UserProfileContainer: React.FC = props => {
  return (
    <div sx={gridLayoutStyle}>
      <div
        sx={{
          gridArea: "background",
          height: "236px",
          background: `url("https://assets.bounties.network/staging/fora-mock-background-image.png") no-repeat center center fixed`,
          backgroundSize: "cover"
        }}
      />
        <div sx={{ gridArea: "profile", px: 4, pl: [4, 7] }}>
          <Profile></Profile>
        </div>
        <div sx={{ gridArea: "content", px: [4, 0] }}>
          <Content></Content>
        </div>
        <div sx={{ gridArea: "stats", px: 4, pr: [4, 7] }}>
          <Stats></Stats>
        </div>
    </div>
  );
  // // const { data, loading, error } = useQuery(query)

  // if (data) {
  //   return (<div>Hello world</div>)
  // }
  // if (error) {
  //   error && console.error(error);
  //   return (
  //     <div>
  //       {JSON.stringify(error, null)}
  //     </div>
  //   );
  // }

  // return <LoadingIcon></LoadingIcon>;
};
export default UserProfileContainer;
