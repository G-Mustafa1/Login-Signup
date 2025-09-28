import React from 'react'
import Navbar from '../src/components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../src/components/Footer'

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-blue-50'>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className='flex-grow py-10'>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Layout
