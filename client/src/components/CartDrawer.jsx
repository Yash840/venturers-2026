import React from 'react';

export default function CartDrawer({ isCartOpen, closeCart, cart, removeFromCart }) {
  return (
    <>
      <div className={`cart-drawer-overlay ${isCartOpen ? 'on' : ''}`} id="cartOverlay" onClick={closeCart}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} id="cartDrawer">
        <div className="cart-drawer-head">
          <h3>Your Events</h3>
          <button className="cart-close" onClick={closeCart}>✕</button>
        </div>
        <div className="cart-drawer-items" id="cartItems">
          {cart.length === 0 ? (
            <div className="cart-empty"><span>🎯</span>No events added yet.<br />Browse events and add to cart.</div>
          ) : (
            cart.map(item => (
              <div key={`c-${item.id}`} className="cart-item-row">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-day">{item.day}</div>
                </div>
                <button className="cart-item-rm" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-drawer-foot">
          <button className="cart-proceed" onClick={() => {
            closeCart();
            document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
          }}>Proceed to Register →</button>
          <p className="cart-note">Open to all branches · Total prize pool ₹10,000</p>
        </div>
      </div>
    </>
  );
}
