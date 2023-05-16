/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import handleEvent from '@pega/react-sdk-components/lib/components/helpers/event-utils';
import Utils from '@pega/react-sdk-components/lib/components/helpers/utils';
import PropTypes from 'prop-types';
import FieldValueList from '@pega/react-sdk-components/lib/components/designSystemExtension/FieldValueList';

import StyledSoftServePstlSSallPicklistWrapper from './styles';

interface IOption {
  key: string;
  value: string;
}

// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallPicklist(props: any) {
  const {
    getPConnect,
    label,
    required,
    disabled,
    placeholder,
    value = '',
    datasource = [],
    validatemessage,
    status,
    readOnly,
    testId,
    helperText,
    displayMode,
    hideLabel,
    onRecordChange
  } = props;
  const [options, setOptions] = useState<Array<IOption>>([]);
  const helperTextToDisplay = validatemessage || helperText;

  const thePConn = getPConnect();
  const actionsApi = thePConn.getActionsApi();
  const propName = thePConn.getStateProps().value;

  useEffect(() => {
    const optionsList = Utils.getOptionList(props, getPConnect().getDataObject());
    optionsList.unshift({ key: 'Select', value: 'Select...' });
    setOptions(optionsList);
  }, [datasource]);

  let readOnlyProp = {};

  if (displayMode === 'LABELS_LEFT') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} />;
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} variant='stacked' />;
  }

  if (readOnly) {
    readOnlyProp = { readOnly: true };
  }

  let testProp = {};

  testProp = {
    'data-test-id': testId
  };

  const handleChange = evt => {
    const selectedValue = evt.target.value === 'Select' ? '' : evt.target.value;
    handleEvent(actionsApi, 'changeNblur', propName, selectedValue);
    if (onRecordChange) {
      onRecordChange(evt);
    }
  };

  // Material UI shows a warning if the component is rendered before options are set.
  //  So, hold off on rendering anything until options are available...
  return options.length === 0 ? null : (
    <StyledSoftServePstlSSallPicklistWrapper>
    <TextField
      fullWidth
      variant={readOnly ? 'standard' : 'outlined'}
      helperText={helperTextToDisplay}
      placeholder={placeholder}
      size='small'
      required={required}
      disabled={disabled}
      onChange={!readOnly ? handleChange : undefined}
      error={status === 'error'}
      label={label}
      value={value === '' && !readOnly ? 'Select' : value}
      select
      InputProps={{ ...readOnlyProp, ...testProp }}
    >
      {options.map((option: any) => (
        <MenuItem key={option.key} value={option.key}>
          {option.value}
        </MenuItem>
      ))}
    </TextField>
    </StyledSoftServePstlSSallPicklistWrapper>
  );
}

SoftServePstlSSallPicklist.defaultProps = {
  value: '',
  placeholder: '',
  validatemessage: '',
  helperText: '',
  displayAsStatus: false,
  datasource: [],
  hideLabel: false,
  disabled: false,
  readOnly: false,
  required: false,
  testId: null,
  displayMode: null,
  variant: 'inline',
  formatter: ''
};

SoftServePstlSSallPicklist.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  displayMode: PropTypes.string,
  displayAsStatus: PropTypes.bool,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  getPConnect: PropTypes.func.isRequired,
  validatemessage: PropTypes.string,
  helperText: PropTypes.string,
  datasource: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.shape({
      source: PropTypes.arrayOf(PropTypes.any)
    })
  ]),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string,
  variant: PropTypes.string,
  formatter: PropTypes.string
};
