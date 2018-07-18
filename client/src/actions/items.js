import { SAVE_DATA, UPLOAD_IMAGE, FETCH_ITEMS } from './types';
import axios from 'axios';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ds2t6ps9w/image/upload'

export const fetchItems = () => async (dispatch) =>  {
   const res = await axios.get('http://localhost:5000');
   dispatch({ 
      type: FETCH_ITEMS,
      payload: res.data
   })
}


export const saveData = (name, description, url, category, price, imageUrl, callback) => async (dispatch) => {

   // upload data to MongoDB;
   const res = await axios.post('http://localhost:5000/upload', {
      name,
      description,
      url,
      category,
      price,
      imageUrl
   });
   if(res) { callback() };
   console.log('Data is uploaded to mongoDB')
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