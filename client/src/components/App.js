import React, { Component } from 'react';
import {Button, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddItemForm from './AddItemForm';
import SlideModal from './UI/SlideModal';
import Modal from './UI/Modal';

class App extends Component {

   state = {
      showAddModal: true
   }

   handleCloseModal = () => this.setState({ showAddModal: false });

   render() {
      return (
         <div className="App">
            <Typography variant="display1" gutterBottom>
               Your wish list
            </Typography>
            <div className='button-row'>
            <Button variant="fab" color="primary" aria-label="Add"
               onClick={() => this.setState({ showAddModal: true })}>
               <AddIcon />
            </Button>

            {/* Add Modal */}
            {
               this.state.showAddModal
               ?
               <Modal handleClickBackDrop={this.handleCloseModal}>
                  <SlideModal showModal={this.state.showAddModal} handleCloseModal={this.handleCloseModal}>
                     <AddItemForm handleCloseModal={this.handleCloseModal} />
                  </SlideModal>
               </Modal>
               : null
            }

            </div>
         </div>
      );
   }
}

export default App;
