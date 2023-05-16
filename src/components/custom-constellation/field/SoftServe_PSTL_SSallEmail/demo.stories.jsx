import { withKnobs } from '@storybook/addon-knobs';

import SoftServePstlSSallEmail from './index.jsx';

import { stateProps, configProps, fieldMetadata } from './mock.stories';

export default {
  title: 'SoftServePstlSSallEmail',
  decorators: [withKnobs],
  component: SoftServePstlSSallEmail
};

export const baseSoftServePstlSSallEmail = () => {

  const props = {
    value: configProps.value,
    label: configProps.label,
    placeholder: configProps.placeholder,
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
      <SoftServePstlSSallEmail {...props} />
    </>
  );
};
