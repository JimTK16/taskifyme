import axios from 'axios'
import { API_ROOT } from '../utils/constants'

// User API
export const signUpAPI = async (userData) => {
  const response = await axios.post(`${API_ROOT}/v1/users/signup`, userData)
  console.log(response)
  return response.data
}

export const signInAPI = async (userData) => {
  const response = await axios.post(`${API_ROOT}/v1/users/signin`, userData)
  return response.data
}

export const signInAsGuestAPI = async () => {
  const response = await axios.post(`${API_ROOT}/v1/users/guest`)
  // console.log(response)
  return response.data
}

// Task API

export const createNewTaskAPI = async (newTaskData) => {
  const response = await axios.post(`${API_ROOT}/v1/tasks`, newTaskData)
  return response.data
}

export const deleteTaskAPI = async () => {}

export const updateTaskAPI = async () => {}

export const getTasks = async () => {
  const response = await axios.get(`${API_ROOT}/v1/tasks`)

  return response.data
}

export const getOne = async () => {}
