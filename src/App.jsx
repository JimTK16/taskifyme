import './App.css'
import { BrowserRouter, Route, Outlet, Routes, Navigate } from 'react-router'
import ProtectedRoute from './components/auth/ProtectedRoute'
import NotificationPage from './components/NotificationPage'
import AuthContextProvider from './context/AuthContext'
import TaskContextProvider from './context/TaskContext'
import NotificationContextProvider from './context/NotificationContext'
import Layout from './components/Layout'
import RedirectingPage from './components/auth/signup/RedirectingPage'
import TodayPage from './components/TodayPage'
import UpcomingPage from './components/UpcomingPage'
import InboxPage from './components/InboxPage'
import CompletedTasksPage from './components/CompletedTasksPage'
import SignUpPage from './components/auth/signup/SignUpPage'
import SignInPage from './components/auth/login/SignInPage'
import LabelsPage from './components/LabelsPage'
import LabelContextProvider from './context/LabelContext'
import LabelDetailsPage from './components/LabelDetailsPage'
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <TaskContextProvider>
          <LabelContextProvider>
            <NotificationContextProvider>
              <Routes>
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/redirect' element={<RedirectingPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path='/' element={<Layout />}>
                    <Route index element={<Navigate to='inbox' replace />} />
                    <Route
                      path='notifications'
                      element={<NotificationPage />}
                    />
                    <Route path='upcoming' element={<UpcomingPage />} />
                    <Route path='today' element={<TodayPage />} />
                    <Route path='inbox' element={<InboxPage />} />
                    <Route path='completed' element={<CompletedTasksPage />} />
                    <Route path='labels'>
                      <Route index element={<LabelsPage />} />
                      <Route path=':labelId' element={<LabelDetailsPage />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </NotificationContextProvider>
          </LabelContextProvider>
        </TaskContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
