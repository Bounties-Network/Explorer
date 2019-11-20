/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Header from ".";

addDecorator(centered);

storiesOf("Header", module).add("Mi Fora", () => {
  return (
    <div sx={{ minWidth: "70vw" }}>
      <Header
        avatar={{
          name: 'firstName lastName',
          screenName: 'screenName',
          address: '0xbfecfede',
          onDark: false,
          variant: 'medium',
          resourceType: 'user'
      }}
        handleSubmit={callback => {
          callback && setTimeout(callback, 2500);
        }}
      />
    </div>
  );
});
