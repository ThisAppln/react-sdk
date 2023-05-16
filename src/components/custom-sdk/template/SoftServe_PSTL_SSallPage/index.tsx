
import React from "react";
import PropTypes from 'prop-types';

import OneColumn from './OneColumn';

import StyledSoftServePstlSSallPageWrapper from './styles';


// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallPage(props) {

    return (
      <StyledSoftServePstlSSallPageWrapper>
      <OneColumn
       {...props}
      />
      </StyledSoftServePstlSSallPageWrapper>
  );

}

SoftServePstlSSallPage.defaultProps = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

SoftServePstlSSallPage.propTypes = {
};
