import api from './client'

export const ordersApi = {
  create: (payload) => api.post('/orders', payload).then((r) => r.data),
  list: () => api.get('/orders').then((r) => r.data),
  get: (id) => api.get(`/orders/${id}`).then((r) => r.data),
  byUser: (userId) => api.get(`/orders/user/${userId}`).then((r) => r.data),
  updateStatus: (id, status) =>
    api.patch(`/orders/${id}/status`, null, { params: { status } }).then((r) => r.data),
  updateTracking: (id, payload) =>
    api.patch(`/orders/${id}/tracking`, payload).then((r) => r.data),
}
