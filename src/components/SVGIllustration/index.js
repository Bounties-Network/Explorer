import React from 'react';

import SignIn from './SignIn';
import Wallet from './Wallet';
import Profile from './Profile';
import Address from './Address';
import Activity from './Activity';
import Hive from './Hive';
import Comment from './Comment';
import Bell from './Bell';
import Star from './Star';
import Lock from './Lock';
import Inbox from './Inbox';
import Error from './Error';
import Network from './Network';
import Unlock from './Unlock';
import Trophy from './Trophy';
import Check from './Check';

const SVGIllustration = props => {
  switch (props.icon) {
    case 'signIn':
      return <SignIn {...props} />;
    case 'wallet':
      return <Wallet {...props} />;
    case 'profile':
      return <Profile {...props} />;
    case 'address':
      return <Address {...props} />;
    case 'activity':
      return <Activity {...props} />;
    case 'hive':
      return <Hive {...props} />;
    case 'comment':
      return <Comment {...props} />;
    case 'bell':
      return <Bell {...props} />;
    case 'star':
      return <Star {...props} />;
    case 'lock':
      return <Lock {...props} />;
    case 'inbox':
      return <Inbox {...props} />;
    case 'error':
      return <Error {...props} />;
    case 'network':
      return <Network {...props} />;
    case 'unlock':
      return <Unlock {...props} />;
    case 'trophy':
      return <Trophy {...props} />;
    case 'check':
      return <Check {...props} />;
    default:
      return null;
  }
};

export default SVGIllustration;
