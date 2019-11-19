/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { Fragment } from "react";
import { Global } from "@emotion/core";
import css from "@styled-system/css";
import { Flex, Text, Link, Button } from "rebass";
import {
  faCheckCircle,
  faInfoCircle,
  faTimes,
  faExclamationCircle,
  faSpinner
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer as RTToastContainer } from "react-toastify";
import theme from "theme/theme";

interface IProps {
  content: React.ReactElement<any>;
}

const width = ["100%", 430];
const height = [100, 80];

interface IToastContainerProps {}
export const ToastContainer: React.FC<IToastContainerProps> = props => (
  <Fragment>
    <RTToastContainer toastClassName="Fora-toast--notification" />
    <Global
      styles={css({
        ".Fora-toast--notification": {
          padding: "0px !important",
          bg: "white",
          border: "base",
          boxShadow: 2,
          borderRadius: 2,
          width,
          ml: [0, ((width[1] as number) / 4) * -1],
          height
        }
      })}
    />
  </Fragment>
);

type NotificationType = "info" | "success" | "warning" | "error" | "loading";

interface IToastNotificationContentProps {
  action?: { name: string; href: string };
  title: string | React.ReactNode;
  detail?: string;
  type: NotificationType;
}

const typeIconStyle = { color: "seaGlass200", mr: [3, 4] };
export const ToastNotificationContent: React.FC<IToastNotificationContentProps> = props => (
  <Flex
    alignItems="center"
    flexDirection="row"
    sx={{ px: [3, 4], position: "relative" }}
  >
    {props.type === "info" && (
      <FontAwesomeIcon
        sx={typeIconStyle}
        size={"lg"}
        icon={faInfoCircle}
      ></FontAwesomeIcon>
    )}
    {props.type === "success" && (
      <FontAwesomeIcon
        sx={typeIconStyle}
        size={"lg"}
        icon={faCheckCircle}
      ></FontAwesomeIcon>
    )}
    {props.type === "loading" && (
      <FontAwesomeIcon
        sx={Object.assign(typeIconStyle, { color: "amber200" })}
        size={"lg"}
        icon={faSpinner}
      ></FontAwesomeIcon>
    )}
    {props.type === "error" && (
      <FontAwesomeIcon
        sx={Object.assign(typeIconStyle, { color: "rose200" })}
        size={"lg"}
        icon={faExclamationCircle}
      ></FontAwesomeIcon>
    )}
    <Flex flexDirection="column">
      <Text variant="bodyStrong" color="black">
        {props.title}
      </Text>
      <Text variant="body" color="gray400">
        {props.detail}
      </Text>
    </Flex>
    {props.action && (
      <Flex sx={{ ml: "auto", minWidth: [50, 80], justifyContent: "flex-end" }}>
        <Link href={props?.action?.href} variant="link">
          {props?.action?.name}
        </Link>
      </Flex>
    )}
    <FontAwesomeIcon
      sx={{
        color: "gray300",
        position: "absolute",
        top: "-16px",
        right: "0px"
      }}
      icon={faTimes}
    ></FontAwesomeIcon>
  </Flex>
);

const ToastNotification: React.FunctionComponent<IProps> = props => (
  <div>hello world</div>
);

export default ToastNotification;
