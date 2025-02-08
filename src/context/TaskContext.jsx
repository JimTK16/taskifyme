import { useState, useEffect, useContext } from 'react'

import { getTasksByUserId } from '~/services'
import { TaskContext } from './context'
import { useAuth } from '~/hooks/useAuth'

export default function TaskContextProvider({ children }) {
  const { userDetails, isLoading } = useAuth()
  console.log(userDetails)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (isLoading) return
    if (!userDetails || !userDetails.userId) return

    const fetchTasks = async () => {
      try {
        const response = await getTasksByUserId(userDetails.userId)
        console.log(response)
        setTasks(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTasks()
  }, [userDetails, isLoading])

  const value = {
    tasks
  }
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
