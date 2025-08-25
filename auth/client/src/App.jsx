import { Route, Routes, Router } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import HomePage from './components/Home'
import { AuthProvider } from './components/auth/authContext'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {

  return (
    <div className="app">
      <AuthProvider>
          <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute> } />
          </Routes>
      </AuthProvider>
      
      
    </div>
  )
}

export default App
