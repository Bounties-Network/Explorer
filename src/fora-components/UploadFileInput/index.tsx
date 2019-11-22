/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex } from "rebass";
import theme from "theme/theme";
import UploadButton from "fora-components/UploadButton";
import { DashboardModal } from "@uppy/react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import ipfs from "public-modules/ipfs";

const uppyConfig = {
  debug: true,
  autoProceed: true,
  allowMultipleUploads: false,
  restrictions: {
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1
    // maxFileSize: '' // TODO: Determine this max file size value
  }
};
const uppy = Uppy(uppyConfig);

const uploadInputStyle: any = ipfsFileState => ({
  height: "48px",
  width: "230px",
  border: "base",
  borderTopLeftRadius: 2,
  borderBottomLeftRadius: 2,
  bg: "gray.100",
  color: "black",
  "::placeholder": { color: "gray.400" },
  "&:focus": { border: "focus", outline: "none" },
  ...theme.text.body,
  fontFamily: "secondary",
  pr: Boolean(ipfsFileState) && 6,
  pl: 3
});

type UploadFileInputProps = {
  value: any;
  onChange: any;
};

const UploadFileInput: React.FunctionComponent<UploadFileInputProps> = props => {
  const [state, setState] = React.useState<boolean>(false);
  const [ipfsFileState, setIpfsFileState] = React.useState<{
    Hash: string;
    Name: string;
    size: string;
  } | null>(null);

  React.useEffect(() => {
    uppy
      .use(XHRUpload, {
        endpoint: `${ipfs.apiPinURL}`,
        formData: true,
        metaFields: []
      })
      .on("upload-success", (file, { body }) => {
        console.log(file);
        console.log(body);
        setIpfsFileState(body);
        if (props.onChange) {
          props.onChange(ipfs.apiViewURL + body.Hash);
        }
        uppy.reset();
        setState(false);
      });
    return () => {
      uppy.close();
    };
  }, []);

  return (
    <Flex flexDirection="column" sx={{ position: "relative" }}>
      <DashboardModal
        disablePageScrollWhenModalOpen={true}
        closeAfterFinish={true}
        closeModalOnClickOutside={true}
        onRequestClose={() => setState(false)}
        open={state}
        uppy={uppy}
      />
      <Flex sx={{}}>
        <Flex alignItems={"center"} sx={uploadInputStyle(ipfsFileState)}>
          {ipfsFileState?.Name}
          {/* {WOWOW first use of optional chaining} */}
        </Flex>
        {Boolean(ipfsFileState) && (
          <div
            onClick={() => {
              setIpfsFileState(null);
              if (props.onChange) {
                props.onChange(null);
              }
            }}
            sx={{
              position: "absolute",
              right: "120px",
              top: "16px",
              cursor: "pointer",
              color: "rose.200"
            }}
          >
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </div>
        )}
        <UploadButton onClick={() => setState(!state)}></UploadButton>
      </Flex>
    </Flex>
  );
};

export default UploadFileInput;
