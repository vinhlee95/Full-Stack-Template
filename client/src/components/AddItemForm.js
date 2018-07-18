import React, { Component } from 'react';
import {Typography, Input, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { connect } from 'react-redux';
import * as actions from '../actions';

const CLOUDINARY_UPLOAD_PRESET = "ak94q4cn";

class AddItemForm extends Component {
   state = { 
      name: '', url: '', category: '', price: '', file: null, imagePreviewUrl: '', uploadedFileUrl: '',
   }

   handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

   handleSelectImage = (event) => {
      let reader = new FileReader();
      let file = event.target.files[0];

      reader.onloadend = () => {
         this.setState({
            file,
            imagePreviewUrl: reader.result,
         })
      }

      reader.readAsDataURL(file);
   }

   handleAddItem = (e) => {
      e.preventDefault();
      const {name, url, category, price, file } = this.state;

      // create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      // invoke action creators
      
      // upload image to Cloudinary & show snackbar when done
      this.props.uploadImage(formData, (imageUrl) =>  {

         // save data to mongoDB
         this.props.saveData(name, url, category, price, imageUrl);

         this.props.handleSaveSuccess();
      })

      // hide the form and show the spinner
      this.props.handleCloseModal();
      this.props.handleShowSpinner();
   }

   render() {
      let { imagePreviewUrl } = this.state;
      let imagePreview = imagePreviewUrl ? 
                        <img 
                           src={imagePreviewUrl} alt='item'
                           style={styles.image} /> 
                        : null
      // show spinner while data is being saved

      return(
         <form style={{ backgroundColor: 'white', zIndex: 1000}} onSubmit={e => this.handleAddItem(e)} >
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
            
            {imagePreview}

            <Button variant="contained" className='add-file-button'
               style={{backgroundColor: '#8bc34a', width: '100%', height: 30, marginTop: 20}}>
               <Input type='file' name='file' className='add-file-input' onChange={this.handleSelectImage} />
               <div className='add-file-text-row'>
                  <Typography variant='button' >Add images</Typography>
               </div>
            </Button>
            
            <div className='confirm-button-row'>
               <Button 
                  onClick={this.handleAddItem}
                  type='submit'
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

const styles = {
   image: {
      width: 100,
      height: 100,
      borderRadius: 5,
      marginTop: 20
   },
   dropZone: {
      marginTop: 20,
   }
}

export default connect(null, actions)(AddItemForm);