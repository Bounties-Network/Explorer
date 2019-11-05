import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import SingleComment, { Commenter } from "./index";
import moment from "moment";

addDecorator(centered);

const mockCommenter: Commenter = {
  name: "firstName lastName",
  screenName: "screenName",
  address: "0xbfecfede",
  src: undefined,
  onDark: false
};

storiesOf("SingleComment", module)
  .add("Parent", () => (
    <SingleComment
      isReply={false}
      content={
        "This is a bounty comment. I’m just a person commenting on a bounty. Very exciting I know. What a time to be alive."
      }
      timestamp={moment().subtract("5", "hours")}
      commenter={mockCommenter}
    />
  ))
  .add("Reply", () => (
    <SingleComment
      isReply={true}
      content={
        "This is a bounty comment. I’m just a person commenting on a bounty. Very exciting I know. What a time to be alive."
      }
      timestamp={moment().subtract("5", "hours")}
      commenter={mockCommenter}
    />
  ))
  .add("Preview", () => (
    <SingleComment
      isPreview={true}
      isReply={true}
      content={
        "This is a bounty comment. I’m just a person commenting on a bounty. Very exciting I know. What a time to be alive."
      }
      timestamp={moment().subtract("5", "hours")}
      commenter={mockCommenter}
    />
  ));
