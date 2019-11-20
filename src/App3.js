import React, { useState, useReducer, createContext, useContext } from 'react'
import './App.css'
import { connect } from 'react-redux'
import Cart from './components/shopify/Cart2'
// import store from './store'
import reducer from './reducers/cart2'
/* 
Contents of ./store, just three lines:
import {createStore} from 'redux';
import reducer from './reducers/cart';
export default createStore(reducer);
*/

// custom components
import Nav from './components/Nav2'
import GenericProductsPage from './components/GenericProductsPage2'

const initState = {
    isCartOpen: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {},
  }

const initReducer = (state, action) => {
    switch (action.type) {
      case 'CLIENT_CREATED':
        return 'CLIENT_CREATED'
      case 'PRODUCTS_FOUND':
        return 'PRODUCTS_FOUND'
      case 'CHECKOUT_FOUND':
        return 'CHECKOUT_FOUND'
      case 'SHOP_FOUND':
        return 'SHOP_FOUND'
      case 'ADD_VARIANT_TO_CART':
        return 'ADD_VARIANT_TO_CART'
      case 'UPDATE_QUANTITY_IN_CART':
        return 'UPDATE_QUANTITY_IN_CART'
      case 'REMOVE_LINE_ITEM_IN_CART':
        return 'REMOVE_LINE_ITEM_IN_CART'
      case 'OPEN_CART':
        return 'OPEN_CART'
      case 'CLOSE_CART':
        return 'CLOSE_CART'
      default:
        return state
    }
  }

const DispatchContext = createContext(null)

const useCombinedReducer = combinedReducers => {
  const state = Object.keys(combinedReducers).reduce(
    (acc, key) => ({ ...acc, [key]: combinedReducers[key][0] }),
    {}
  )

  const dispatch = action =>
    Object.keys(combinedReducers)
      .map(key => combinedReducers[key][1])
      .forEach(fn => fn(action))

  return [state, dispatch]
}

const App = () => {
  const [state, dispatch] = useCombinedReducer({
    init: useReducer(initReducer, 'CLIENT_CREATED'),
    actionPayload: useReducer(reducer, initState),
  })

  const updateQuantityInCart = (lineItemId, quantity) => {
   // const state = store.getState() // state from redux store
   const dispatch = useContext(DispatchContext) 
   const checkoutId = state.actionPayload.checkout.id
    const lineItemsToUpdate = [
      { id: lineItemId, quantity: parseInt(quantity, 10) },
    ]
    state.actionPayload.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then(res => {
        dispatch({
          type: 'UPDATE_QUANTITY_IN_CART',
          payload: { checkout: res },
        })
      })
  }

  const removeLineItemInCart = lineItemId => {
   // const state = store.getState() // state from redux store
    const checkoutId = state.checkout.id
    state.client.checkout
      .removeLineItems(checkoutId, [lineItemId])
      .then(res => {
        dispatch({
          type: 'REMOVE_LINE_ITEM_IN_CART',
          payload: { checkout: res },
        })
      })
  }

  const handleCartClose = () => {
    dispatch({ type: 'CLOSE_CART' })
  }

  const handleCartOpen = () => {
    dispatch({ type: 'OPEN_CART' })
  }

 // const state = store.getState() // state from redux store
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
    </div>
  )
}

export default connect(state => state)(App)
