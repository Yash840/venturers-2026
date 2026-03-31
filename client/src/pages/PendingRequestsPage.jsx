import React, { useEffect, useState } from 'react';
import AdminShell from '../components/AdminShell';
import { apiRequest } from '../lib/adminApi';
import { getAdminSession, hasPermission } from '../lib/adminSession';

const PERMISSIONS = ['VIEW', 'MODIFY', 'SHARE_ACCESS'];

function PermissionToggle({ value, active, onToggle }) {
  return (
    <button
      type="button"
      className={`admin-perm-pill ${active ? 'active' : ''}`}
      onClick={() => onToggle(value)}
    >
      {value}
    </button>
  );
}

export default function PendingRequestsPage() {
  const session = getAdminSession();
  const canShareAccess = hasPermission(session, 'SHARE_ACCESS');

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState({});

  const loadPendingRequests = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await apiRequest('/api/admin/panel/pending-requests');
      const list = Array.isArray(data) ? data : [];
      setRequests(list);
      setSelectedPermissions(() => {
        const next = {};
        list.forEach((request) => {
          next[request.id] = Array.isArray(request.permissions) && request.permissions.length > 0
            ? request.permissions
            : ['VIEW'];
        });
        return next;
      });
    } catch (err) {
      setError(err?.message || 'Unable to load pending requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!canShareAccess) {
      setLoading(false);
      return;
    }
    loadPendingRequests();
  }, [canShareAccess]);

  const onPermissionToggle = (adminId, permission) => {
    setSelectedPermissions((prev) => {
      const current = Array.isArray(prev[adminId]) ? prev[adminId] : ['VIEW'];
      const exists = current.includes(permission);
      const next = exists ? current.filter((item) => item !== permission) : [...current, permission];
      return {
        ...prev,
        [adminId]: next.length > 0 ? next : ['VIEW']
      };
    });
  };

  const onGrantAccess = async (adminId) => {
    setUpdatingId(adminId);
    setError('');

    try {
      await apiRequest(`/api/admin/panel/grant-access/${adminId}`, {
        method: 'POST',
        body: JSON.stringify({ permissions: selectedPermissions[adminId] || ['VIEW'] })
      });
      setRequests((prev) => prev.filter((request) => request.id !== adminId));
    } catch (err) {
      setError(err?.message || 'Unable to grant access.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminShell
      title="Pending Access Requests"
      subtitle="Approve admin requests and assign permissions."
    >
      {!canShareAccess ? (
        <p className="admin-msg err">Your account does not have SHARE_ACCESS permission.</p>
      ) : (
        <>
          {error ? <p className="admin-msg err">{error}</p> : null}

          {loading ? (
            <p className="admin-msg">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="admin-msg">No pending requests found.</p>
          ) : (
            <div className="admin-requests-grid">
              {requests.map((request) => (
                <article className="admin-request-card" key={request.id}>
                  <div>
                    <p className="admin-request-title">{request.email}</p>
                    <p className="admin-request-meta">Request ID: {request.id}</p>
                  </div>

                  <div className="admin-perm-wrap">
                    {PERMISSIONS.map((permission) => (
                      <PermissionToggle
                        key={`${request.id}-${permission}`}
                        value={permission}
                        active={(selectedPermissions[request.id] || []).includes(permission)}
                        onToggle={() => onPermissionToggle(request.id, permission)}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className="admin-verify-btn"
                    disabled={updatingId === request.id}
                    onClick={() => onGrantAccess(request.id)}
                  >
                    {updatingId === request.id ? 'Granting...' : 'Grant Access'}
                  </button>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </AdminShell>
  );
}
