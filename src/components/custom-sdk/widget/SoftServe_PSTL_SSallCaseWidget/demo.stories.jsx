import { withKnobs } from '@storybook/addon-knobs';

import { historyData } from './mock.stories';

import SoftServePstlSSallCaseWidget from './index.tsx';

export default {
  title: 'SoftServePstlSSallCaseWidget',
  decorators: [withKnobs],
  component: SoftServePstlSSallCaseWidget
};

if (!window.PCore) {
  window.PCore = {};
}

window.PCore.getConstants = () => {
  return {
    CASE_INFO: {
      CASE_INFO_ID: 'caseInfo.ID'
    }
  };
};

window.PCore.getDataApiUtils = () => {
  return {
    getData: () => {
      return new Promise(resolve => {
        resolve(historyData);
      });
    }
  };
};

export const BaseSoftServePstlSSallCaseWidget = () => {

  const props = {
    label: 'Case history',

    getPConnect: () => {
      return {
        getValue: value => {
          return value;
        },
        getContextName: () => {
          return 'app/primary_1';
        },
        getLocalizedValue: value => {
          return value;
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
      <SoftServePstlSSallCaseWidget {...props} />
    </>
  );
};
