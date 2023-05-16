
import React from 'react';
import { TextField } from '@material-ui/core';
import TextInput from '@pega/react-sdk-components/lib/components/field/TextInput';
import FieldValueList from '@pega/react-sdk-components/lib/components/designSystemExtension/FieldValueList';
import PropTypes from 'prop-types';


import StyledSoftServePstlSSallIntegerWrapper from './styles';


// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallInteger(props: any) {
  const {
    label,
    required,
    disabled,
    value = '',
    validatemessage,
    status,
    onChange,
    onBlur,
    readOnly,
    testId,
    helperText,
    displayMode,
    hideLabel
  } = props;
  const helperTextToDisplay = validatemessage || helperText;


  if (displayMode === 'LABELS_LEFT') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} />;
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} variant='stacked' />;
  }

  if (readOnly) {
    return <TextInput {...props} />;
  }

  let testProp = {};

  testProp = {
    'data-test-id': testId
  };

  function intOnChange(event) {
    // console.log(`Integer intOnChange inValue: ${event.target.value}`);

    // Disallow "." and "," (separators) since this is an integer field
    //  Mimics Pega Integer behavior (where separator characters are "eaten" if they're typed)
    const disallowedChars = ['.', ','];
    const theAttemptedValue = event.target.value;
    const lastChar = theAttemptedValue.slice(-1);

    if (disallowedChars.includes(lastChar)) {
      event.target.value = theAttemptedValue.slice(0, -1);
    }

    // Pass through to the Constellation change handler
    onChange(event);
  }

  return (
    <StyledSoftServePstlSSallIntegerWrapper>
    <TextField
      fullWidth
      variant={readOnly ? 'standard' : 'outlined'}
      helperText={helperTextToDisplay}
      placeholder=''
      size='small'
      required={required}
      disabled={disabled}
      onChange={intOnChange}
      onBlur={!readOnly ? onBlur : undefined}
      error={status === 'error'}
      label={label}
      value={value}
      type='text'
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', ...testProp }}
    />
    </StyledSoftServePstlSSallIntegerWrapper>
  );
}

SoftServePstlSSallInteger.defaultProps = {
  value: '',
  placeholder: '',
  validatemessage: '',
  helperText: '',
  displayAsStatus: false,
  hideLabel: false,
  disabled: false,
  readOnly: false,
  required: false,
  testId: null,
  displayMode: null,
  variant: 'inline',
  formatter: ''
};

SoftServePstlSSallInteger.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  displayMode: PropTypes.string,
  displayAsStatus: PropTypes.bool,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  getPConnect: PropTypes.func.isRequired,
  validatemessage: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string,
  variant: PropTypes.string,
  formatter: PropTypes.string
};
