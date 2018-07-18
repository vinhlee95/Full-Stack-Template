import React, { Component } from 'react';
import {Button, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddItemForm from './AddItemForm';
import SlideModal from './UI/SlideModal';
import Modal from './UI/Modal';
import Spinner from './UI/Spinner';
import Snackbar from './UI/Snackbar';

class App extends Component {

   state = {
      showAddModal: false,
      showSpinner: false,
      dataSaved: false,
   }

   handleCloseModal = () => this.setState({ showAddModal: false });
   handleShowSpinner = () => this.setState({ showSpinner: true })
   handleSaveSuccess = () => this.setState({showSpinner: false, dataSaved: true })

   render() {
      if(this.state.showSpinner) {
         return <Spinner />;
      }
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
            {
               this.state.dataSaved
               ?
               <Snackbar 
                  snackbarOpen
                  handleCloseSnackbar={() => this.setState({ dataSaved: false })} />
               : null
            }

            {/* Add Modal */}
            {
               this.state.showAddModal
               ?
               <Modal handleClickBackDrop={this.handleCloseModal}>
                  <SlideModal showModal={this.state.showAddModal} handleCloseModal={this.handleCloseModal}>
                     <AddItemForm 
                        handleCloseModal={this.handleCloseModal}
                        handleShowSpinner={this.handleShowSpinner}
                        handleSaveSuccess={this.handleSaveSuccess}
                     />
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
