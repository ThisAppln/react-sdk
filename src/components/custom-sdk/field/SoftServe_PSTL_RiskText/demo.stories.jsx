import { useState } from 'react';
import SoftServePstlRiskText from './index.tsx';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { configProps } from './mock.stories';

export default {
  title: 'SoftServePstlRiskText',
  decorators: [withKnobs],
  component: SoftServePstlRiskText
};

export const BaseSoftServePstlRiskText = () => {
  const [value, setValue] = useState(configProps.value);

  const props = {
    value: text ('a','High'),
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
    onChange: (event) => { setValue(event.target.value); },
    onBlur: () => { return configProps.value; }
  };

  return (
    <>
      <SoftServePstlRiskText {...props} />
    </>
  );
};
