import { SAVE_DATA, UPLOAD_IMAGE } from './types';
import axios from 'axios';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ds2t6ps9w/image/upload'

export const uploadImage = (formData, callback) => async (dispatch) => {
   // upload the image to Cloudinary
   const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData)
   const imageUrl = res.data.secure_url;
   if (res) {
      // pass the imageUrl for callback
      // which calls action to save data to mongoDB
      callback(imageUrl)
   }
}

export const saveData = (name, url, category, price, imageUrl) => async (dispatch) => {

   // upload data to MongoDB;
   await axios.post('http://localhost:5000/upload', {
      name,
      url,
      category,
      price,
      imageUrl
   });
}