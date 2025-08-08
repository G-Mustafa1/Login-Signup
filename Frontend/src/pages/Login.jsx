import React from 'react'
import axios from '../axiosConfig'
import { addUser } from '../features/userSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import PasswordInput from '../components/PasswordInput'
import { Link } from 'react-router-dom'
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      dispatch(addUser(res.data.user));
      Swal.fire('Success', res.data.message, 'success');
      navigate('/dashbord');
    } catch (err) {
      Swal.fire('Error', err?.response?.data?.message || "Something went wrong!",);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-400 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-fade-in space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">Welcome Back <br /> Log In 👋</h2>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-gray-700 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-gray-700 font-semibold">
            Password
          </label>
          <PasswordInput
            name="password"
            // value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded shadow-lg hover:scale-105 transition transform duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-purple-700 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
