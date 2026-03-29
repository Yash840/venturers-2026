import React from 'react';

export default function Toast({ message }) {
  return (
    <div className={`toast ${message ? 'show' : ''}`} id="toast">
      <span className="toast-icon">✦</span>
      <span id="toastMsg">{message}</span>
    </div>
  );
}
