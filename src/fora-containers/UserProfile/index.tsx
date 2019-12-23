/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import Profile from './Profile/index'
import Content from './Content/index'
import Stats from './Stats/index'

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

type IProps = {
  address: string
}
const UserProfileContainer: React.FC<IProps> = props => {
  const { address } = props
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
          <Profile address={address}></Profile>
        </div>
        <div sx={{ gridArea: "content", px: [4, 0] }}>
          <Content address={address}></Content>
        </div>
        <div sx={{ gridArea: "stats", px: 4, pr: [4, 7] }}>
          <Stats address={address}></Stats>
        </div>
    </div>
  );
};
export default UserProfileContainer;
