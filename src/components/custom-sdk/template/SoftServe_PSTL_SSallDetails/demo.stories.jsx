import { withKnobs } from "@storybook/addon-knobs";

import SoftServePstlSSallDetails from "./index.tsx";

import operatorDetails, { pyReviewRaw } from "./mock.stories";

export default {
  title: "SoftServePstlSSallDetails",
  decorators: [withKnobs],
  component: SoftServePstlSSallDetails,
  parameters: {
    type: "Details",
  },
};

if (!window.PCore) {
  window.PCore = {};
}

window.PCore.getUserApi = () => {
  return {
    getOperatorDetails: () => {
      return new Promise((resolve) => {
        resolve(operatorDetails);
      });
    },
  };
};

window.PCore.getEnvironmentInfo = () => {
  return {
    getUseLocale: () => {
      return "en-US";
    },
  };
};

export const BaseSoftServePstlSSallDetails = () => {
  const props = {
    NumCols: "1",
    template: "DefaultForm",
    showHighlightedData: false,
    label: "Details",
    showLabel: true,
    getPConnect: () => {
      return {
        getChildren: () => {
          return pyReviewRaw.children[0].children;
        },
        getRawMetadata: () => {
          return pyReviewRaw;
        },
        getInheritedProps: () => {
          return pyReviewRaw.config.inheritedProps;
        },
        setInheritedProp: () => {
          /* nothing */
        },
        resolveConfigProps: () => {
          /* nothing */
        },
      };
    },
  };

  return (
    <>
      <SoftServePstlSSallDetails {...props}></SoftServePstlSSallDetails>
    </>
  );
};
