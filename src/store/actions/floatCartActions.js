import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT,ADD_QUANTITY,MINUS_QUANTITY } from './types';


export const loadCart = (cartProducts) => dispatch => {
  dispatch({
    type: LOAD_CART,
    payload: cartProducts,
  });
}

export const addProduct = (productData) => dispatch => {
  dispatch({
    type: ADD_PRODUCT,
    payload: productData,
  });
}

export const removeProduct = (productData) => dispatch => {
  dispatch({
    type: REMOVE_PRODUCT,
    payload: productData,
  });
}

export const addQuantity=(cartProduct)=>dispatch=>{
  cartProduct.quantity++;
  dispatch({
    type:ADD_QUANTITY,
    payload:cartProduct,
  })
}

export const minusQuantity=(cartProduct)=>dispatch=>{
  cartProduct.quantity=(cartProduct.quantity>1) ? (cartProduct.quantity-1):1;
  dispatch({
    type:MINUS_QUANTITY,
    payload:cartProduct
  })
}
