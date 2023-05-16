import { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { configProps, fieldMetadata } from './mock.stories.js';

import SoftServePstlSSallDecimal from './index.tsx';

export default {
  title: 'SoftServePstlSSallDecimal',
  decorators: [withKnobs],
  component: SoftServePstlSSallDecimal
};

export const BaseSoftServePstlSSallDecimal = () => {
  const [value, setValue] = useState(configProps.value);

  const props = {
    value,
    placeholder: configProps.placeholder,
    label: configProps.label,
    helperText: configProps.helperText,
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
      <SoftServePstlSSallDecimal {...props} />
    </>
  );
};

