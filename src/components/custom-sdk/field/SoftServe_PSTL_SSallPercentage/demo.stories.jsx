import { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { configProps, fieldMetadata } from './mock.stories.js';

import SoftServePstlSSallPercentage from './index.tsx';

export default {
  title: 'SoftServePstlSSallPercentage',
  decorators: [withKnobs],
  component: SoftServePstlSSallPercentage
};

export const BaseSoftServePstlSSallPercentage = () => {
  const [value, setValue] = useState(configProps.value);

  const props = {
    value,
    placeholder: configProps.placeholder,
    label: configProps.label,
    helperText: configProps.helperText,
    hasSuggestions: configProps.hasSuggestions,
    testId: configProps.testId,
    fieldMetadata,
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
    onChange: event => {
      setValue(event.target.value);
    },
    onBlur: () => {
      return configProps.value;
    }
  };

  return (
    <>
      <SoftServePstlSSallPercentage {...props} />
    </>
  );
};
