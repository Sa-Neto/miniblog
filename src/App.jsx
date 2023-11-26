import './App.css'
// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Context
import { AuthProvider } from './context/AuthContext'

// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './componets/Navbar'
import Footer from './componets/Footer'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'

// React
import { useEffect, useState } from 'react'
import { useAuthetication } from './hooks/useAuthentication'
import { onAuthStateChanged } from 'firebase/auth'


function App() {
  const [ user,setUser] = useState(undefined)
  const {auth} = useAuthetication()

  const loadingUser = user === undefined
  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      setUser(user)
    })
  },[auth])

  if(loadingUser){

    return <p>Carregando...</p>
  
  }
  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
