import { useState } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dashbord from './pages/Dashbord'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'


function App() {
  const [count, setCount] = useState(0)
  const user = useSelector((state) => state.userSlice.user);
  // console.log(user);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashbord" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashbord" />} />
        <Route path="/dashbord" element={user ? <Dashbord /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
