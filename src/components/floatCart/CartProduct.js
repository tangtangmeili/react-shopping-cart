import React, { Component } from 'react';
import PropTypes from "prop-types";

import Thumb from "./../Thumb";

import util from '../../util';


class CartProduct extends Component {
  constructor(props,context){
    super(props,context);
    this.state={
      isMouseOver: false,
      isToDisable:((this.props.product.quantity>1) ? false:true)
    }
  }
 
  handleMouseOver = () => {
    this.setState({isMouseOver: true});
  }

  handleMouseOut = () => {
    this.setState({isMouseOver: false});
  }
  componentWillReceiveProps(nextProps){
    console.log("今日頭條");
    this.setState({isToDisable:((this.props.product.quantity>1) ? false:true)})
  }
   
  render(){
    const { product, removeProduct,addQuantity,minusQuantity } = this.props;

    const classes = ['shelf-item'];

    if(!!this.state.isMouseOver){
      classes.push('shelf-item--mouseover');
    }

    return (
      <div className={classes.join(" ")}>
        <div
          className="shelf-item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={() => removeProduct(product)}
        />
        <Thumb
          classes="shelf-item__thumb"
          src={require(`../../static/products/${product.sku}_2.jpg`)}
          alt={product.title}
        />
        <div className="shelf-item__details">
          <p className="title">{product.title}</p>
          <p className="desc">
            {`${product.availableSizes[0]} | ${product.style}`} <br />
          </p>
          <dl className="quantity">
            <dt className="q-title">Quantity</dt>
            <dd>
              <span className="q-stock">
                <a className={this.state.isToDisable?"q-reduce disabled":"q-reduce"} title="minus1" onClick={()=>minusQuantity(product)}>-</a>
                <input type="text" className="q-text" title="Please input the quantity"  value={(product.quantity)}/>
                <a className="q-add" title="add1" onClick={()=>addQuantity(product)}>+</a>
              </span>
            </dd>
        </dl> 
         
        </div>
        <div className="shelf-item__price">
          <p>{`${product.currencyFormat}  ${util.formatPrice(product.price*product.quantity)}`}</p>
        </div>

        <div className="clearfix" />
      </div>
    );
  }
}


CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default CartProduct;