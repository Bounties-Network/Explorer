/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { Fragment } from "react";
import { Flex, Text, Image } from "@theme-ui/components";
import Divider from "fora-components/Divider";
import moment from "moment";
import { faReply } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentForm from "fora-components/Form/CommentForm";
import Attachment, { IAttachmentProps } from "../Attachment";

export interface IMainProps {
  timestamp: any;
  content: string;
  imageSrc?: string;
  commentSubmitHandler: any;
  setShowComments: any;
  attachments: IAttachmentProps[];
  userImg: string | undefined
  address: string | undefined
}

const Main: React.FunctionComponent<IMainProps> = props => {
  const [state, setState] = React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>("")

  return (
    <Flex sx={{ "> form": { mt: 3 }, flexDirection: "column" }}>
      <Flex sx={{ flexDirection: 'column', "> :not(:last-of-type)": { mb: 3 } }}>
        <Text color="brandGray.500" variant="body">
          <div
            dangerouslySetInnerHTML={{
              __html: props.content
            }}
          >
          </div>
        </Text>
        {typeof props.imageSrc === "string" && <Image sx={{ height: 'auto', width: '100%', display: 'block' }} src={props.imageSrc} alt="image"></Image>}
        {/* Maintain aspect ratio? */}
        {Array.isArray(props.attachments) && (
          <Flex sx={{ "> :not(:last-of-type)": { mr: 2 } }}>{props.attachments.map(Attachment)}</Flex>
        )}

        <Flex sx={{ "> :not(:last-of-type)": { mr: 2 } }}>
          <Text variant="small" color="brandGray.400">
            {moment(props.timestamp).fromNow()}
          </Text>
          <Text variant="small" color="brandGray.500">
            ∙
          </Text>
          <Flex onClick={() => setState(!state)} alignItems={"center"} sx={{ "> *": { mr: 2 }, cursor: "pointer" }}>
            <FontAwesomeIcon icon={faReply} sx={{ color: "brandPrimary.200" }}></FontAwesomeIcon>
            <Text variant="body" color="brandPrimary.200">
              Comment
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {state && (
        <Fragment>
          <Divider></Divider>
          <CommentForm
            setShowComments={props.setShowComments}
            userImg={props.userImg}
            address={props.address}
            value={comment}
            handleChange={(comment: string) => {
              setComment(comment)
            }}
            handleCancel={() => setState(false)}
            handleSubmit={props.commentSubmitHandler}
          />
        </Fragment>
      )}
      <Divider></Divider>
    </Flex>
  );
};

export default Main;
