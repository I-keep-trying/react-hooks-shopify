import React from 'react';
import Product from './Product';

const Products = (props) => {
  
    let products;
    if (props.products) {
    products = props.products.map((product) => {
        return (
          <Product
            addVariantToCart={props.addVariantToCart}
            client={props.client}
            key={product.id.toString()}
            product={product}
          />
        );
      });
    } else {
      products = <p>Loading...</p>
    }
    products.reverse(); // CHFE 2018.10.15 - this makes it so the products are shown newest to oldest on first load
    return (
        <>
      <div className="Product-wrapper">
        {products}
      </div>
     
      </>
    );
}

export default Products;
