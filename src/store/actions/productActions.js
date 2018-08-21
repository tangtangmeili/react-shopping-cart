import { FETCH_PRODUCTS,FAVORITE } from './types';
import axios from 'axios';


const productsAPI = "http://localhost:8001/api/products";


const compare = {
  'lowestprice': (a, b) => {
    if (a.price < b.price)
      return -1;
    if (a.price > b.price)
      return 1;
    return 0;
  },
  'highestprice': (a, b) => {
    if (a.price > b.price)
      return -1;
    if (a.price < b.price)
      return 1;
    return 0;
  }
}

export const fetchProducts = (filters, sortBy, callback) => dispatch => {

  axios.get(productsAPI)
    .then(res => {
      let { products } = res.data;

      if(!!filters && filters.length > 0){
        products = products.filter( p => filters.find( f => p.availableSizes.find( size => size === f ) ) )
      }

      if(!!sortBy){
        products = products.sort(compare[sortBy]);
      }

      if(!!callback) {
        callback();
      }

     return dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      });

    })
    .catch(err => {
      console.log(err);
      throw new Error('Could not fetch products. Try again later.');
    });
}

export const favorite=(productId)=>dispatch=>{
  if(!localStorage.getItem('favorite')){
    new Promise((resolve,reject)=>{
      axios.get(`http://localhost:8001/favorite/${productId}`).then(res=>{
      
        resolve(res.data);
      })
    }).then(res=>{
      let {items}=res;
      localStorage.setItem('favorite',JSON.stringify(items));
      return dispatch({
        type:FAVORITE,
        payload:items
      })
    })
  }
  else{
    let dataItems=JSON.parse(localStorage.getItem('favorite'));
    let currentProduct=dataItems.items.filter(product=>product.id==productId);
    currentProduct[0].favoiteNum=currentProduct[0].favoiteNum+1;
    localStorage.setItem('favorite',JSON.stringify(dataItems));
    return dispatch({
      type:FAVORITE,
      payload:dataItems.items
    })
  }
 
}