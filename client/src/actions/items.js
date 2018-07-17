import { ADD_ITEM } from './types';
import axios from 'axios';

export const addItem = (file) => async (dispatch) =>  {

   const newItem = await axios.post('http://localhost:5000/upload', file);
   // callback();
}