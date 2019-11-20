import React from 'react'
import Products from './shopify/Products2';
import { connect } from 'react-redux'
import store from '../store';

const GenericProductsPage = () => {

  const addVariantToCart = (variantId, quantity) => {
    const state = store.getState(); // state from redux store
    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = state.checkout.id
    state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      store.dispatch({type: 'ADD_VARIANT_TO_CART', payload: {isCartOpen: true, checkout: res}});
    });
  }
    const state = store.getState(); // state from redux store
    let oProducts = <Products
      products={state.products}
      client={state.client}
      addVariantToCart={addVariantToCart}
    />;
    return(
      <div>
        <h1>Whoa, here's a generic Products Page / Section Title!</h1>
        <p>And here's a products page paragraph tag with a semicolon at the end signaling that the products are below:</p>
        {oProducts}
      </div>
    )
}

export default connect((state) => state)(GenericProductsPage);