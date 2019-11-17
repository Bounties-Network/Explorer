/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { Fragment } from "react";
import { Global } from "@emotion/core";
import css from "@styled-system/css";
import theme from "theme";
import { Flex, Text, Link, Button } from "rebass";
import { faInfoCircle, faTimes, faExclamationCircle, faRampLoading } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer as RTToastContainer } from "react-toastify";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";

interface IProps {
  content: React.ReactElement<any>;
}

const width = 430
const height = 80

interface IToastContainerProps {  }
export const ToastContainer: React.FC<IToastContainerProps> = (props) => (
  <Fragment>
    <RTToastContainer  toastClassName='Fora-toast--notification' />
    <Global
      styles={css({
        ".Fora-toast--notification": { bg: "white", border: "base", boxShadow: 2, borderRadius: 2, width, marginLeft: (width / 4) * -1, height },
      })}
    />
  </Fragment>
)

type NotificationType = "info" | "success" | "warning" | "error" | 'loading'

interface IToastNotificationContentProps {
  action?: { name: string; href: string };
  title: string | React.ReactNode;
  detail?: string;
  type: NotificationType;
}

const typeIconStyle = { color: "seaGlass200", mr: 3 }
export const ToastNotificationContent: React.FC<IToastNotificationContentProps> = props => (
    <Flex alignItems="center" flexDirection="row" sx={{ px: 2, position: 'relative' }}>
      {props.type === "info" && <FontAwesomeIcon sx={typeIconStyle} size={'lg'} icon={faInfoCircle}></FontAwesomeIcon>}
      {props.type === "success" && <FontAwesomeIcon sx={typeIconStyle} size={'lg'} icon={faCheckCircle}></FontAwesomeIcon>}
      {props.type === "loading" && <FontAwesomeIcon sx={typeIconStyle} size={'lg'} icon={faRampLoading}></FontAwesomeIcon>}
      {props.type === "error" && <FontAwesomeIcon sx={typeIconStyle} size={'lg'} icon={faExclamationCircle}></FontAwesomeIcon>}
      <Flex flexDirection="column">
        <Text variant="bodyStrong" color="black">
          {props.title}
        </Text>
        <Text variant="body" color="gray400">
          {props.detail}
        </Text>
      </Flex>
      <Flex sx={{ ml: 'auto', minWidth: '80px', justifyContent: 'flex-end' }}>
        <Link href={props?.action?.href} variant="link">
          {props?.action?.name}
        </Link>
      </Flex>
    <FontAwesomeIcon sx={{
      color: 'gray300',
      position: 'absolute',
      top: "-16px",
      right: '-8px'
}} icon={faTimes}></FontAwesomeIcon>
    </Flex>
);

const ToastNotification: React.FunctionComponent<IProps> = props => <div>hello world</div>;

export default ToastNotification;
