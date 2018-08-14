import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT,ADD_QUANTITY,MINUS_QUANTITY } from '../actions/types';


const initialState = {
  items: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        items: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        item: Object.assign({}, action.payload)
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        itemToRemove: Object.assign({}, action.payload)
      };
    case ADD_QUANTITY:
      return{
        ...state,
        itemToChange:Object.assign({},action.payload)
      };
    case MINUS_QUANTITY:
      return{
        ...state,
        itemToChange:Object.assign({},action.payload)
      }
    default:
      return state;
  }
}
