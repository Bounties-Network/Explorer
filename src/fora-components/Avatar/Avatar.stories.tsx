import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Avatar from ".";
import AvatarImage from "fora-components/AvatarImage";

addDecorator(centered);

storiesOf("Avatar", module)
  .add("AvatarImage without src", () => (
    <AvatarImage
      src={undefined}
      address="0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"
      variant="user"
    />
  ))
  .add("AvatarImage with src", () => (
    <AvatarImage
      src={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      variant="user"
    />
  ))
  .add("Small AvatarImage with src", () => (
    <AvatarImage
      variant="user"
      src={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      size="small"
    />
  ))
  .add("Large AvatarImage with src", () => (
    <AvatarImage
      variant="user"
      src={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      size="large"
    />
  ))
  .add("noName", () => (
    <Avatar
      screenName={undefined}
      name={undefined}
      variant={"medium"}
      resourceType={"user"}
      onDark={false}
    />
  ))
  .add("hasName", () => (
    <Avatar
      screenName={undefined}
      name={"firstName lastName"}
      variant={"medium"}
      resourceType={"user"}
      onDark={false}
    />
  ))
  .add("noName + address", () => (
    <Avatar
      screenName={undefined}
      name={undefined}
      address={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      variant={"medium"}
      resourceType={"user"}
      onDark={false}
    />
  ))
  .add("hasName + address", () => (
    <Avatar
      screenName={undefined}
      name={"firstname lastName"}
      address={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      variant={"medium"}
      resourceType={"user"}
      onDark={false}
    />
  ))
  .add("hasName + screenName", () => (
    <Avatar
      screenName={"helloWorld"}
      name={"firstname lastName"}
      address={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      variant={"medium"}
      resourceType={"user"}
      onDark={false}
    />
  ))
  .add("Small noName", () => (
    <Avatar
      screenName={undefined}
      name={undefined}
      variant={"small"}
      resourceType={"user"}
      onDark={false}
    />
  ))
  .add("Small hasName", () => (
    <Avatar
      screenName={undefined}
      name={"firstName lastName"}
      variant={"small"}
      resourceType={"user"}
      onDark={false}
    />
  ))
  .add("Small noName + address", () => (
    <Avatar
      screenName={undefined}
      name={undefined}
      address={"0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"}
      variant={"small"}
      resourceType={"user"}
      onDark={false}
    />
  ))
  .add("Small hasName + address", () => (
    <Avatar
      screenName={"screenName"}
      name={"firstname lastName"}
      variant={"small"}
      resourceType={"user"}
      onDark={false}
    />
  ));
