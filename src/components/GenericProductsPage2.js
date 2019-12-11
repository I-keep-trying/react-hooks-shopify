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
    /> ;
    return(
      <div>
        <h1>dev-store9</h1>
        <p>Sandbox store with fake products</p>
        <br />
        <p>Built with React 16.11.0, Redux, and shopify-buy</p>
        {oProducts}
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
      
    )
}

export default connect((state) => state)(GenericProductsPage);