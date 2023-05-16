/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import FieldValueList from '@pega/react-sdk-components/lib/components/designSystemExtension/FieldValueList';
import PropTypes from 'prop-types';


import StyledSoftServePstlSSallPhoneWrapper from './styles';


// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallPhone(props: any) {
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

  let testProp = {};

  testProp = {
    'data-test-id': testId
  };

  if (displayMode === 'LABELS_LEFT') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} />;
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} variant='stacked' />;
  }

  if (readOnly) {
    const disableDropdown = true;
    return (
      <div>
        <StyledSoftServePstlSSallPhoneWrapper>
        <MuiPhoneNumber
          fullWidth
          helperText={helperTextToDisplay}
          placeholder=''
          size='small'
          required={required}
          disabled={disabled}
          onChange={onChange}
          error={status === 'error'}
          label={label}
          value={value}
          InputProps={{
            readOnly: true
          }}
          disableDropdown={disableDropdown}
        />
        </StyledSoftServePstlSSallPhoneWrapper>
      </div>
    );
  }

  const handleChange = inputVal => {
    let phoneValue = inputVal && inputVal.replace(/\D+/g, '');
    phoneValue = `+${phoneValue}`;
    onChange({ value: phoneValue });
  };

  const handleBlur = event => {
    const phoneValue = event?.target?.value;
    event.target.value = `+${phoneValue && phoneValue.replace(/\D+/g, '')}`;
    onBlur(event);
  };

  return (
    <StyledSoftServePstlSSallPhoneWrapper>
    <MuiPhoneNumber
      fullWidth
      variant='outlined'
      helperText={helperTextToDisplay}
      placeholder=''
      size='small'
      defaultCountry='us'
      required={required}
      disabled={disabled}
      onChange={handleChange}
      onBlur={!readOnly ? handleBlur : undefined}
      error={status === 'error'}
      label={label}
      value={value}
      InputProps={{ ...testProp }}
    />
    </StyledSoftServePstlSSallPhoneWrapper>
  );
}

SoftServePstlSSallPhone.defaultProps = {
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
  hasSuggestions: false
};

SoftServePstlSSallPhone.propTypes = {
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
  hasSuggestions: PropTypes.bool
};
