import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
// import AddItemForm from '../AddItemForm';

const styles = {
   modal: {
      padding: 20,
      textAlign: 'center',
   }
}

class SlideModal extends React.Component {

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    return (
        <div className='form-container'>
          <Slide direction="down" in={this.props.showModal} mountOnEnter unmountOnExit>
            <Paper elevation={4}>
              <div style={styles.modal}>
                  {this.props.children}
               </div>
            </Paper>
          </Slide>
        </div>
    );
  }
}

export default withStyles(styles)(SlideModal);