import { useState } from 'react';
import SoftServePstlSSallPhone from './index.tsx';
import { withKnobs } from '@storybook/addon-knobs';
import { configProps } from './mock.stories';

export default {
  title: 'SoftServePstlSSallPhone',
  decorators: [withKnobs],
  component: SoftServePstlSSallPhone
};

export const BaseSoftServePstlSSallPhone = () => {
  const [value, setValue] = useState(configProps.value);
 
  const props = {
    value,
    placeholder: configProps.placeholder,
    label: configProps.label,
    testId: configProps.testId,
    hasSuggestions: configProps.hasSuggestions,
    helperText: configProps.helperText,
    disabled: configProps.disabled,
    required: configProps.required,
    readOnly: configProps.readOnly,
    displayMode: configProps.displayMode,
    getPConnect: () => {
      return {
        getActionsApi: () => {
          return {
            updateFieldValue: (propName, theValue) => {
              setValue(theValue);
            }
          };
        },
        getStateProps: () => {
          return { value: '.name' };
        }
      };
    },
    onChange: phone => {
      setValue(phone.value);
    },
    onBlur: () => { return configProps.value; }
  };

  return (
    <>
      <SoftServePstlSSallPhone {...props} />
    </>
  );
};
