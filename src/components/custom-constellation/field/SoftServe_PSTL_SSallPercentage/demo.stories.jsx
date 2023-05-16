import { withKnobs } from '@storybook/addon-knobs';

import { configProps, stateProps, fieldMetadata } from './mock.stories.js';

import SoftServePstlSSallPercentage from './index.jsx';

export default {
  title: 'SoftServePstlSSallPercentage',
  decorators: [withKnobs],
  component: SoftServePstlSSallPercentage
};

export const baseSoftServePstlSSallPercentage = () => {

  const props = {
    value: configProps.value,
    placeholder: configProps.placeholder,
    label: configProps.label,
    helperText: configProps.helperText,
    showGroupSeparators: configProps.showGroupSeparators,
    hasSuggestions: configProps.hasSuggestions,
    testId: configProps.testId,
    fieldMetadata,

    getPConnect: () => {
      return {
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: () => {/* nothing */},
            triggerFieldChange: () => {/* nothing */}
          };
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
  };

  return (
    <>
      <SoftServePstlSSallPercentage {...props} />
    </>
  );
};
