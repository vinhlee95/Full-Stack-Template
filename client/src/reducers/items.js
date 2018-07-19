import { FETCH_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

export default (state=[], action) => {
   switch(action.type) {
      case FETCH_ITEMS:
         return action.payload;

      case ADD_ITEM:
         return [...state, action.payload];

      case DELETE_ITEM:
         return action.payload;

      default:
         return state;
   }
}