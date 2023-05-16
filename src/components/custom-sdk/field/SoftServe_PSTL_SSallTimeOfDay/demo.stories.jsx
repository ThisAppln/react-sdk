import { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { configProps, stateProps } from './mock.stories';

import SoftServePstlSSallTimeOfDay from './index.tsx';

export default {
  title: 'SoftServePstlSSallTimeOfDay',
  decorators: [withKnobs],
  component: SoftServePstlSSallTimeOfDay
};

export const BaseSoftServePstlSSallTimeOfDay = () => {
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
    onChange: time => {
      setValue(time.value);
    }
  };

  return (
    <>
      <SoftServePstlSSallTimeOfDay {...props} />
    </>
  );
};
