import { withKnobs } from '@storybook/addon-knobs';

import SoftServePstlSSallPageWidget from './index.jsx';


import configProps from './mock.stories';

export default {
  title: 'SoftServePstlSSallPageWidget',
  decorators: [withKnobs],
  component: SoftServePstlSSallPageWidget
};

export const baseSoftServePstlSSallPageWidget = () => {

  const props = {
    label: configProps.label,
    header: configProps.header,
    description: configProps.description,
    image: configProps.image,
    datasource: configProps.datasource,
    whatsnewlink: configProps.whatsnewlink
};

return (
    <>
      <SoftServePstlSSallPageWidget {...props} />
    </>
  );
};
