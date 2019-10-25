import React from "react";
import { css } from "@styled-system/css";
import { Link, } from "rebass";
import AvatarImage, { AvatarImageProps } from 'fora-components/AvatarImage'
import emotionStyled from "lib/emotion-styled";

const AvatarGroupLink = emotionStyled(Link)(() => css({ 
  display: 'flex',
  alignItems: 'center',
  '> :last-child': { ml: '50px' }, // MMm hardcoded value *shrug* for now
  '> *:nth-child(2)': { 
    transform: 'translateX(-30%)'
   },
   '> *:nth-child(3)': { 
    transform: 'translateX(-60%)'
   },
   '> *:nth-child(4)': { 
    transform: 'translateX(-90%)'
   },
   '> *:nth-child(5)': { 
    transform: 'translateX(-120%)'
   },
   '> *:nth-child(6)': { 
    transform: 'translateX(-150%)'
   },
 }));

type AvatarProps = {
  href: string,
  avatars: AvatarImageProps[]
};
const Avatar: React.FC<AvatarProps> = props => {
  const {
    href,
    avatars,
  } = props;

  return (
    <AvatarGroupLink href={href}>
      {Array.isArray(avatars) && avatars.slice(0, 5).map(AvatarImage)}
      <Link>{`+ ${avatars.length - 5} more`}</Link>
    </AvatarGroupLink>
  );
};

export default Avatar;
