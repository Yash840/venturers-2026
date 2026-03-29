import React, { useEffect, useMemo, useState } from 'react';
import AdminShell from '../components/AdminShell';
import { apiRequest } from '../lib/adminApi';
import { getAdminSession, hasPermission } from '../lib/adminSession';

function formatBillingAmount(amount) {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) return '-';
  return `INR ${Number(amount).toLocaleString('en-IN')}`;
}

function formatEvents(eventsApplied) {
  if (Array.isArray(eventsApplied) && eventsApplied.length > 0) {
    return eventsApplied.join(', ');
  }
  if (typeof eventsApplied === 'string' && eventsApplied.trim()) {
    return eventsApplied;
  }
  return '-';
}

function ParticipantRow({ participant, canModify, onToggleVerify, pendingId }) {
  return (
    <tr>
      <td>{participant.id}</td>
      <td>{participant.firstName} {participant.lastName}</td>
      <td>{participant.email}</td>
      <td>{participant.phoneNumber}</td>
      <td>{participant.institute}</td>
      <td>{participant.passTier}</td>
      <td>{formatBillingAmount(participant.billingAmount)}</td>
      <td className="admin-cell-wrap">{formatEvents(participant.eventsApplied)}</td>
      <td>
        {participant.paymentSSLink ? (
          <a className="admin-link" href={participant.paymentSSLink} target="_blank" rel="noreferrer">
            View
          </a>
        ) : '-'}
      </td>
      <td>
        <span className={`admin-status ${participant.isVerified ? 'verified' : 'pending'}`}>
          {participant.isVerified ? 'Verified' : 'Pending'}
        </span>
      </td>
      <td>
        <button
          type="button"
          className="admin-verify-btn"
          onClick={() => onToggleVerify(participant.id)}
          disabled={!canModify || pendingId === participant.id}
        >
          {pendingId === participant.id ? 'Updating...' : participant.isVerified ? 'Unverify' : 'Verify'}
        </button>
      </td>
    </tr>
  );
}

export default function AdminPanelPage() {
  const session = getAdminSession();
  const canView = hasPermission(session, 'VIEW');
  const canModify = hasPermission(session, 'MODIFY');

  const [participants, setParticipants] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [pendingId, setPendingId] = useState(null);

  const stats = useMemo(() => {
    const total = participants.length;
    const verified = participants.filter((participant) => participant.isVerified).length;
    return {
      total,
      verified,
      pending: total - verified
    };
  }, [participants]);

  const loadParticipants = async () => {
    setBusy(true);
    setError('');

    try {
      const data = await apiRequest('/api/admin/panel/participants');
      setParticipants(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || 'Unable to fetch participants.');
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!canView) {
      setBusy(false);
      return;
    }
    loadParticipants();
  }, [canView]);

  const onToggleVerify = async (participantId) => {
    if (!canModify) return;

    setPendingId(participantId);
    setError('');

    try {
      const response = await apiRequest(`/api/admin/panel/participants/${participantId}/verify`, {
        method: 'PATCH'
      });

      const updatedParticipant = response?.participant;
      if (!updatedParticipant) {
        await loadParticipants();
      } else {
        setParticipants((prev) => prev.map((participant) => {
          if (participant.id !== participantId) return participant;
          return { ...participant, isVerified: updatedParticipant.isVerified };
        }));
      }
    } catch (err) {
      setError(err?.message || 'Unable to update participant verification status.');
    } finally {
      setPendingId(null);
    }
  };

  return (
    <AdminShell
      title="Admin Panel"
      subtitle="View registered participants and mark verification status."
    >
      {!canView ? (
        <p className="admin-msg err">Your account does not have VIEW permission for participants.</p>
      ) : (
        <>
          <div className="admin-stat-grid">
            <article className="admin-stat-card">
              <span>Total Participants</span>
              <strong>{stats.total}</strong>
            </article>
            <article className="admin-stat-card">
              <span>Verified</span>
              <strong>{stats.verified}</strong>
            </article>
            <article className="admin-stat-card">
              <span>Pending Verification</span>
              <strong>{stats.pending}</strong>
            </article>
          </div>

          {error ? <p className="admin-msg err">{error}</p> : null}

          <div className="admin-table-wrap">
            {busy ? (
              <p className="admin-msg">Loading participants...</p>
            ) : participants.length === 0 ? (
              <p className="admin-msg">No participants found.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Institute</th>
                    <th>Pass</th>
                    <th>Billing Amount</th>
                    <th>Events</th>
                    <th>Payment SS</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant) => (
                    <ParticipantRow
                      key={participant.id}
                      participant={participant}
                      canModify={canModify}
                      onToggleVerify={onToggleVerify}
                      pendingId={pendingId}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {!canModify ? (
            <p className="admin-msg">Your account can view participants but cannot modify verification status.</p>
          ) : null}
        </>
      )}
    </AdminShell>
  );
}
