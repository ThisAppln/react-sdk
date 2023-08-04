import PropTypes from 'prop-types';
import { Text } from '@pega/cosmos-react-core';

import StyledSoftServePstlRiskDisplayWrapper from './styles';


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const SoftServePstlRiskDisplay = props => {
  const { value } = props;

  // const pConn = getPConnect();
  // const actions = pConn.getActionsApi();
  // const propName = pConn?.getStateProps()?.value;

  // const handleOnChange = event => {
  //  const { value: updatedValue } = event.target;
  //  actions.updateFieldValue(propName, updatedValue);
  // };

  switch (value) {
    case 'High':
      return <StyledSoftServePstlRiskDisplayWrapper><Text variant='h1' status='error'>Risk is {value}</Text></StyledSoftServePstlRiskDisplayWrapper>;

    case 'Medium':
      return <StyledSoftServePstlRiskDisplayWrapper><Text variant='h1' status='warning'>Risk is {value}</Text></StyledSoftServePstlRiskDisplayWrapper>;

      case 'Low':
        return <StyledSoftServePstlRiskDisplayWrapper><Text variant='h1' status='success'>Risk is {value}</Text></StyledSoftServePstlRiskDisplayWrapper>;

      case 'Very High':
        return <StyledSoftServePstlRiskDisplayWrapper><Text variant='h1' status='error'>Risk is {value}</Text></StyledSoftServePstlRiskDisplayWrapper>;

    default:
      return <StyledSoftServePstlRiskDisplayWrapper><Text>Risk is undefined</Text></StyledSoftServePstlRiskDisplayWrapper>; ;
  }
}

SoftServePstlRiskDisplay.defaultProps = {
  value: '',
 // placeholder: '',
 // disabled: false,
 // readOnly: false,
 // required: false,
 // testId: null
};

SoftServePstlRiskDisplay.propTypes = {
  // label: PropTypes.string,
  value: PropTypes.string,
  // placeholder: PropTypes.string,
  // getPConnect: PropTypes.func.isRequired,
  // disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // testId: PropTypes.string
};

export default SoftServePstlRiskDisplay;
