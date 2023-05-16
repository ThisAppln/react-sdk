import { withKnobs } from '@storybook/addon-knobs';

import SoftServePstlSSallPageWidget from './index.tsx';

import { configProps } from './mock.stories';

export default {
  title: 'SoftServePstlSSallPageWidget',
  decorators: [withKnobs],
  component: SoftServePstlSSallPageWidget
};

export const BaseSoftServePstlSSallPageWidget = () => {
  
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
