
import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, Typography, CardActions, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


import StyledSoftServePstlSSallPageWidgetWrapper from './styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderLeft: "6px solid",
    borderLeftColor: theme.palette.primary.light
  },
}));

// Duplicated runtime code from React SDK

// Page Widget example is the "App Announcment"

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function SoftServePstlSSallPageWidget(props) {
  const { header, description, datasource, whatsnewlink } = props;
  let details = [];
  if (datasource && datasource.source) {
    details = datasource.source.map((item) => {
      return item.name;
    });
  }

  const classes = useStyles();

  const handleClick = () => {
    window.open(whatsnewlink);
  }

  return (
    <StyledSoftServePstlSSallPageWidgetWrapper>
    <Card title="AppAnnouncement" className={classes.root}>
      <CardHeader title={<Typography variant="h6">{header}</Typography>} />
      <CardContent>
        <Typography variant="body1" gutterBottom>{description}</Typography>
        {
          details.map((itm, idx) => {
            const theKey = `AppAnn-item-${idx}`;
            return (
              <Typography key={theKey} variant="body2">- {itm}</Typography>
            )
          })
        }
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={handleClick} size="small">See what&apos;s new</Button>
      </CardActions>
    </Card>
    </StyledSoftServePstlSSallPageWidgetWrapper>
  );

}

SoftServePstlSSallPageWidget.defaultProps = {
  header: PropTypes.string,
  description: PropTypes.string,
  datasource: PropTypes.instanceOf(Object),
  whatsnewlink: PropTypes.string
};

SoftServePstlSSallPageWidget.propTypes = {
  header: "",
  description: "",
  // image: "",
  datasource: [],
  whatsnewlink: ""
};
