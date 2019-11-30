import React from "react";
import moment from "moment";
import { Flex } from "rebass";
import ActivityItem from "../ActivityItem";

const ActivityFeed = () => (
  <Flex flexDirection="column">
    <ActivityItem
      activityType={"submission"}
      authorAddress={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      avatarSrc={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      authorName={"Mark Beylin"}
      bountyTitle={"This is some placeholder text for a long Bounty title... "}
      timestamp={moment()
        .subtract(4, "hours")
        .toISOString()}
      communityName={"frontend"}
      communityId={"123456789"}
    />

    <ActivityItem
      activityType={"commentPreview"}
      authorAddress={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      avatarSrc={undefined}
      authorName={undefined}
      bountyTitle={"This is some placeholder text for a long Bounty title... "}
      timestamp={moment()
        .subtract(4, "hours")
        .toISOString()}
      communityName={"frontend"}
      communityId={"123456789"}
    />

    <ActivityItem
      activityType={"bountyCreated"}
      bountyStatus={"active"}
      authorAddress={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      avatarSrc={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      authorName={"Corwin Harrell"}
      bountyTitle={"This is some placeholder text for a long Bounty title... "}
      submissionCount={2}
      bountyExpirationTimestamp={moment()
        .add(2, "days")
        .toISOString()}
      timestamp={moment()
        .subtract(4, "hours")
        .toISOString()}
      communityName={"frontend"}
      communityId={"123456789"}
    />

    <ActivityItem
      activityType={"leaderboardRank"}
      rankChangeAmount={12}
      authorAddress={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      avatarSrc={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      authorName={"Simona Pop"}
      timestamp={moment()
        .subtract(4, "hours")
        .toISOString()}
      communityName={"frontend"}
      communityId={"123456789"}
    />

    <ActivityItem
      activityType={"submissionAccepted"}
      bountyTitle={"This is some placeholder text for a long Bounty title... "}
      authorAddress={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      avatarSrc={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      authorName={"Michael M"}
      timestamp={moment()
        .subtract(4, "hours")
        .toISOString()}
      communityName={"frontend"}
      communityId={"123456789"}
    />

    <ActivityItem
      activityType={"contribution"}
      bountyTitle={"This is some placeholder text for a long Bounty title... "}
      authorAddress={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      avatarSrc={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      ethContributionAmount={0.05}
      authorName={"Michael M"}
      timestamp={moment()
        .subtract(4, "hours")
        .toISOString()}
      communityName={"frontend"}
      communityId={"123456789"}
    />

    <ActivityItem
      activityType={"deadlineExtension"}
      bountyStatus={"active"}
      bountyExtensionDate={1568553110000}
      authorAddress={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      avatarSrc={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      authorName={"Simone Popé"}
      bountyTitle={"This is some placeholder text for a long Bounty title... "}
      submissionCount={2}
      bountyExpirationTimestamp={moment()
        .add(2, "days")
        .toISOString()}
      timestamp={moment()
        .subtract(4, "hours")
        .toISOString()}
      communityName={"frontend"}
      communityId={"frontend"}
    />

    <ActivityItem
      activityType={"payoutIncrease"}
      bountyStatus={"active"}
      bountyPayoutIncreaseAmount={0.56}
      authorAddress={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      avatarSrc={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      authorName={"Simone Popé"}
      bountyTitle={"This is some placeholder text for a long Bounty title... "}
      submissionCount={2}
      bountyExpirationTimestamp={moment()
        .add(2, "days")
        .toISOString()}
      timestamp={moment()
        .subtract(4, "hours")
        .toISOString()}
      communityName={"frontend"}
      communityId={"frontend"}
    />
  </Flex>
);
export default ActivityFeed;
