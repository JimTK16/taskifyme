import axios from 'axios'
import { API_ROOT } from '../utils/constants'

// User API
export const signUpAPI = async (userData) => {
  const response = await axios.post(`${API_ROOT}/v1/users/signup`, userData)
  console.log(response)
  return response.data
}

export const signInAPI = async () => {}

export const signInAsGuest = async () => {}

export const signOutAPI = async () => {}

// Task API

export const createNewTaskAPI = async () => {}

export const deleteTaskAPI = async () => {}

export const updateTaskAPI = async () => {}

export const getTasksByUserid = async (userId) => {
  const response = await axios.get(`${API_ROOT}/v1/tasks`)

  return response.data
}

export const getOne = async () => {}
