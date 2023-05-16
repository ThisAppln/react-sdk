import { withKnobs } from '@storybook/addon-knobs';

import SoftServePstlSSallPhone from './index.jsx';
import { stateProps, configProps } from './mock.stories';

export default {
  title: 'SoftServePstlSSallPhone',
  decorators: [withKnobs],
  component: SoftServePstlSSallPhone
};

export const baseSoftServePstlSSallPhone = () => {

  const props = {
    value: configProps.value,
    placeholder: configProps.placeholder,
    label: configProps.label,
    testId: configProps.testId,
    hasSuggestions: configProps.hasSuggestions,
    datasource: configProps.datasource,

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
      <SoftServePstlSSallPhone {...props} />
    </>
  );
};
