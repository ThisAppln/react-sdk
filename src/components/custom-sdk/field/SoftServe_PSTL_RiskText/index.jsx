import PropTypes from 'prop-types';
import { Text, Input, Label } from '@pega/cosmos-react-core';

import StyledSoftServePstlRiskTextWrapper from './styles';


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const SoftServePstlRiskText = props => {
  // const { getPConnect, value, placeholder, disabled, readOnly, required, label, testId } = props;

  const { getPConnect, value } = props;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn?.getStateProps()?.value;

  const handleOnChange = event => {
    const { value: updatedValue } = event.target;
    actions.updateFieldValue(propName, updatedValue);
  };


  switch (value) {
    case 'High':
      return <StyledSoftServePstlRiskTextWrapper><Text variant='h1' status={'error'}>Risk is {value}</Text></StyledSoftServePstlRiskTextWrapper>;
      break;
    case 'Medium':
      return <StyledSoftServePstlRiskTextWrapper><Text variant='h1' status={'warning'}>Risk is {value}</Text></StyledSoftServePstlRiskTextWrapper>;
      break;
      case 'Low':
        return <StyledSoftServePstlRiskTextWrapper><Text variant='h1' status={'success'}>Risk is {value}</Text></StyledSoftServePstlRiskTextWrapper>;
      break;
      case 'Very High':
        return <StyledSoftServePstlRiskTextWrapper><Text variant='h1' status={'error'}>Risk is {value}</Text></StyledSoftServePstlRiskTextWrapper>;
      break;
    default:
      return <StyledSoftServePstlRiskTextWrapper><Text>Risk is undefined</Text></StyledSoftServePstlRiskTextWrapper>; ;
  }
}

SoftServePstlRiskText.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

SoftServePstlRiskText.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default SoftServePstlRiskText;
