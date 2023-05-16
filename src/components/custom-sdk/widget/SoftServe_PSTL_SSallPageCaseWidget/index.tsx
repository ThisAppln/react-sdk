/* eslint-disable react/no-unused-prop-types */
import React, {useState} from "react";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import Utils from '@pega/react-sdk-components/lib/components/helpers/utils';
import StyledSoftServePstlSSallPageCaseWidgetWrapper from './styles';

declare const PCore: any;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  popover: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  }
}));

// Duplicated runtime code from React SDK

// Page Case Widget example

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallPageCaseWidget(props) {
  // const componentName = "Operator";
  const {
    label,
    createLabel,
    updateLabel,
    createOperator,
    updateOperator,
    createDateTime,
    updateDateTime
  } = props;
  const classes = useStyles();

  const fieldLabel = label.toLowerCase();
  let caseOpLabel = "---";
  let caseOpName = "---";
  let caseOpId = "";
  let caseTime = null;

  if (fieldLabel === "create operator") {
    caseOpLabel = createLabel;
    caseOpName = createOperator.userName;
    caseTime = createDateTime;
    caseOpId = createOperator.userId;
  } else if (fieldLabel === "update operator") {
    caseOpLabel = updateLabel;
    caseOpName = updateOperator.userName;
    caseTime = updateDateTime;
    caseOpId = updateOperator.userId;
  }

  // Popover-related
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [popoverFields, setPopoverFields] = useState<Array<any>>([]);

  const popoverOpen = Boolean(popoverAnchorEl);
  const popoverId = popoverOpen ? 'operator-details-popover' : undefined;

  const handlePopoverClose = (() => {
    setPopoverAnchorEl(null);
  })

  function showOperatorDetails(event) {

    const operatorPreviewPromise = PCore.getUserApi().getOperatorDetails(caseOpId);

    operatorPreviewPromise.then((res) => {
      const fillerString = "---";
      let fields: any = [];
      if (
        res.data &&
        res.data.pyOperatorInfo &&
        res.data.pyOperatorInfo.pyUserName
      ) {
        fields = [
          {
            id: "pyPosition",
            name: "Position",
            value: res.data.pyOperatorInfo.pyPosition ? res.data.pyOperatorInfo.pyPosition : fillerString
          },
          {
            id: "pyOrganization",
            name: "Organization",
            value: res.data.pyOperatorInfo.pyOrganization ? res.data.pyOperatorInfo.pyOrganization : fillerString
          },
          {
            id: "ReportToUserName",
            name: "Reports to",
            value: res.data.pyOperatorInfo.pyReportToUserName ? res.data.pyOperatorInfo.pyReportToUserName : fillerString
          },
          {
            id: "pyTelephone",
            name: "Telephone",
            value: res.data.pyOperatorInfo.pyTelephone ? <a href={`tel:${res.data.pyOperatorInfo.pyTelephone}`}>{res.data.pyOperatorInfo.pyTelephone}</a> : fillerString
          },
          {
            id: "pyEmailAddress",
            name: "Email address",
            value: res.data.pyOperatorInfo.pyEmailAddress ? <a href={`mailto:${res.data.pyOperatorInfo.pyEmailAddress}`}>{res.data.pyOperatorInfo.pyEmailAddress}</a> : fillerString
          }
        ];
      } else {
        // eslint-disable-next-line no-console
        console.log(`Operator: PCore.getUserApi().getOperatorDetails(${caseOpId}); returned empty res.data.pyOperatorInfo.pyUserName - adding default`);
        fields = [
          {
            id: "pyPosition",
            name: "Position",
            value: fillerString
          },
          {
            id: "pyOrganization",
            name: "Organization",
            value: fillerString
          },
          {
            id: "ReportToUserName",
            name: "Reports to",
            value: fillerString
          },
          {
            id: "pyTelephone",
            name: "Telephone",
            value: fillerString
          },
          {
            id: "pyEmailAddress",
            name: "Email address",
            value: fillerString
          }
        ];
      }
      // Whatever the fields are, update the component's popoverFields
      setPopoverFields(fields);
    });

    setPopoverAnchorEl(event.currentTarget);
  }

  function getPopoverGrid() {
    // return popoverFields.map((field) => {
    //   return <div className={classes.popover}>{field.name}: {field.value}</div>
    // })

    if (popoverFields.length === 0) {
      return;
    }

    // There are fields, so build the grid.
    return <Grid container className={classes.popover} spacing={1}>
      <Grid item xs={12}><Typography variant="h6">{caseOpName}</Typography></Grid>
      {popoverFields.map((field) => {
        return <React.Fragment key={field.id}>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={6}><Typography variant="caption">{field.name}</Typography></Grid>
            <Grid item xs={6}><Typography variant="subtitle2">{field.value}</Typography></Grid>
          </Grid>
        </React.Fragment>
      })}
    </Grid>

  }

  // End of popover-related


  return <StyledSoftServePstlSSallPageCaseWidgetWrapper><React.Fragment>
      <TextField
        defaultValue={caseOpName}
        label={caseOpLabel}
        onClick={showOperatorDetails}
        InputProps={{
          readOnly: true,
          disableUnderline: true,
          inputProps: {style: {cursor: 'pointer'}}
        }}
      />
      <br />
      {Utils.generateDateTime(caseTime, "DateTime-Since")}

      <Popover
        id={popoverId}
        open={popoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{ vertical: 'top', horizontal: 'center'}}
        PaperProps={{ style: {maxWidth: '45ch'}}}
      >
        {getPopoverGrid()}
      </Popover>
    </React.Fragment>
	</StyledSoftServePstlSSallPageCaseWidgetWrapper>;

}

SoftServePstlSSallPageCaseWidget.defaultProps = {
  createLabel: null,
  updateLabel: null,
  createOperator: null,
  updateOperator: null,
  createDateTime: null,
  updateDateTime: null
};

SoftServePstlSSallPageCaseWidget.propTypes = {
  getPConnect: PropTypes.func.isRequired,
  label: PropTypes.string,
  createLabel: PropTypes.string,
  updateLabel: PropTypes.string,
  resolveLabel: PropTypes.string,
  createOperator: PropTypes.objectOf(PropTypes.any),
  updateOperator: PropTypes.objectOf(PropTypes.any),
  resolveOperator: PropTypes.objectOf(PropTypes.any),
  createDateTime: PropTypes.string,
  updateDateTime: PropTypes.string,
  resolveDateTime: PropTypes.string,
  hideLabel: PropTypes.bool
};
