
import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextInput from '@pega/react-sdk-components/lib/components/field/TextInput';
import FieldValueList from '@pega/react-sdk-components/lib/components/designSystemExtension/FieldValueList';
import PropTypes from 'prop-types';


import StyledSoftServePstlSSallEmailWrapper from './styles';


// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallEmail(props: any) {
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

  return (
    <StyledSoftServePstlSSallEmailWrapper>
     <TextField
      fullWidth
      variant='outlined'
      helperText={helperTextToDisplay}
      placeholder=''
      size='small'
      required={required}
      disabled={disabled}
      onChange={onChange}
      onBlur={!readOnly ? onBlur : undefined}
      error={status === 'error'}
      label={label}
      value={value}
      type='email'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <MailOutlineIcon />
          </InputAdornment>
        ),
        inputProps: { ...testProp }
      }}
    />
    </StyledSoftServePstlSSallEmailWrapper>
  );
}

SoftServePstlSSallEmail.defaultProps = {
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
  formatter: '',
  isTableFormatter: false,
  hasSuggestions: false
};

SoftServePstlSSallEmail.propTypes = {
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
  formatter: PropTypes.string,
  isTableFormatter: PropTypes.bool,
  hasSuggestions: PropTypes.bool
};
