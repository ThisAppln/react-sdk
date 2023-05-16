import { withKnobs } from '@storybook/addon-knobs';

import { configProps, operatorDetails } from './mock.stories';

import SoftServePstlSSallPageCaseWidget from './index.tsx';

export default {
  title: 'SoftServePstlSSallPageCaseWidget',
  decorators: [withKnobs],
  component: SoftServePstlSSallPageCaseWidget
};

if (!window.PCore) {
  window.PCore = {};
}

window.PCore.getUserApi = () => {
  return {
    getOperatorDetails: () => {
      return new Promise(resolve => {
        resolve(operatorDetails);
      });
    }
  };
};

export const BaseSoftServePstlSSallPageCaseWidget = () => {

  const props = {
    label: configProps.label,
    createLabel: configProps.createLabel,
    updateLabel: configProps.updateLabel,
    createOperator: configProps.createOperator,
    updateOperator: configProps.updateOperator,
    createDateTime: configProps.createDateTime,
    updateDateTime: configProps.updateDateTime,
    hideLabel: configProps.hideLabel,

    getPConnect: () => {
      return {
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
      <SoftServePstlSSallPageCaseWidget {...props} />
    </>
  );
};
