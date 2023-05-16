import React, { createElement } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import FieldGroup from "@pega/react-sdk-components/lib/components/designSystemExtension/FieldGroup";
import createPConnectComponent from "@pega/react-sdk-components/lib/bridge/react_pconnect";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import StyledSoftServePstlSSallDetailsWrapper from "./styles";

// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallDetails(props) {
  const { label, showLabel, getPConnect, showHighlightedData } = props;

  // Get the inherited props from the parent to determine label settings
  const propsToUse = { label, showLabel, ...getPConnect().getInheritedProps() };

  // Set display mode prop and re-create the children so this part of the dom tree renders
  // in a readonly (display) mode instead of a editable
  getPConnect().setInheritedProp("displayMode", "LABELS_LEFT");
  getPConnect().setInheritedProp("readOnly", true);
  const children = getPConnect()
    .getChildren()
    .map((configObject, index) =>
      createElement(createPConnectComponent(), {
        ...configObject,
        // eslint-disable-next-line react/no-array-index-key
        key: index.toString(),
      })
    );

  // Set up highlighted data to pass in return if is set to show, need raw metadata to pass to createComponent
  let highlightedDataArr = [];
  if (showHighlightedData) {
    const { highlightedData = [] } = getPConnect().getRawMetadata().config;
    highlightedDataArr = highlightedData.map((field) => {
      field.config.displayMode = "STACKED_LARGE_VAL";

      // Mark as status display when using pyStatusWork
      if (field.config.value === "@P .pyStatusWork") {
        field.type = "TextInput";
        field.config.displayAsStatus = true;
      }

      return getPConnect().createComponent(field);
    });
  }


  return (
    <FieldGroup name={propsToUse.showLabel ? propsToUse.label : ""}>
      {showHighlightedData && highlightedDataArr.length > 0 && (
        <Grid container spacing={1} style={{ padding: "0 0 1em" }}>
          {highlightedDataArr.map((child, i) => (
            <Grid item xs={12} key={`hf-${i + 1}`}>
              {child}
            </Grid>
          ))}
        </Grid>
      )}
      <Grid container spacing={1}>
        {children.map((child, i) => (
          <Grid item xs={12} key={`r-${i + 1}`}>
            {child}
          </Grid>
        ))}
      </Grid>
    </FieldGroup>
  );
}


SoftServePstlSSallDetails.defaultProps = {
  label: undefined,
  showLabel: true,
  showHighlightedData: false,
};

SoftServePstlSSallDetails.propTypes = {
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  showHighlightedData: PropTypes.bool,
};
