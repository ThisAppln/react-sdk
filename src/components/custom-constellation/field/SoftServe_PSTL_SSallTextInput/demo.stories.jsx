import { withKnobs } from '@storybook/addon-knobs';

import SoftServePstlSSallTextInput from './index.jsx';

import { stateProps, fieldMetadata, configProps } from './mock.stories';

export default {
  title: 'SoftServePstlSSallTextInput',
  decorators: [withKnobs],
  component: SoftServePstlSSallTextInput
};

export const baseSoftServePstlSSallTextInput = () => {

  const props = {
    value: configProps.value,
    placeholder: configProps.placeholder,
    label: configProps.label,
    helperText: configProps.helperText,
    testId: configProps.testId,
    hasSuggestions: configProps.hasSuggestions,
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
      <SoftServePstlSSallTextInput {...props} />
    </>
  );
};
