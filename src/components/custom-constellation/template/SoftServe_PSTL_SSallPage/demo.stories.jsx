import { withKnobs } from '@storybook/addon-knobs';

import { AppAnnouncement as PegaAppAnnouncement } from '@pega/cosmos-react-work';

import SoftServePstlSSallPage from './index.jsx';
import { pyHome1Resolved, pyHome1Raw } from './mock.stories.js';

export default {
  title: 'SoftServePstlSSallPage',
  decorators: [withKnobs],
  component: SoftServePstlSSallPage
};

export const baseSoftServePstlSSallPage = () => {
  if (!window.PCore) {
    window.PCore = {};
  }

  window.PCore.getLocaleUtils = () => {
    return {
      getLocaleValue: val => {
        return val;
      }
    };
  };

  const configProps = pyHome1Resolved.children[0].children[0].config;

  const props = {
    useConfigurableLayout: false,
    enableGetNextWork: pyHome1Raw.config.enableGetNextWork,
    icon: pyHome1Raw.config.icon,
    title: 'Page Template',

    getPConnect: () => {
      return {
        getStateProps: () => {
          return {};
        },
        getActionsApi: () => {
          return {
            getNextWork: () => {
              return new Promise(resolve => {
                resolve({});
              });
            },
            updateFieldValue: () => {/* nothing */},
            triggerFieldChange: () => {/* nothing */}
          };
        },
        getChildren: () => {
          return pyHome1Raw.children;
        },
        getComponentName: () => {
          return '';
        },
        getLocalizedValue: value => {
          return value;
        },
        getRawMetadata: () => {
          return pyHome1Raw;
        },
        createComponent: config => {
          if (config.type === 'AppAnnouncement') {
            return (
              <PegaAppAnnouncement
                heading='Announcements'
                description={configProps.description}
                whatsNewLink={configProps.whatsnewlink}
                image={configProps.image.replace(/ /g, '+')}
                datasource={configProps.datasource}
                label={configProps.label}
                getPConnect={() => {
                  return {
                    getChildren: () => {
                      return pyHome1Resolved.children;
                    }
                  };
                }}
              />
            );
          }
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
  };

  const regionAChildren = pyHome1Raw.children[0].children.map(child => {
    return props.getPConnect().createComponent(child);
  });

  return (
    <>
      <SoftServePstlSSallPage {...props}>{regionAChildren}</SoftServePstlSSallPage>
    </>
  );
};
