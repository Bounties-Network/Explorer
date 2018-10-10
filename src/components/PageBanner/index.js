import React from 'react';
import PropTypes from 'prop-types';
import './PageBanner.css';

const PageBanner = props => {
  const { height, width, background } = props;

  const customStyles = {
    height: height,
    width: width,
    backgroundColor: background
  };

  return (
    <div className="pageBanner" style={customStyles}>
      {props.children}
    </div>
  );
};

PageBanner.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  background: PropTypes.string
};

PageBanner.defaultProps = {
  height: '25px',
  width: '100%',
  background: 'lightgrey'
};

export default PageBanner;
