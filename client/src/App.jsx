import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from './pages/Auth'
import Home from './pages/Home'
import CreateRecipes from './pages/CrreateRecipes'
import SavedRecipes from './pages/SavedRecipes'
import Navbar from './components/Navbar'
import { ContextProvider } from './components/auth/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { AutoLogin } from './components/auth/AutoLogin'


function App() {

  return (
    <div className='App'>
      <Router>
        <ContextProvider>
          <Navbar />
          <Routes>
            <Route path='/auth' element={<AutoLogin><Auth /></AutoLogin>} />
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/create-recipes' element={<ProtectedRoute><CreateRecipes /></ProtectedRoute>} />
            <Route path='/saved-recipes' element={<ProtectedRoute><SavedRecipes /></ProtectedRoute>} />
          </Routes>
        </ContextProvider>
      </Router>
    </div>
  )
}

export default App
