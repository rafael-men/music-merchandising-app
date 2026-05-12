import api from './client'

export const cartApi = {
  get: (userId) => api.get(`/cart/${userId}`).then((r) => r.data),
  addItem: (userId, item) => api.post(`/cart/${userId}/items`, item).then((r) => r.data),
  removeItem: (userId, productId) => api.delete(`/cart/${userId}/items/${productId}`).then((r) => r.data),
  clear: (userId) => api.delete(`/cart/${userId}`).then((r) => r.data),
}
