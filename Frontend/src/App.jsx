import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dashbord from './pages/Dashbord'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from '../layout/Layout'


function App() {
  const [count, setCount] = useState(0)
  const user = useSelector((state) => state.userSlice.user);
  // console.log(user);
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='login' element={!user ? <Login /> : <Navigate to="/dashbord" />} />
          <Route path='signup' element={!user ? <Signup /> : <Navigate to="/dashbord" />} />
          <Route path='dashbord' element={user ? <Dashbord /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
