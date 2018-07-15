import React, { Component } from 'react';
import {Typography, Input, TextField, Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
// import { addItem } from '../actions';
// import { connect } from 'react-redux';

class AddItemForm extends Component {
   state = { name: '', url: '', category: '', price: '' }

   handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

   // handleAddItem = (e) => {
   //    e.preventDefault();
   //    this.props.addItem(this.state.name, () => {
   //       this.props.handleCloseModal();
   //    });
   // }

   render() {
      // console.log(this.state)
      return(
         <form style={{ backgroundColor: 'white', zIndex: 1000}} onSubmit={e => this.handleAddItem(e)}>
            <Typography variant="headline" id="modal-title">
               Your item
            </Typography>

            <TextField
               label="Name"
               value={this.state.name}
               inputProps = {{
                  name: 'name'
               }}
               onChange={this.handleChange}
               placeholder="Name"
               fullWidth
               style={{ marginBottom: 10 }}
            />

            <FormControl style={{ width: '100%',marginBottom: 10}}>
               <InputLabel>Categories</InputLabel>
               <Select
                  value={this.state.category}
                  onChange={this.handleChange}
                  inputProps={{
                     name: 'category',
                  }}
               >
                  <MenuItem value="">
                  <em>None</em>
                  </MenuItem>
                  <MenuItem value='laptop'>Laptop</MenuItem>
                  <MenuItem value='phone'>Phone</MenuItem>
                  <MenuItem value='watch'>Watch</MenuItem>
               </Select>
            </FormControl>

            <TextField
               label="Price (€)"
               value={this.state.price}
               inputProps = {{
                  name: 'price'
               }}
               onChange={this.handleChange}
               placeholder="Price"
               fullWidth
               style={{ marginBottom: 10 }}
            />

            <TextField
               label="Url"
               value={this.state.url}
               inputProps = {{
                  name: 'url'
               }}
               onChange={this.handleChange}
               placeholder="Url"
               fullWidth
            />

            <Button variant="contained" className='add-file-button'
               style={{backgroundColor: '#8bc34a', width: '100%', height: 30, marginTop: 20}}>
               <Input type='file' className='add-file-input'/>
               <div className='add-file-text-row'>
                  <Typography variant='button' >Add images</Typography>
               </div>
            </Button>
            
            <div className='confirm-button-row'>
               <Button 
                  variant="contained" color="primary" fullWidth
                  style={{
                     marginTop: 20,
                     backgroundColor: '#59a5f2',
                  }}>
                  <Typography variant='button'>Add to wish list</Typography>
               </Button>
               <Button 
                  onClick={this.props.handleCloseModal}
                  variant="contained" color="secondary" fullWidth
                  style={{
                     marginTop: 20,
                  }}>
                  <Typography variant='button'>Cancel</Typography>
               </Button>
            </div>
         </form>
      );
   }
}

export default(AddItemForm);