import { FETCH_ITEMS, DELETE_ITEM, ADD_ITEM } from './types';
import axios from 'axios';

const ROOT_URL = 'http://localhost:5000';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ds2t6ps9w/image/upload'

export const fetchItems = () => async (dispatch) =>  {
   const res = await axios.get(ROOT_URL);
   dispatch({ 
      type: FETCH_ITEMS,
      payload: res.data
   })
}


export const addItem = (name, description, url, category, price, imageUrl) => async (dispatch) => {

   // upload data to MongoDB;
   const res = await axios.post(`${ROOT_URL}/upload`, {
      name,
      description,
      url,
      category,
      price,
      imageUrl
   });
   console.log('Data is uploaded to mongoDB')
   dispatch({
      type: ADD_ITEM,
      payload: res.data
   })
}

export const uploadImage = (formData, callback) => async (dispatch) => {
   // upload the image to Cloudinary
   const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData)
   console.log('Image was successfully uploaded, now prepare to upload data to mongoDB')
   const imageUrl = res.data.secure_url;
   if (res) {
      // pass the imageUrl for callback
      // which calls action to save data to mongoDB
      callback(imageUrl)
   }
}

export const deleteItem = (id) => async (dispatch) => {
   const res = await axios.get(`${ROOT_URL}/item/${id}`);
   dispatch({
      type: DELETE_ITEM,
      payload: res.data
   })
}