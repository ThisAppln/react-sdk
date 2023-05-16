/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText
} from '@material-ui/core';
import handleEvent from '@pega/react-sdk-components/lib/components/helpers/event-utils';
import PropTypes from 'prop-types';
import FieldValueList from '@pega/react-sdk-components/lib/components/designSystemExtension/FieldValueList';
import StyledSoftServePstlSSallBooleanWrapper from './styles';


// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallBoolean(props: any) {
  const {
    getPConnect,
    label,
    value = false,
    readOnly,
    testId,
    required,
    status,
    helperText,
    validatemessage,
    displayMode,
    hideLabel
  } = props;
  const helperTextToDisplay = validatemessage || helperText;

  const thePConn = getPConnect();
  const theConfigProps = thePConn.getConfigProps();
  const { caption } = theConfigProps;
  const actionsApi = thePConn.getActionsApi();
  const propName = thePConn.getStateProps().value;

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    // This update theSelectedButton which will update the UI to show the selected button correctly
    setChecked(value);
  }, [value]);

  if (displayMode === 'LABELS_LEFT') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} />;
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} variant='stacked' />;
  }

  const handleChange = event => {
    handleEvent(actionsApi, 'changeNblur', propName, event.target.checked);
  };

  const handleBlur = event => {
    thePConn.getValidationApi().validate(event.target.checked);
  };

  let theCheckbox = <Checkbox color='primary' />;

  if (readOnly) {
    // Workaround for lack of InputProps readOnly from https://github.com/mui-org/material-ui/issues/17043
    //  Also note that we need to turn off the onChange call in the FormControlLabel wrapper, too. See below!
    theCheckbox = <Checkbox value={value || false} onChange={handleChange} readOnly={readOnly} />;
  }


  return (
    <StyledSoftServePstlSSallBooleanWrapper>
    <FormControl required={required} error={status === 'error'}>
      <FormGroup>
        <FormControlLabel
          control={theCheckbox}
          checked={checked}
          onChange={!readOnly ? handleChange : undefined}
          onBlur={!readOnly ? handleBlur : undefined}
          label={caption}
          labelPlacement='end'
          data-test-id={testId}
        />
      </FormGroup>
      <FormHelperText>{helperTextToDisplay}</FormHelperText>
    </FormControl>
    </StyledSoftServePstlSSallBooleanWrapper>
  );
}


SoftServePstlSSallBoolean.defaultProps = {
  validatemessage: "",
  value: false,
  label: "",
  hideLabel: false,
  helperText: "",
  disabled: false,
  readOnly: false,
  required: false,
  testId: null,
  additionalProps: {}
};

SoftServePstlSSallBoolean.propTypes = {
  getPConnect: PropTypes.func.isRequired,
  validatemessage: PropTypes.string,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  helperText: PropTypes.string,
  value: PropTypes.bool,
  caption: PropTypes.string.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string,
  additionalProps: PropTypes.objectOf(PropTypes.any)
};
