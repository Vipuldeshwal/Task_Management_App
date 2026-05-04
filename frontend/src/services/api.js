import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8080/api' })

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)


export const signup = (data) => API.post('/auth/signup', data)
export const login = (data) => API.post('/auth/login', data)


export const getTasks = (params) => API.get('/tasks', { params })
export const getTask = (id) => API.get(`/tasks/${id}`)
export const createTask = (data) => API.post('/tasks', data)
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data)
export const updateTaskStatus = (id, status) => API.patch(`/tasks/${id}/status?status=${status}`)
export const deleteTask = (id) => API.delete(`/tasks/${id}`)


export const getUsers = () => API.get('/users')
export const deleteUser = (id) => API.delete(`/users/${id}`)


export const getProjects = () => API.get('/projects')
export const createProject = (data) => API.post('/projects', data)
export const updateProject = (id, data) => API.put(`/projects/${id}`, data)
export const deleteProject = (id) => API.delete(`/projects/${id}`)

export default API
