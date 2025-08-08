import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import Swal from 'sweetalert2';
import PasswordInput from '../components/PasswordInput';
import { Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    }
    // console.log(handleChange())


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/signup', form);
            Swal.fire('Success', res.data, 'success');
            navigate('/login');
        } catch (err) {
            Swal.fire('Error', err?.response?.data?.message || "Something went wrong!",);
        }
    }


    return (
        // <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-5 shadow-lg rounded bg-white space-y-4">
        //     <h2 className="text-2xl font-bold text-center text-green-700">Signup</h2>
        //     <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} className="border p-2 w-full" required />
        //     <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} className="border p-2 w-full" required />
        //     <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" required />
        //     <PasswordInput type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
        //     <button className="bg-green-600 text-white py-2 px-4 w-full hover:bg-green-700 transition">Signup</button>
        // </form>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-400 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-fade-in space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">Sign Up 👋</h2>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-gray-700 font-semibold">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            placeholder="John"
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-gray-700 font-semibold">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Doe"
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

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
            Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-700 hover:underline font-semibold">
            Log In
          </Link>
        </p>
      </form>
    </div>
    )
};
export default Signup
