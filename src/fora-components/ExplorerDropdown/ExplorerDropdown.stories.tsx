/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { storiesOf } from "@storybook/react";
import ExplorerDropdown from ".";
import { faHome, faBox } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, Flex } from '@theme-ui/components'

const communities = [
  {
    id: 'code',
    src:
      'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
    name: 'code',
    memberCount: 1274
  },
  {
    id: 'yowza',
    src:
      'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
    name: 'yowza',
    memberCount: 1274
  },
  {
    id: 'save mi',
    src:
      'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
    name: 'save mi',
    memberCount: 1274
  }
];

const communityOptions = [
  { value: communities[0].id, label: communities[0].name, community: communities[0] },
  { value: communities[1].id, label: communities[1].name, community: communities[1] },
  { value: communities[2].id, label: communities[2].name, community: communities[2] },
]

const collectionOptions = [
  {
    value: "yourCommunities", label: 'Your Communities'
  },
  {
    value: "allBounties", label: 'All Bounties'
  },
]

const options = [
  { label: 'Bounty collections', options: collectionOptions },
  { label: 'From your communities', options: communityOptions }
];

storiesOf("ExplorerDropdown", module)
  .add("Mi Fora", () => {
    const [state, setState] = React.useState<{ value: string; label: string } | null>(null);

    return (
      <div sx={{ width: "500px", pt: 3, pl: 5 }}>
        <ExplorerDropdown
          value={state}
          handleChange={(option, action) => {
            console.log(action)
            setState(option)
          }}
          options={options}
          placeholder="Placeholder.."
        />
      </div>
    );
  })