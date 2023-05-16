import { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { configProps, stateProps } from './mock.stories';

import SoftServePstlSSallDate from './index.tsx';

export default {
  title: 'SoftServePstlSSallDate',
  decorators: [withKnobs],
  component: SoftServePstlSSallDate
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


export const BaseSoftServePstlSSallDate = () => {
  const [value, setValue] = useState(configProps.value);

  const props = {
    value,
    label: configProps.label,
    hideLabel: configProps.hideLabel,
    displayMode: configProps.displayMode,

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
          return stateProps;
        }
      };
    },
    onChange: date => {
      setValue(date.value);
    }
  };

  return (
    <>
      <SoftServePstlSSallDate {...props} />
    </>
  );
};
