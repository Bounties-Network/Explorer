import React from 'react';
import intl from 'react-intl-universal';

const NoMatch = () => <div>{intl.get('errors.404')}</div>;

export default NoMatch;
