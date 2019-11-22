/** @jsx jsx */
import { jsx } from "theme-ui";
import { Fragment } from "react";
import {
  Modal as CModal,
  ModalOverlay as CModalOverlay,
  ModalContent as CModalContent,
  ModalHeader as CModalHeader,
  ModalFooter as CModalFooter,
  ModalBody as CModalBody,
  ModalCloseButton as CModalCloseButton
} from "@chakra-ui/core";
import theme from "theme/theme";
import Divider from "fora-components/Divider";

const Modal = props => (
  <CModal sx={{}} size={props.size || "xl"} {...props}></CModal>
);
const ModalOverlay = props => (
  <CModalOverlay
    sx={{ backgroundColor: "gray.500", opacity: 0.8 }}
    {...props}
  ></CModalOverlay>
);
const ModalContent = props => (
  <CModalContent
    sx={{
      borderRadius: 2,
      boxShadow: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      pt: "4rem"
    }}
    {...props}
  ></CModalContent>
);
const ModalHeader = props => (
  <CModalHeader
    sx={{ ...theme.text.h3, fontFamily: "primary", color: "black" }}
    {...props}
  ></CModalHeader>
);
const ModalFooter = props => (
  <Fragment>
    <Divider></Divider>
    <CModalFooter
      sx={{ pt: 0, pb: 3, pr: 3, pl: 0, ml: "auto" }}
      {...props}
    ></CModalFooter>
  </Fragment>
);
const ModalBody = props => (
  <CModalBody sx={{ pb: "4rem" }} {...props}></CModalBody>
);
const ModalCloseButton = props => (
  <CModalCloseButton
    sx={{ bg: "transparent", border: "none", cursor: "pointer" }}
    {...props}
  ></CModalCloseButton>
);

export {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
};
