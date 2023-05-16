import { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { configProps, fieldMetadata } from './mock.stories.js';

import SoftServePstlSSallInteger from './index.tsx';

export default {
  title: 'SoftServePstlSSallInteger',
  decorators: [withKnobs],
  component: SoftServePstlSSallInteger
};

export const BaseSoftServePstlSSallInteger = () => {
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
      <SoftServePstlSSallInteger {...props} />
    </>
  );
};
