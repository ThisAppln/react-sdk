import { withKnobs } from '@storybook/addon-knobs';

import { configProps, fieldMetadata, stateProps } from './mock.stories.js';

import SoftServePstlSSallCurrency from './index.jsx';

export default {
  title: 'SoftServePstlSSallCurrency',
  decorators: [withKnobs],
  component: SoftServePstlSSallCurrency
};

export const baseSoftServePstlSSallCurrency = () => {

  const props = {
    value: Number(configProps.value),
    placeholder: configProps.placeholder,
    label: configProps.label,
    helperText: configProps.helperText,
    showGroupSeparators: configProps.showGroupSeparators,
    allowDecimals: configProps.allowDecimals,
    currencyISOCode: configProps.currencyISOCode,
    alwaysShowISOCode: configProps.alwaysShowISOCode,
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
        resolveConfigProps: () => {/* nothing */},
        clearErrorMessages: () => {/* nothing */}
      };
    }
  };

  return (
    <>
      <SoftServePstlSSallCurrency {...props} />
    </>
  );
};
