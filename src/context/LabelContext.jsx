import { useState, useEffect } from 'react'
import { useAuth } from '~/hooks/useAuth'
import { LabelContext } from './context'
import { getLabelsAPI } from '~/services'

const LabelContextProvider = ({ children }) => {
  const [labels, setLabels] = useState([])
  const [isLoadingLabels, setIsLoadingLabels] = useState(true)
  const [addingLabel, setAddingLabel] = useState(false)
  const [editingLabel, setEditingLabel] = useState(null)
  const [deletingLabel, setDeletingLabel] = useState(null)
  const {
    isLoading: isLoadingUser,
    token,
    isSigningIn,
    isGuestSigningIn
  } = useAuth()

  useEffect(() => {
    if (isLoadingUser || isSigningIn || isGuestSigningIn || !token) return

    const fetchLabels = async () => {
      try {
        setIsLoadingLabels(true)
        const response = await getLabelsAPI()

        setLabels(response)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingLabels(false)
      }
    }
    fetchLabels()
  }, [isLoadingUser, token, isSigningIn, isGuestSigningIn])

  const value = {
    labels,
    setLabels,
    isLoadingLabels,
    setIsLoadingLabels,
    addingLabel,
    setAddingLabel,
    editingLabel,
    setEditingLabel,
    deletingLabel,
    setDeletingLabel
  }
  return <LabelContext.Provider value={value}>{children}</LabelContext.Provider>
}

export default LabelContextProvider
