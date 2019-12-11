import React from 'react'
import LineItem from './LineItem2'

const Cart = props => {
  const openCheckout = props => {
    window.open(props.checkout.webUrl)
  }

  let line_items
  if (props.checkout) {
    line_items = props.checkout.lineItems.map(line_item => {
      return (
        <LineItem
          updateQuantityInCart={props.updateQuantityInCart}
          removeLineItemInCart={props.removeLineItemInCart}
          key={line_item.id.toString()}
          line_item={line_item}
          variant={line_item.variant.title}
        />
      )
    })
  } else {
    line_items = <p>Loading...</p>
  }

  return (
    <div className={`Cart ${props.isCartOpen ? 'Cart--open' : ''}`}>
      <header className="Cart__header">
        <h2>Your cart</h2>
        <button onClick={props.handleCartClose} className="Cart__close">
          ×
        </button>
      </header>
      <ul className="Cart__line-items">Line items {line_items}</ul>
      <footer className="Cart__footer">
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Subtotal</div>
          {props.checkout && (
            <div className="Cart-info__pricing">
              <span className="pricing">$ {props.checkout.subtotalPrice}</span>
            </div>
          )}
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Taxes</div>
          {props.checkout && (
            <div className="Cart-info__pricing">
              <span className="pricing">$ {props.checkout.totalTax}</span>
            </div>
          )}
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Total</div>
          {props.checkout && (
            <div className="Cart-info__pricing">
              <span className="pricing">$ {props.checkout.totalPrice}</span>
            </div>
          )}
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">
            Donation Amount
          </div>
          {props.checkout && (
            <div className="Cart-info__pricing">
              <span className="pricing">
                ~$ {(props.checkout.totalPrice * 0.35).toFixed(2)}
              </span>
            </div>
          )}
        </div>
        <button className="Cart__checkout button" onClick={openCheckout}>
          Checkout
        </button>
      </footer>
    </div>
  )
}

export default Cart
