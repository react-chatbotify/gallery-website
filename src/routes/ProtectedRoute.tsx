import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Protected route requires user to be logged in.
 * 
 * @param element element to protect
 */
const ProtectedRoute: React.FC<{
  element: React.ReactNode
}> = ({
  element
}) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  return <>{element}</>
}

export default ProtectedRoute
