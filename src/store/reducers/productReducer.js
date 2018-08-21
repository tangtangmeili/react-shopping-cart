import { FETCH_PRODUCTS,FAVORITE } from '../actions/types';


const initialState = {
  items: [],
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_PRODUCTS:
      return {
        ...state,
        items: action.payload
      }
    case FAVORITE:
      console.log("state is",state);
      console.log("hello",action.payload);
      return{
        ...state,
        items:action.payload
      }
    default:
      return state;
  }
}