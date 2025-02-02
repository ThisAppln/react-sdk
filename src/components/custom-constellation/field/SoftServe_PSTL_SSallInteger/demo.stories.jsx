import { withKnobs } from '@storybook/addon-knobs';

import { stateProps, configProps, fieldMetadata } from './mock.stories';

import SoftServePstlSSallInteger from './index.jsx';

export default {
  title: 'SoftServePstlSSallInteger',
  decorators: [withKnobs],
  component: SoftServePstlSSallInteger
};

export const baseSoftServePstlSSallInteger = () => {

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
      <SoftServePstlSSallInteger {...props} />
    </>
  );
};
