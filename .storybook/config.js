require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"]
});

import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import { Global } from "@emotion/core";
import theme from "../src/theme/theme";
import globalStyles from "styles/global-styles";
import apolloClient from "lib/apollo-client";
import apolloConfig from '../apollo.config'
import "../src/styles/flexboxgrid.css";
import "../src/styles/index.scss";
import "../src/styles/Toastify.scss";
import "tippy.js/dist/tippy.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "react-toastify/dist/ReactToastify.css";

const stagingJWT = apolloConfig.client.service.headers.Authorization
addDecorator(story => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={apolloClient(false, stagingJWT)}>
      <React.Fragment>
        <Global style={globalStyles} />
        {story()}
      </React.Fragment>
    </ApolloProvider>
  </ThemeProvider>
));

configure(
  require.context("../src/fora-components", true, /\.stories\.(js|mdx|tsx)$/),
  module
);

configure(
  require.context("../src/fora-containers", true, /\.stories\.(js|mdx|tsx)$/),
  module
);
