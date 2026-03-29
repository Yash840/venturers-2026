import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/adminApi';
import { getAdminSession, setAdminToken } from '../lib/adminSession';

export default function AdminAuthPage() {
  const navigate = useNavigate();
  const session = getAdminSession();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (session.isAuthenticated) {
    return <Navigate to="/admin/panel" replace />;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setBusy(true);
    setError('');
    setMessage('');

    try {
      if (mode === 'signup') {
        const response = await apiRequest('/api/admin/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
        setMessage(response?.message || 'Sign up submitted. Wait for approval.');
        setMode('signin');
        setPassword('');
      } else {
        const response = await apiRequest('/api/admin/auth/signin', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });

        if (response?.token) {
          setAdminToken(response.token);
          navigate('/admin/panel', { replace: true });
          return;
        }

        setError('Sign in succeeded but no token was returned.');
      }
    } catch (err) {
      setError(err?.message || 'Request failed. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-page-wrap admin-auth-wrap">
      <div className="admin-page-noise" aria-hidden="true" />
      <div className="admin-auth-card">
        <p className="admin-kicker">For Organization</p>
        <h1>{mode === 'signin' ? 'Admin Sign In' : 'Admin Sign Up'}</h1>
        <p className="admin-subtitle">
          {mode === 'signin'
            ? 'Access participant verification and operations dashboard.'
            : 'Request dashboard access. A super-admin must approve your account.'}
        </p>

        <div className="admin-auth-switch">
          <button
            type="button"
            className={`admin-tab ${mode === 'signin' ? 'active' : ''}`}
            onClick={() => {
              setMode('signin');
              setError('');
              setMessage('');
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`admin-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setMode('signup');
              setError('');
              setMessage('');
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={onSubmit} className="admin-auth-form">
          <label className="admin-input-label" htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            className="inp"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@institute.edu"
            autoComplete="email"
          />

          <label className="admin-input-label" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            className="inp"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          />

          {message ? <p className="admin-msg ok">{message}</p> : null}
          {error ? <p className="admin-msg err">{error}</p> : null}

          <button type="submit" className="btn-submit" disabled={busy}>
            {busy ? 'Please wait...' : mode === 'signin' ? 'Sign In to Dashboard' : 'Create Access Request'}
          </button>
        </form>

        <p className="admin-meta-note">
          Need event info first? <Link to="/">Return to main site</Link>
        </p>
      </div>
    </div>
  );
}
