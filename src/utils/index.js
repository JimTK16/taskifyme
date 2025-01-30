import axios from "axios"
import { API_ROOT } from "./constants"

// User API
export const registerAPI = async () => {}

export const loginAPI = async () => {}

export const loginAsGuest = async () => {}

export const logoutAPI = async () => {}

// Task API

export const createNewTaskAPI = async () => {}

export const deleteTaskAPI = async () => {}

export const updateTaskAPI = async () => {}

export const getTasksByUserid = async (userId) => {
  const response = await axios.get(`${API_ROOT}/v1/tasks`)

  return response.data
}

export const getOne = async () => {}
