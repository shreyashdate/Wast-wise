const API_BASE = 'https://wast-wise-backend.onrender.com/api';

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

// Auth
export const login = (name, phone) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ name, phone }) });

// Bins
export const getBins = () => request('/bins');
export const getBinsByWorker = (workerId) => request(`/bins/worker/${workerId}`);
export const addBin = (data) =>
  request('/bins', { method: 'POST', body: JSON.stringify(data) });
export const assignWorkerToBin = (binId, workerId) =>
  request(`/bins/${binId}/assign`, { method: 'PUT', body: JSON.stringify({ workerId }) });
export const updateBinStatus = (binId, data) =>
  request(`/bins/${binId}/status`, { method: 'PUT', body: JSON.stringify(data) });

// Workers
export const getWorkers = () => request('/workers');
export const addWorker = (data) =>
  request('/workers', { method: 'POST', body: JSON.stringify(data) });
export const deleteWorker = (id) =>
  request(`/workers/${id}`, { method: 'DELETE' });

// Collection
export const getCollections = () => request('/collection');
export const addCollection = (data) =>
  request('/collection', { method: 'POST', body: JSON.stringify(data) });

// Complaints
export const getComplaints = () => request('/complaints');
export const addComplaint = (data) =>
  request('/complaints', { method: 'POST', body: JSON.stringify(data) });
export const updateComplaintStatus = (id, status) =>
  request(`/complaints/${id}`, { method: 'PUT', body: JSON.stringify({ status }) });

// Admin
export const resetDatabase = (mode) =>
  request('/admin/reset', { method: 'POST', body: JSON.stringify({ mode }) });
