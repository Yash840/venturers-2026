import React, { useEffect, useRef, useState } from 'react';

export default function Register({ cart, removeFromCart, showToast }) {
  const qrRef = useRef(null);
  const [btnText, setBtnText] = useState("Register for VENTURERS 2026 →");
  const [btnBg, setBtnBg] = useState("var(--gold)");
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (qrRef.current && window.QRCode) {
      qrRef.current.innerHTML = '';
      try {
        new window.QRCode(qrRef.current, {
          text: 'upi://pay?pa=edc.venturers@bank&pn=VENTURERS%202026&cu=INR',
          width: 128,
          height: 128,
          colorDark: '#05050a',
          colorLight: '#f2ede3',
          correctLevel: window.QRCode.CorrectLevel.M
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const submitForm = () => {
    setBtnText("✓ You're Registered for VENTURERS 2026!");
    setBtnBg("#2ecc71");
    setBtnDisabled(true);
    showToast('Registration successful! Check your email for confirmation.');
  };

  return (
    <section id="register">
      <div className="container">
        <div className="reg-wrap reveal">
          <p className="s-label" style={{ textAlign: 'center', display: 'block', marginBottom: '12px' }}>Join the Movement</p>
          <h2>Secure Your Spot</h2>
          <p>Registration open to all students. Add events to your cart above, or select below.</p>
          
          <div className={`cart-summary-box ${cart.length > 0 ? 'show' : ''}`} id="regCartBox">
            <div className="cart-summary-label">Events in your cart</div>
            <div className="cart-items-list" id="regCartList">
              {cart.map(item => (
                <span key={`rt-${item.id}`} className="cart-tag">
                  {item.name} <span className="rm" onClick={() => removeFromCart(item.id)}>✕</span>
                </span>
              ))}
            </div>
          </div>
          
          <div className="form-row">
            <input className="inp" type="text" placeholder="Full Name" id="reg-name" />
            <input className="inp" type="text" placeholder="College / Branch" id="reg-college" />
          </div>
          <div className="form-row">
            <input className="inp" type="email" placeholder="Email Address" id="reg-email" />
            <input className="inp" type="tel" placeholder="Phone Number" id="reg-phone" />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <select className="inp" id="reg-event" style={{ appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }} defaultValue="">
              <option value="" disabled>Select Event (or use cart above)</option>
              <option>Shark Tank — ₹100</option>
              <option>Zero to One — Makeathon — ₹200</option>
              <option>Chai Pe Charcha! — Free</option>
              <option>Game of Brands — Brand War — ₹150</option>
              <option>Cric Auction — ₹200</option>
              <option>Thrones of Wall Street — ₹150</option>
              <option>Guest Session — Free</option>
              <option>All Events (General Pass)</option>
            </select>
          </div>
          
          <div className="reg-payment-block">
            <div className="reg-payment-copy">
              <div className="reg-payment-label">Pay via UPI</div>
              <p className="reg-payment-desc">Scan the QR to complete payment for paid events. Mention your name and event in the note. Replace the UPI ID below with your official treasury ID before going live.</p>
              <p className="reg-payment-upi" id="regPaymentUpiText">upi://pay?pa=edc.venturers@bank&amp;pn=VENTURERS%202026&amp;cu=INR</p>
            </div>
            <div className="reg-qr-box" id="paymentQrWrap" title="Payment QR">
              <div id="paymentQr" ref={qrRef}></div>
            </div>
          </div>
          
          <button className="btn-submit" style={{ background: btnBg }} onClick={submitForm} disabled={btnDisabled}>
            {btnText}
          </button>
          <p className="reg-note">Total prize pool ₹10,000 · Open to all branches · Limited seats available</p>
        </div>
      </div>
    </section>
  );
}
