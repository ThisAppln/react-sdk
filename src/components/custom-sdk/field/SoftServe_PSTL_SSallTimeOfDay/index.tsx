import React from 'react';
import TextInput from '@pega/react-sdk-components/lib/components/field/TextInput';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FieldValueList from '@pega/react-sdk-components/lib/components/designSystemExtension/FieldValueList';
import PropTypes from 'prop-types';

import StyledSoftServePstlSSallTimeOfDayWrapper from './styles';


// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallTimeOfDay(props: any) {
  const {
    label,
    required,
    disabled,
    value,
    validatemessage,
    status,
    onChange,
    readOnly,
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

  const handleChange = date => {
    const theValue = date && date.isValid() ? date.format('HH:mm') : null;
    onChange({ value: theValue });
  };

  let timeValue: any = null;
  if (value) {
    const timeArray = value.split(':').map(itm => Number(itm));
    timeValue = dayjs().hour(timeArray[0]).minute(timeArray[1]);
  }

  //
  // TODO: Keyboard doesn't work in the minute field, it updates one digit then jump to am/pm field
  //       try an older version of the lib or use DateTimePicker
  //

  return (
    <StyledSoftServePstlSSallTimeOfDayWrapper>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <KeyboardTimePicker
          variant='inline'
          inputVariant='outlined'
          placeholder='hh:mm am'
          keyboardIcon={<AccessTimeIcon />}
          fullWidth
          required={required}
          disabled={disabled}
          error={status === 'error'}
          helperText={helperTextToDisplay}
          minutesStep={5}
          size='small'
          label={label}
          autoOk
          mask='__:__ _m'
          format='hh:mm a'
          value={timeValue}
          onChange={handleChange}
        />
      </MuiPickersUtilsProvider>
    </StyledSoftServePstlSSallTimeOfDayWrapper>
  );
}

SoftServePstlSSallTimeOfDay.defaultProps = {
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

SoftServePstlSSallTimeOfDay.propTypes = {
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
