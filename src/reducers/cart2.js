// initial state
const initState = {
  isCartOpen: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
}

// actions
/* const filterReducer = (state, action) => {
  switch (action.type) {
    case 'CLIENT_CREATED':
      return 'INIT'
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
} */
/* const CLIENT_CREATED = 'CLIENT_CREATED'
const PRODUCTS_FOUND = 'PRODUCTS_FOUND'
const CHECKOUT_FOUND = 'CHECKOUT_FOUND'
const SHOP_FOUND = 'SHOP_FOUND'
const ADD_VARIANT_TO_CART = 'ADD_VARIANT_TO_CART'
const UPDATE_QUANTITY_IN_CART = 'UPDATE_QUANTITY_IN_CART'
const REMOVE_LINE_ITEM_IN_CART = 'REMOVE_LINE_ITEM_IN_CART'
const OPEN_CART = 'OPEN_CART'
const CLOSE_CART = 'CLOSE_CART' */

// reducer
export default (state = initState, action) => {
  switch (action.type) {
    case 'CLIENT_CREATED':
      return { ...state, client: action.payload }
    case 'PRODUCTS_FOUND':
      return { ...state, products: action.payload }
    case 'CHECKOUT_FOUND':
      return { ...state, checkout: action.payload }
    case 'SHOP_FOUND':
      return { ...state, shop: action.payload }
    case 'ADD_VARIANT_TO_CART':
      return {
        ...state,
        isCartOpen: action.payload.isCartOpen,
        checkout: action.payload.checkout,
      }
    case 'UPDATE_QUANTITY_IN_CART':
      return { ...state, checkout: action.payload.checkout }
    case 'REMOVE_LINE_ITEM_IN_CART':
      return { ...state, checkout: action.payload.checkout }
    case 'OPEN_CART':
      return { ...state, isCartOpen: true }
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false }
    default:
      return state
  }
}
