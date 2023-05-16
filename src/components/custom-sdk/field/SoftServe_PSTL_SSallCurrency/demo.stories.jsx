import { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { configProps, fieldMetadata } from './mock.stories.js';

import SoftServePstlSSallCurrency from './index.tsx';

export default {
  title: 'SoftServePstlSSallCurrency',
  decorators: [withKnobs],
  component: SoftServePstlSSallCurrency
};

if (!window.PCore) {
  window.PCore = {};
}

window.PCore.getEnvironmentInfo = () => {
  return {
    getUseLocale: () => {
      return 'en-GB';
    }
  };
};

export const BaseSoftServePstlSSallCurrency = () => {
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
            },
            triggerFieldChange: () => {/* nothing */}
          };
        },
        getStateProps: () => {
          return { value: '.name' };
        },
        getComponentName: () => {
          return 'Currency';
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
      <SoftServePstlSSallCurrency {...props} />
    </>
  );
};
