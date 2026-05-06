import api from './client'

export const usersApi = {
  list: () => api.get('/users').then((r) => r.data),
  get: (id) => api.get(`/users/${id}`).then((r) => r.data),
  update: (id, payload) => api.put(`/users/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/users/${id}`).then((r) => r.data),
  favorites: (id) => api.get(`/users/${id}/favorites`).then((r) => r.data),
  addFavorite: (id, productId) =>
    api.post(`/users/${id}/favorites/${productId}`).then((r) => r.data),
  removeFavorite: (id, productId) =>
    api.delete(`/users/${id}/favorites/${productId}`).then((r) => r.data),
}
