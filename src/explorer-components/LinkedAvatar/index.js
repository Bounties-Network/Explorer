import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Avatar } from 'components';

const LinkedAvatar = props => {
  const {
    size,
    name,
    address,
    nameTextScale,
    nameTextColor,
    nameTextWeight,
    addressTextScale,
    addressTextColor,
    border,
    img,
    hash,
    className,
    history
  } = props;

  const buildProfileURL = address => {
    return `/profile/${address}`;
  };

  const linkToRouter = () => {
    return history.push(`/profile/${address}`);
  };

  return (
    <Avatar
      size={size}
      name={name}
      address={address}
      nameTextScale={nameTextScale}
      nameTextColor={nameTextColor}
      nameTextWeight={nameTextWeight}
      addressTextScale={addressTextScale}
      addressTextColor={addressTextColor}
      border={border}
      img={img}
      hash={hash}
      className={className}
      onClick={linkToRouter}
    />
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  img: PropTypes.string,
  border: PropTypes.bool,
  name: PropTypes.string,
  address: PropTypes.string,
  className: PropTypes.string,
  hash: PropTypes.string,
  nameTextScale: PropTypes.string,
  nameTextColor: PropTypes.string,
  nameTextWeight: PropTypes.string,
  addressTextScale: PropTypes.string,
  addressTextColor: PropTypes.string
};

Avatar.defaultProps = {
  size: 'small',
  border: false,
  nameTextScale: 'h3',
  nameTextWeight: 'fontWeight-bold',
  addressTextScale: 'Body'
};

export default withRouter(LinkedAvatar);
