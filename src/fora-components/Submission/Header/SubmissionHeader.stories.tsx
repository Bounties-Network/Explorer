/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Header from ".";

addDecorator(centered);

storiesOf("SubmissionHeader", module).add("Mi Fora", () => {
  return (
    <div sx={{ minWidth: "70vw" }}>
      <Header
        avatar={{
          name: 'firstName lastName',
          screenName: 'screenName',
          address: '0xbfecfede',
          img: 'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
          src: 'https://www.google.co.uk',
          onDark: false,
          variant: 'medium',
          resourceType: 'user'
      }}
        handleSubmit={callback => {
          callback && setTimeout(callback, 2000);
        }}
      />
    </div>
  );
});
