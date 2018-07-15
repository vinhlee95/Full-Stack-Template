import { ADD_ITEM } from './types';
import axios from 'axios';

export const addItem = (name, category, price, url, selectedFile, callback) => async (dispatch) =>  {
   // do sth with the selected file
   console.log(selectedFile)

   const newItem = await axios.post('http://localhost:5000/newItem', {name, category, price, url, selectedFile});
   callback();
}