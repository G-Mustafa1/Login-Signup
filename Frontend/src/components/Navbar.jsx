import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../features/userSlice';
import axios from '../axiosConfig';
import Swal from 'sweetalert2';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      dispatch(removeUser());
      Swal.fire('Logged out', 'You have been logged out', 'success');
    } catch (error) {
      Swal.fire('Error', 'Logout failed', 'error');
    }
  };

  const navLinks = (
    <>
      <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
      <li><Link to="/about" className="hover:text-yellow-300 transition">About</Link></li>
      <li><Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link></li>
      {user ? (
        <>
          <li><Link to="/dashbord" className="hover:text-yellow-300 transition">Dashboard</Link></li>
          <li><button onClick={handleLogout} className="text-white hover:text-red-300 transition">Logout</button></li>
        </>
      ) : (
        <>
          <li><Link to="/login" className="hover:text-yellow-300 transition">Login</Link></li>
          <li><Link to="/signup" className="hover:text-yellow-300 transition">Signup</Link></li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="text-white text-2xl font-bold animate-bounce">MyApp</h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-white font-medium items-center">
            {navLinks}
          </ul>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setOpen(!open)} className="text-white focus:outline-none">
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <ul className="md:hidden flex flex-col mt-4 space-y-3 bg-white rounded-lg shadow-lg p-4 text-center animate-fade-in-down">
            {React.Children.map(navLinks.props.children, (child) => (
              React.cloneElement(child, {
                className: "text-purple-700 hover:text-purple-500 transition",
                onClick: () => setOpen(false)
              })
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
