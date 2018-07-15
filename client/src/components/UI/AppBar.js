import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#59a5f2'}}>
        <Toolbar>
          <Typography variant="title" style={{ color: 'white' }}>
            Your shopping list
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(SimpleAppBar);
