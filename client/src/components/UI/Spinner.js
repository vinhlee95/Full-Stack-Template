import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div style={{
       display: 'flex',
       width: '100%', height: '100vh',
       flexDirection: 'column',
       justifyContent: 'center', alignItems: 'center',
    }}>
      <CircularProgress 
         className={classes.progress} 
         size={100}
      />
    </div>
  );
}


export default withStyles(styles)(CircularIndeterminate);