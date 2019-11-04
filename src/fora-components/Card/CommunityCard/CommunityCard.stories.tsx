import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import CommunityCard from "./index";
import mockAvatarGroupData from "fora-components/AvatarGroup/mock-avatar-group-data";

addDecorator(centered);

storiesOf("CommunityCard", module)
  .add("Mi Fora", () => (
    <CommunityCard
      goToExplorerRoute={() => alert('clicked go to explorer')}
      goToJoinRoute={() => alert('clicked go to join')}
      activeBounties={24}
      name={'Code'}
      description={`Get rewarded for contributing code. Find, contribute and get rewarded in crypto for completing bounties, and help us grow open-source.`}
      avatars={mockAvatarGroupData}
      href={'https://www.google.co.uk'}
      avatarSrc={'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'}
    />
  ))
  // .add("Small", () => (
  //     <CommunityCard

  //     />
  // ))