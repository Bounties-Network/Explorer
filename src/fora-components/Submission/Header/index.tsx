/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Button } from "rebass";
import Avatar, { AvatarProps } from "fora-components/Avatar";
import Divider from "fora-components/Divider";
import Pill from "fora-components/Pill";

interface IProps {
  handleSubmit: any
  avatar: AvatarProps
}

const Header: React.FunctionComponent<IProps> = props => {
  const [state, setState] = React.useState<boolean>(false)
  return ((
    <Flex  flexDirection="column">
    <Flex alignItems={'center'} sx={{ 'div:first-of-type': { mr: 'auto' } }}>
      <Avatar
      {...props.avatar}
      >
    </Avatar>
        {state ? <Pill variant='pill.status.pending'>{'Pending'}</Pill> :
          <Button onClick={() => {
            props.handleSubmit(() => setState(false))
            setState(true)
          }
          } variant='secondaryAffirmative'>
            Accept
    </Button>}
    </Flex>
    <Divider></Divider>
    </Flex>
  ))
};

export default Header;
