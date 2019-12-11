import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import Cart from './components/shopify/Cart2'
import store from './store'
/* 
Contents of ./store, just three lines:
import {createStore} from 'redux';
import reducer from './reducers/cart';
export default createStore(reducer);
*/

// custom components
import Nav from './components/Nav2'
import GenericProductsPage from './components/GenericProductsPage2'



const App = () => {

  const updateQuantityInCart = (lineItemId, quantity) => {
    const state = store.getState() // state from redux store
    const checkoutId = state.checkout.id
    const lineItemsToUpdate = [
      { id: lineItemId, quantity: parseInt(quantity, 10) },
    ]
    state.client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then(res => {
        store.dispatch({
          type: 'UPDATE_QUANTITY_IN_CART',
          payload: { checkout: res },
        })
      })
  }

  const removeLineItemInCart = (lineItemId) => {
    const state = store.getState() // state from redux store
    const checkoutId = state.checkout.id
    state.client.checkout
      .removeLineItems(checkoutId, [lineItemId])
      .then(res => {
        store.dispatch({
          type: 'REMOVE_LINE_ITEM_IN_CART',
          payload: { checkout: res },
        })
      })
  }

  const handleCartClose = () => {
    store.dispatch({ type: 'CLOSE_CART' })
  }

  const handleCartOpen = () => {
    store.dispatch({ type: 'OPEN_CART' })
  }
  

    const state = store.getState() // state from redux store
    return (
      <div className="App">
        <Nav handleCartOpen={handleCartOpen} />
        <header className="App-header">
          <p>Shopify Store dev-store9</p>
        </header>
        <Cart
          checkout={state.checkout}
          isCartOpen={state.isCartOpen}
          handleCartClose={handleCartClose}
          updateQuantityInCart={updateQuantityInCart}
          removeLineItemInCart={removeLineItemInCart}
        />
        <GenericProductsPage />
       {/*  <pre>{JSON.stringify(state, null, 2)}</pre>  */}

      </div>
    )
  
}

export default connect(state => state)(App)
