/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import FieldValueList from '@pega/react-sdk-components/lib/components/designSystemExtension/FieldValueList';
import handleEvent from '@pega/react-sdk-components/lib/components/helpers/event-utils';
import PropTypes from 'prop-types';
import { format } from "@pega/react-sdk-components/lib/components/helpers/formatters";
import { getCurrencyCharacters, getCurrencyOptions } from '@pega/react-sdk-components/lib/components/field/Currency/currency-utils.js';

import StyledSoftServePstlSSallCurrencyWrapper from './styles';

// Using control from: https://github.com/unicef/material-ui-currency-textfield

// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallCurrency(props: any) {
  const {
    getPConnect,
    label,
    required,
    disabled,
    value = '',
    validatemessage,
    status,
    /* onChange, onBlur, */
    readOnly,
    testId,
    helperText,
    displayMode,
    hideLabel,
    currencyISOCode = "USD"
  } = props;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn.getStateProps().value;
  const helperTextToDisplay = validatemessage || helperText;

 let readOnlyProp = {}; // Note: empty if NOT ReadOnly

  if (readOnly) {
    readOnlyProp = { readOnly: true };
  }

  let testProp = {};

  testProp = {
    'data-test-id': testId
  };

  const [currValue, setCurrValue] = useState();
  const [theCurrSym, setCurrSym] = useState("$");
  const [theCurrDec, setCurrDec] = useState(".");
  const [theCurrSep, setCurrSep] = useState(",");

  useEffect(() => {
    // currencySymbols looks like this: { theCurrencySymbol: '$', theDecimalIndicator: '.', theSeparator: ',' }
    const theSymbols = getCurrencyCharacters(currencyISOCode);
    setCurrSym(theSymbols.theCurrencySymbol);
    setCurrDec(theSymbols.theDecimalIndicator);
    setCurrSep(theSymbols.theDigitGroupSeparator);
  }, [currencyISOCode]);

  useEffect(() => {
    // const testVal = value;
    setCurrValue(value.toString());
  }, [value]);

  const theCurrencyOptions = getCurrencyOptions(currencyISOCode);
  const formattedValue = format(value, pConn.getComponentName().toLowerCase(), theCurrencyOptions);

  if (displayMode === 'LABELS_LEFT') {
    return <FieldValueList name={hideLabel ? '' : label} value={formattedValue} />;
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return <FieldValueList name={hideLabel ? '' : label} value={formattedValue} variant='stacked' />;
  }

  function currOnChange(event, inValue) {
    // console.log(`Currency currOnChange inValue: ${inValue}`);

    // update internal value
    setCurrValue(inValue);
  }

  function currOnBlur(event, inValue) {
    // console.log(`Currency currOnBlur inValue: ${inValue}`);
    handleEvent(actions, 'changeNblur', propName, inValue !== '' ? Number(inValue) : inValue);
  }


  return (
    <StyledSoftServePstlSSallCurrencyWrapper>
    <CurrencyTextField
      fullWidth
      variant={readOnly ? 'standard' : 'outlined'}
      helperText={helperTextToDisplay}
      placeholder=''
      size='small'
      required={required}
      disabled={disabled}
      onChange={currOnChange}
      onBlur={!readOnly ? currOnBlur : undefined}
      error={status === 'error'}
      label={label}
      value={currValue}
      type='text'
      outputFormat='number'
      textAlign='left'
      InputProps={{ ...readOnlyProp, inputProps: { ...testProp, value: currValue } }}
      currencySymbol={theCurrSym}
      decimalCharacter={theCurrDec}
      digitGroupSeparator={theCurrSep}
    />
    </StyledSoftServePstlSSallCurrencyWrapper>
  );
}

SoftServePstlSSallCurrency.defaultProps = {
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
  displayMode: null
};

SoftServePstlSSallCurrency.propTypes = {
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
  testId: PropTypes.string
};
