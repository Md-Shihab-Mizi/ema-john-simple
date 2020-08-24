import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    // console.log(props);
    const { img, name, seller, price, stock } = props.product
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />

            </div>
            <div>
                <h4 className="product-name">{name}</h4>

                <p><small className="margin">by : {seller}</small></p>
                <p className="margin">${price}</p>

                <p><small className="margin">Only {stock} left in stock</small></p>
                <button className= "main-button" onClick ={()=>props.addHandleProduct(props.product)}>  <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>

        </div>
    );
};

export default Product;