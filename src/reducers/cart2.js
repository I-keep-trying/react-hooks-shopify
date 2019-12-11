// initial state
const initState = {
  isCartOpen: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
}

// actions
/* I moved these to `App3.js` yes I have a 3rd copy lol 
That is the only component with 3 copies, so far.
Because `App2.js` still works after making it a functional component.
Then I decided I needed a sandbox copy for messing with state hooks.
App3 is still not working :( 
*/


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
