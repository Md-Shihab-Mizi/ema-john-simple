import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product.key);
    const { img, name, seller, price, stock, key} = props.product
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />

            </div>
            <div>
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link> </h4>

                <p><small className="margin">by : {seller}</small></p>
                <p className="margin">${price}</p>

                <p><small className="margin">Only {stock} left in stock</small></p>
               {props.showAddToCart === true && <button className= "main-button" onClick ={()=>props.addHandleProduct(props.product)}>  <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>

        </div>
    );
};

export default Product;