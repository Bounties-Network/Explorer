/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Button, Text, Image } from "rebass";
import Avatar, { AvatarProps } from "fora-components/Avatar";
import Divider from "fora-components/Divider";
import Pill from "fora-components/Pill";
import moment from "moment";
import { faReply } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentForm from "fora-components/Form/CommentForm";
import Attachment, { IAttachmentProps } from "../Attachment";

interface IProps {
  timestamp: any;
  content: string;
  imageSrc?: string;
  replySubmitHandler: any;
  attachments: IAttachmentProps[];
}

const Main: React.FunctionComponent<IProps> = props => {
  const [state, setState] = React.useState<boolean>(false);

  return (
    <Flex flexDirection="column" sx={{ "> form": { mt: 3 } }}>
      <Flex flexDirection="column" sx={{ "> :not(:last-of-type)": { mb: 3 } }}>
        <Text color="gray500" fontFamily="secondary" variant="body">
          {props.content}
        </Text>
        {typeof props.imageSrc === "string" && <Image sx={{ height: 'auto', width: '100%', display: 'block' }} src={props.imageSrc} alt="image"></Image>}
        {/* Maintain aspect ratio? */}
        {Array.isArray(props.attachments) && (
          <Flex sx={{ "> :not(:last-of-type)": { mr: 2 } }}>{props.attachments.map(Attachment)}</Flex>
        )}

        <Flex sx={{ "> :not(:last-of-type)": { mr: 2 } }}>
          <Text variant="small" color="gray400" fontFamily="secondary">
            {moment(props.timestamp).fromNow()}
          </Text>
          <Text variant="small" color="gray500" fontFamily="secondary">
            ∙
          </Text>
          <Flex onClick={() => setState(!state)} alignItems={"center"} sx={{ "> *": { mr: 2 }, cursor: "pointer" }}>
            <FontAwesomeIcon icon={faReply} sx={{ color: "seaGlass200" }}></FontAwesomeIcon>
            <Text variant="body" fontFamily="secondary" color="seaGlass200">
              Comment
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {state && (
        <CommentForm
          value="lol"
          handleChange={() => {}}
          handleCancel={() => setState(false)}
          handleSubmit={props.replySubmitHandler}
        />
      )}
      <Divider></Divider>
    </Flex>
  );
};

export default Main;
