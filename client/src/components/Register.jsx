import React, { useEffect, useRef, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const EVENT_CATALOG = [
  { id: 'sharktank', title: 'Shark Tank', fee: 100 },
  { id: 'zerotone', title: 'Zero to One', fee: 200 },
  { id: 'chai', title: 'Chai Pe Charcha!', fee: 0 },
  { id: 'gob', title: 'Game of Brands', fee: 150 },
  { id: 'cric', title: 'Cric Auction', fee: 200 },
  { id: 'wallst', title: 'Thrones of Wall Street', fee: 150 },
  { id: 'guest', title: 'Guest Session', fee: 0 }
];

const PASS_TIER = {
  PREMIUM: 'Premium',
  CUSTOMIZED: 'Customized'
};

function getEventById(eventId) {
  return EVENT_CATALOG.find((eventItem) => eventItem.id === eventId);
}

function calculateBilling(passTier, selectedEventIds) {
  const selectedEvents = selectedEventIds
    .map((eventId) => getEventById(eventId))
    .filter(Boolean);

  const subtotal = selectedEvents.reduce((sum, eventItem) => sum + eventItem.fee, 0);

  let discountPercent = 0;
  if (passTier === PASS_TIER.PREMIUM) {
    discountPercent = 20;
  } else if (passTier === PASS_TIER.CUSTOMIZED && selectedEvents.length > 2) {
    discountPercent = 10;
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const payable = Math.max(subtotal - discountAmount, 0);

  return {
    subtotal,
    discountPercent,
    discountAmount,
    payable
  };
}

export default function Register({ cart, removeFromCart, showToast }) {
  const qrRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institute: '',
    course: '',
    phoneNumber: '',
    passTier: PASS_TIER.CUSTOMIZED
  });

  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const [eventToAdd, setEventToAdd] = useState('');
  const [paymentSSFile, setPaymentSSFile] = useState(null);

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

  useEffect(() => {
    if (formValues.passTier === PASS_TIER.PREMIUM) {
      setSelectedEventIds(EVENT_CATALOG.map((eventItem) => eventItem.id));
      setEventToAdd('');
    }
  }, [formValues.passTier]);

  useEffect(() => {
    if (formValues.passTier !== PASS_TIER.CUSTOMIZED) return;
    if (!Array.isArray(cart) || cart.length === 0) return;

    setSelectedEventIds((prev) => {
      const merged = new Set(prev);
      cart.forEach((cartItem) => {
        if (getEventById(cartItem.id)) merged.add(cartItem.id);
      });
      return Array.from(merged);
    });
  }, [cart, formValues.passTier]);

  const selectedEvents = selectedEventIds
    .map((eventId) => getEventById(eventId))
    .filter(Boolean);

  const billing = calculateBilling(formValues.passTier, selectedEventIds);

  const updateField = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const addSelectedEvent = () => {
    if (!eventToAdd) return;
    setSelectedEventIds((prev) => {
      if (prev.includes(eventToAdd)) return prev;
      return [...prev, eventToAdd];
    });
    setEventToAdd('');
  };

  const removeSelectedEvent = (eventId) => {
    setSelectedEventIds((prev) => prev.filter((id) => id !== eventId));
    const cartMatch = cart.find((item) => item.id === eventId);
    if (cartMatch) removeFromCart(eventId);
  };

  const submitForm = async () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'institute', 'course', 'phoneNumber'];
    const missing = requiredFields.find((field) => !formValues[field]?.trim());
    if (missing) {
      showToast('Please fill all required registration fields.');
      return;
    }

    if (selectedEventIds.length === 0) {
      showToast('Please select at least one event.');
      return;
    }

    setBusy(true);

    try {
      const payload = new FormData();
      payload.append('firstName', formValues.firstName.trim());
      payload.append('lastName', formValues.lastName.trim());
      payload.append('email', formValues.email.trim());
      payload.append('institute', formValues.institute.trim());
      payload.append('course', formValues.course.trim());
      payload.append('phoneNumber', formValues.phoneNumber.trim());
      payload.append('passTier', formValues.passTier);
      payload.append('eventsApplied', selectedEvents.map((eventItem) => eventItem.title).join(','));
      payload.append('billingAmount', String(billing.payable));
      if (paymentSSFile) {
        payload.append('paymentSS', paymentSSFile);
      }

      const response = await fetch(`${API_BASE_URL}/api/participants/register`, {
        method: 'POST',
        body: payload
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || 'Registration failed. Please try again.');
      }

      showToast('Registration successful! Your participant entry has been created.');
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        institute: '',
        course: '',
        phoneNumber: '',
        passTier: PASS_TIER.CUSTOMIZED
      });
      setSelectedEventIds([]);
      setEventToAdd('');
      setPaymentSSFile(null);
    } catch (error) {
      showToast(error?.message || 'Unable to submit registration right now.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="register">
      <div className="container">
        <div className="reg-wrap reveal">
          <p className="s-label" style={{ textAlign: 'center', display: 'block', marginBottom: '12px' }}>Join the Movement</p>
          <h2>Secure Your Spot</h2>
          <p>Choose your pass, build your event list, check payable amount, and complete payment via the QR below.</p>
          
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
            <input className="inp" type="text" placeholder="First Name" value={formValues.firstName} onChange={(event) => updateField('firstName', event.target.value)} />
            <input className="inp" type="text" placeholder="Last Name" value={formValues.lastName} onChange={(event) => updateField('lastName', event.target.value)} />
          </div>
          <div className="form-row">
            <input className="inp" type="email" placeholder="Email Address" value={formValues.email} onChange={(event) => updateField('email', event.target.value)} />
            <input className="inp" type="tel" placeholder="Phone Number" value={formValues.phoneNumber} onChange={(event) => updateField('phoneNumber', event.target.value)} />
          </div>
          <div className="form-row">
            <input className="inp" type="text" placeholder="Institute" value={formValues.institute} onChange={(event) => updateField('institute', event.target.value)} />
            <input className="inp" type="text" placeholder="Course" value={formValues.course} onChange={(event) => updateField('course', event.target.value)} />
          </div>

          <div className="reg-pass-wrap">
            <div className="reg-pass-head">Pass Tier</div>
            <div className="reg-pass-tabs">
              <button type="button" className={`reg-pass-btn ${formValues.passTier === PASS_TIER.PREMIUM ? 'active' : ''}`} onClick={() => updateField('passTier', PASS_TIER.PREMIUM)}>
                Premium Pass
              </button>
              <button type="button" className={`reg-pass-btn ${formValues.passTier === PASS_TIER.CUSTOMIZED ? 'active' : ''}`} onClick={() => updateField('passTier', PASS_TIER.CUSTOMIZED)}>
                Customized Pass
              </button>
            </div>
            <p className="reg-pass-note">
              Premium: all events with 20% discount. Customized: 10% discount only if more than 2 events are selected.
            </p>
          </div>

          {formValues.passTier === PASS_TIER.CUSTOMIZED ? (
            <div className="reg-event-picker">
              <div className="reg-pass-head">Select Events</div>
              <div className="reg-event-controls">
                <select
                  className="inp"
                  style={{ appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }}
                  value={eventToAdd}
                  onChange={(event) => setEventToAdd(event.target.value)}
                >
                  <option value="">Choose an event</option>
                  {EVENT_CATALOG.filter((eventItem) => !selectedEventIds.includes(eventItem.id)).map((eventItem) => (
                    <option key={eventItem.id} value={eventItem.id}>
                      {eventItem.title} — {eventItem.fee > 0 ? `INR ${eventItem.fee}` : 'Free'}
                    </option>
                  ))}
                </select>
                <button type="button" className="reg-add-event-btn" onClick={addSelectedEvent}>Add Event</button>
              </div>
            </div>
          ) : null}

          <div className={`cart-summary-box ${selectedEvents.length > 0 ? 'show' : ''}`}>
            <div className="cart-summary-label">Selected events for this pass</div>
            <div className="cart-items-list">
              {selectedEvents.map((eventItem) => (
                <span key={`selected-${eventItem.id}`} className="cart-tag">
                  {eventItem.title} ({eventItem.fee > 0 ? `INR ${eventItem.fee}` : 'Free'})
                  {formValues.passTier === PASS_TIER.CUSTOMIZED ? (
                    <span className="rm" onClick={() => removeSelectedEvent(eventItem.id)}>✕</span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>

          <div className="reg-billing-box">
            <div className="reg-payment-label">Billing Amount</div>
            <div className="reg-billing-row"><span>Subtotal</span><strong>INR {billing.subtotal.toLocaleString('en-IN')}</strong></div>
            <div className="reg-billing-row"><span>Discount ({billing.discountPercent}%)</span><strong>- INR {billing.discountAmount.toLocaleString('en-IN')}</strong></div>
            <div className="reg-billing-row total"><span>Payable Amount</span><strong>INR {billing.payable.toLocaleString('en-IN')}</strong></div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <input
              className="inp"
              type="file"
              accept="image/*"
              onChange={(event) => setPaymentSSFile(event.target.files?.[0] || null)}
            />
            <p className="reg-note" style={{ marginTop: '8px' }}>Upload payment screenshot (optional but recommended for faster verification).</p>
          </div>
          
          <div className="reg-payment-block">
            <div className="reg-payment-copy">
              <div className="reg-payment-label">Pay via UPI</div>
              <p className="reg-payment-desc">Pay exactly the payable amount shown above. Mention your name and selected pass in payment note.</p>
              <p className="reg-payment-upi" id="regPaymentUpiText">upi://pay?pa=edc.venturers@bank&amp;pn=VENTURERS%202026&amp;cu=INR</p>
            </div>
            <div className="reg-qr-box" id="paymentQrWrap" title="Payment QR">
              <div id="paymentQr" ref={qrRef}></div>
            </div>
          </div>
          
          <button className="btn-submit" onClick={submitForm} disabled={busy}>
            {busy ? 'Submitting Registration...' : 'Register for VENTURERS 2026 →'}
          </button>
          <p className="reg-note">Total prize pool INR 10,000 · Open to all branches · Limited seats available</p>
        </div>
      </div>
    </section>
  );
}
