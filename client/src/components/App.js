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
      itemRemoved: false,
   }

   componentWillMount() {
      this.props.fetchItems();
   }

   componentWillReceiveProps(nextProps) {
      const oldItems = this.props.items; console.log('old items', oldItems)
      const newItems = nextProps.items; console.log('new items', newItems)
      if(oldItems.length < newItems.length & oldItems.length !== 0) {
         this.setState({ showSpinner: false, dataSaved: true, itemRemoved: false })
         this.props.fetchItems();
      } 
      if(oldItems.length > newItems.length) {
         this.setState({ dataSaved: true, itemRemoved: true })
      }
   }


   handleCloseModal = () => this.setState({ showAddModal: false });
   handleShowSpinner = () => this.setState({ showSpinner: true });

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
                  id={item._id}
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
                  label={
                     this.state.itemRemoved
                     ?
                     'Item removed'
                     :
                     'New item added'
                  }
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
