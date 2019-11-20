/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Link, Image, Box } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkSquare, faFileArchive } from "@fortawesome/pro-regular-svg-icons";
import ipfs from "public-modules/ipfs";

export interface IAttachmentProps {
  ipfsHash?: string;
  fileName?: string;
  fileExtensionType?: string;
  url?: string;
}

function isImageExtension(filename: string) {
  return /\.(gif|jpg|jpeg|tiff|png)$/i.test(filename);
}

function shortenURL(url: string): string {
  const shortUrl = url.replace(/(^\w+:|^)\/\//, "").replace(/^www./, "");

  if (shortUrl.length > 25) {
    return shortUrl.slice(0, 10) + "..." + url.slice(-6);
  }

  return shortUrl;
}

function shortenFileName(fileName: string, maxLength: number = 10): string {
  if (fileName.length > maxLength) {
    return fileName.slice(0, maxLength) + "...";
  }

  return fileName;
}

const attachmentStyles = {
  width: "94px",
  height: "96px",
  border: "base",
  boxSizing: "border-box",
  "&:hover": { bg: "seaGlass100", "> *, > * > *": { color: "seaGlass500" } }
};
const imageStyles = props => ({
  ...attachmentStyles,
  ":hover": { bg: "unset", "> *, > * > *": { color: "unset" } },
  background: `url(${ipfs.apiViewURL}${props.ipfsHash}) no-repeat center`,
  backgroundSize: "cover",
});
const iconStyles = { height: "2.5rem", width: "1.25rem !important", color: "gray400" };

const Attachment: React.FunctionComponent<IAttachmentProps> = props => (
  <Flex flexDirection="column" justifyContent={"center"} alignItems="center" sx={attachmentStyles}>
    {props.url && (
      <Link sx={{ textAlign: "center" }} href={props.url}>
        <FontAwesomeIcon icon={faExternalLinkSquare} sx={iconStyles} />
        <Text color="gray400" variant="small">
          {shortenURL(props.url)}
        </Text>
      </Link>
    )}
    {props.fileExtensionType && props.fileName && !isImageExtension(props.fileExtensionType) && (
      <Link sx={{ textAlign: "center" }} href={`${ipfs.apiViewURL}${props.ipfsHash}`}>
        <FontAwesomeIcon icon={faFileArchive} sx={iconStyles} />
        <Text color="gray400" variant="small">
          {shortenFileName(props.fileName)}
        </Text>
      </Link>
    )}
    {props.fileExtensionType && isImageExtension(props.fileExtensionType) && (
      <Link sx={{ textAlign: "center" }} href={`${ipfs.apiViewURL}${props.ipfsHash}`}>
        {/* backgroundSize: cover vs native img tag */}
        <Box sx={imageStyles(props)}></Box>
      </Link>
    )}
  </Flex>
);

export default Attachment;
