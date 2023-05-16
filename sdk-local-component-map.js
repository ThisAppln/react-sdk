// Statically load all "local" components that aren't yet in the npm package

import SoftServePstlRiskDisplay from './src\components\custom-sdk\field\SoftServe_PSTL_RiskDisplay/';
/*import end - DO NOT REMOVE*/

// localSdkComponentMap is the JSON object where we'll store the components that are
// found locally. If not found here, we'll look in the Pega-provided component map

const localSdkComponentMap = {
  "SoftServe_PSTL_RiskDisplay" : SoftServePstlRiskDisplay,
/*map end - DO NOT REMOVE*/
};

export default localSdkComponentMap;
