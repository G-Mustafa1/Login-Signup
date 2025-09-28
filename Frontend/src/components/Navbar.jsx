import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
      await axios.post("/auth/logout");
      dispatch(removeUser());
      Swal.fire("Logged out", "You have been logged out", "success");
    } catch (error) {
      Swal.fire("Error", "Logout failed", "error");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-white text-xl sm:text-2xl font-bold hover:text-blue-200 transition-colors duration-200 animate-bounce"
          >
            MyApp
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4 lg:space-x-6 text-white font-medium items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-all duration-200 ${isActive
                      ? 'bg-blue-800 text-white'
                      : 'hover:bg-blue-700 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/dashbord"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md transition-all duration-200 ${isActive
                        ? 'bg-blue-800 text-white'
                        : 'hover:bg-blue-700 hover:text-white'
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md hover:bg-red-600 hover:text-white transition-all duration-200 border border-red-400"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md transition-all duration-200 ${isActive
                        ? 'bg-blue-800 text-white'
                        : 'hover:bg-blue-700 hover:text-white'
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className="px-3 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-white focus:outline-none p-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
          <ul className="bg-blue-700 rounded-lg shadow-lg mx-2 mb-3 py-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-white transition-colors duration-200 border-b border-blue-600 last:border-b-0 ${isActive
                      ? 'bg-blue-900 border-l-4 border-l-white'
                      : 'hover:bg-blue-800'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-white transition-colors duration-200 border-b border-blue-600 ${isActive
                        ? 'bg-blue-900 border-l-4 border-l-white'
                        : 'hover:bg-blue-800'
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-white hover:bg-red-600 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-white transition-colors duration-200 border-b border-blue-600 ${isActive
                        ? 'bg-blue-900 border-l-4 border-l-white'
                        : 'hover:bg-blue-800'
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 mx-2 my-2 rounded-md text-center"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
