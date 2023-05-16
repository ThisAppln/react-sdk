/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import FieldValueList from '@pega/react-sdk-components/lib/components/designSystemExtension/FieldValueList';
import PropTypes from 'prop-types';
import { Text } from '@pega/cosmos-react-core';


import StyledSoftServePstlRiskDisplayWrapper from './styles';


// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlRiskDisplay(props: any) {
  const {
    label,
      value = '',


    readOnly,


    displayMode,
    hideLabel
  } = props;


  // let readOnlyProp = {}; // Note: empty if NOT ReadOnly

  if (displayMode === 'LABELS_LEFT') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} />;
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} variant='stacked' />;
  }

  if (readOnly) {
   // readOnlyProp = { readOnly: true };
  }

  // let testProp = {};

 // testProp = {
  //  'data-test-id': testId
  // };


  switch (value) {
    case 'High':
      return <StyledSoftServePstlRiskDisplayWrapper><Text variant='h1' status='error'>Risk is {value}</Text></StyledSoftServePstlRiskDisplayWrapper>;
      break;
    case 'Medium':
      return <StyledSoftServePstlRiskDisplayWrapper><Text variant='h1' status='warning'>Risk is {value}</Text></StyledSoftServePstlRiskDisplayWrapper>;
      break;
      case 'Low':
        return <StyledSoftServePstlRiskDisplayWrapper><Text variant='h1' status='success'>Risk is {value}</Text></StyledSoftServePstlRiskDisplayWrapper>;
      break;
      case 'Very High':
        return <StyledSoftServePstlRiskDisplayWrapper><Text variant='h1' status='error'>Risk is {value}</Text></StyledSoftServePstlRiskDisplayWrapper>;
      break;
    default:
      return <StyledSoftServePstlRiskDisplayWrapper><Text>Risk is undefined</Text></StyledSoftServePstlRiskDisplayWrapper>; ;
  }
}

SoftServePstlRiskDisplay.defaultProps = {
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
  fieldMetadata: {},
  additionalProps: {},
  displayMode: null,
  variant: 'inline',
  formatter: '',
  isTableFormatter: false,
  hasSuggestions: false
};

SoftServePstlRiskDisplay.propTypes = {
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
  fieldMetadata: PropTypes.objectOf(PropTypes.any),
  additionalProps: PropTypes.objectOf(PropTypes.any),
  variant: PropTypes.string,
  formatter: PropTypes.string,
  isTableFormatter: PropTypes.bool,
  hasSuggestions: PropTypes.bool
};
