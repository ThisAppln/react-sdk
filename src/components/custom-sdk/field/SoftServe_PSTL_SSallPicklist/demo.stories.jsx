import { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { configProps, stateProps } from './mock.stories';

import SoftServePstlSSallPicklist from './index.tsx';

export default {
  title: 'SoftServePstlSSallPicklist',
  decorators: [withKnobs],
  component: SoftServePstlSSallPicklist
};

export const BaseSoftServePstlSSallPicklist = () => {
  const [value, setValue] = useState(configProps.value);

  const props = {
    value,
    placeholder: configProps.placeholder,
    label: configProps.label,
    helperText: configProps.helperText,
    datasource: configProps.datasource,
    testId: configProps.testId,
    hasSuggestions: configProps.hasSuggestions,
    listType: configProps.listType,
    getPConnect: () => {
      return {
        getDataObject: () => {
          return undefined;
        },
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: (propName, val) => {
              setValue(val);
            },
            triggerFieldChange: () => {
              return undefined;
            }
          };
        }
      };
    }
  };

  return (
    <>
      <SoftServePstlSSallPicklist {...props} />
    </>
  );
};

