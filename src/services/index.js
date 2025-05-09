import axios from 'axios'
import { API_ROOT } from '../utils/constants'

// User API
export const signUpAPI = async (userData) => {
  const response = await axios.post(`${API_ROOT}/v1/users/signup`, userData)

  return response.data
}

export const signInAPI = async (userData) => {
  const response = await axios.post(`${API_ROOT}/v1/users/signin`, userData, {
    withCredentials: true
  })
  return response.data
}

export const signInAsGuestAPI = async () => {
  const response = await axios.post(`${API_ROOT}/v1/users/guest`, null, {
    withCredentials: true
  })
  return response.data
}

export const signOutAPI = async () => {
  const response = await axios.post(`${API_ROOT}/v1/users/signout`, null, {
    withCredentials: true
  })
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await axios.post(
    `${API_ROOT}/v1/users/refresh`,
    {},
    {
      withCredentials: true
    }
  )
  return response.data
}

// Task API

export const createNewTaskAPI = async (newTaskData) => {
  const response = await axios.post(`${API_ROOT}/v1/tasks`, newTaskData)
  return response.data
}

export const deleteTaskAPI = async (taskId) => {
  const response = await axios.delete(`${API_ROOT}/v1/tasks/${taskId}`)

  return response.data
}

export const updateTaskAPI = async (
  taskId,
  updateData,
  isUndeleting = false
) => {
  const response = await axios.put(
    `${API_ROOT}/v1/tasks/${taskId}?undoing=${isUndeleting}`,
    updateData
  )
  return response.data
}

export const toggleCompletedAPI = async (taskId, updateData) => {
  const response = await axios.patch(
    `${API_ROOT}/v1/tasks/${taskId}/toggle-completed`,
    updateData
  )
  return response.data
}

export const getTasks = async () => {
  const response = await axios.get(`${API_ROOT}/v1/tasks`)

  return response.data
}

export const getOne = async () => {}

// Notification API
export const getNotifications = async () => {
  const response = await axios.get(`${API_ROOT}/v1/notifications`)
  return response.data
}

export const toggleIsRead = async (notificationId, updateData) => {
  const response = await axios.patch(
    `${API_ROOT}/v1/notifications/${notificationId}/toggle-isRead`,
    updateData
  )
  return response.data
}

// Label API
export const getLabelsAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/labels`)
  return response.data
}

export const createNewLabelAPI = async (newLabelData) => {
  const response = await axios.post(`${API_ROOT}/v1/labels`, newLabelData)
  return response.data
}

export const deleteLabelAPI = async (labelId) => {
  const response = await axios.delete(`${API_ROOT}/v1/labels/${labelId}`)
  return response.data
}

export const updateLabelAPI = async (labelId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/labels/${labelId}`,
    updateData
  )
  return response.data
}

// Activity Logs API
export const getLogsAPI = async (page, limit) => {
  const response = await axios.get(`${API_ROOT}/v1/activity-logs`, {
    params: { page, limit }
  })
  return response.data
}
