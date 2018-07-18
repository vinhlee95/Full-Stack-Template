import React, { Component } from 'react';
import {Button, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddItemForm from './AddItemForm';
import SlideModal from './UI/SlideModal';
import Modal from './UI/Modal';
import Spinner from './UI/Spinner';
import Snackbar from './UI/Snackbar';

import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from './UI/Card';

class App extends Component {

   state = {
      showAddModal: false,
      showSpinner: false,
      dataSaved: false,
   }

   componentWillMount() {
      this.props.fetchItems();
   }

   componentWillReceiveProps(nextProps) {
      console.log(this.props.items.length);
      console.log(nextProps.items.length);
      if(nextProps.items.length !== this.props.items.length) {
         this.props.fetchItems();
      }
   }


   handleCloseModal = () => this.setState({ showAddModal: false });
   handleShowSpinner = () => this.setState({ showSpinner: true })
   handleSaveSuccess = () => this.setState({showSpinner: false, dataSaved: true })

   render() {
      console.log('App rendered')
      if(this.state.showSpinner) {
         return <Spinner />;
      }

      // render items
      let items;
      if (!_.isEmpty(this.props.items)) {
         items = this.props.items.map((item) => {
            let price = `${item.price} €`;
            return(
               <Card
                  key={item._id}
                  name={item.name}
                  description={item.description}
                  image={item.imageUrl}
                  url={item.url}
                  chipLabel={item.category}
                  price={price}
               />
            );
         });
      } else {
         items = null;
      }
      
      return (
         <div className="App">
            <Typography variant="display1" gutterBottom>
               Your wish list
            </Typography>
            
            <div className="card-container">
               {items}
            </div>

            <div className='button-row'>
               <Button variant="fab" color="primary" aria-label="Add"
                  onClick={() => this.setState({ showAddModal: true })}>
                  <AddIcon />
               </Button>
            </div>
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
      );
   }
}

const mapStateToProps = ({ items }) => {
   return { items }
}

export default connect(mapStateToProps, actions )(App);
