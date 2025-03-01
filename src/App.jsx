import './App.css'
import { BrowserRouter, Route, Outlet, Routes, Navigate } from 'react-router'
import Today from './components/Today'
import Upcoming from './components/Upcoming'
import Inbox from './components/Inbox'
import Register from './components/auth/signup/SignUp'
import ProtectedRoute from './components/auth/ProtectedRoute'
import SignIn from './components/auth/login/SignIn'
import Redirecting from './components/auth/signup/Redirecting'
import NotificationPage from './components/NotificationPage'
import AuthContextProvider from './context/AuthContext'
import TaskContextProvider from './context/TaskContext'
import CompletedTasks from './components/CompletedTasks'
import NotificationContextProvider from './context/NotificationContext'
import Layout from './components/Layout'
function App() {
  return (
    <AuthContextProvider>
      <TaskContextProvider>
        <NotificationContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/redirect' element={<Redirecting />} />
              <Route path='/signup' element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/' element={<Layout />}>
                  <Route index element={<Navigate to='today' replace />} />
                  <Route path='notifications' element={<NotificationPage />} />
                  <Route path='upcoming' element={<Upcoming />} />
                  <Route path='today' element={<Today />} />
                  <Route path='inbox' element={<Inbox />} />
                  <Route path='completed' element={<CompletedTasks />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </NotificationContextProvider>
      </TaskContextProvider>
    </AuthContextProvider>
  )
}

export default App
