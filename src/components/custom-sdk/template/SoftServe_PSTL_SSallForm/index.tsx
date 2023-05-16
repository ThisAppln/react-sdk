/* eslint-disable react/no-array-index-key */
import React, { createElement } from "react";
import PropTypes from "prop-types";

import { getInstructions } from "./utils";
import createPConnectComponent from "@pega/react-sdk-components/lib/bridge/react_pconnect";
import "./DefaultForm.css";

import StyledSoftServePstlSSallFormWrapper from "./styles";

// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallForm(props) {
  const { getPConnect, NumCols } = props;
  const instructions = getInstructions(getPConnect(), props.instructions);
  const instructionText = instructions?.replace(/<\/?[^>]+(>|$)/g, "");

  let divClass: string;

  const numCols = NumCols || "1";
  switch (numCols) {
    case "1":
      divClass = "psdk-default-form-one-column";
      break;
    case "2":
      divClass = "psdk-default-form-two-column";
      break;
    case "3":
      divClass = "psdk-default-form-three-column";
      break;
    default:
      divClass = "psdk-default-form-one-column";
      break;
  }

  // repoint the children because they are in a region and we need to not render the region
  // to take the children and create components for them, put in an array and pass as the
  // defaultForm kids
  const arChildren = getPConnect().getChildren()[0].getPConnect().getChildren();
  const dfChildren = arChildren.map((kid, idx) =>
    createElement(createPConnectComponent(), { ...kid, key: idx })
  );

  return (
    <StyledSoftServePstlSSallFormWrapper>
      <div className={divClass}>
        <div>{instructionText}</div>
        {dfChildren}
      </div>
    </StyledSoftServePstlSSallFormWrapper>
  );
}

SoftServePstlSSallForm.defaultProps = {
  NumCols: "1",
};

SoftServePstlSSallForm.propTypes = {
  // children: PropTypes.arrayOf(PropTypes.node).isRequired,
  NumCols: PropTypes.string,
};
