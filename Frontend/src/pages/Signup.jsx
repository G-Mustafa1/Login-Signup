import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import Swal from 'sweetalert2';
import PasswordInput from '../components/PasswordInput';
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = { firstname, lastname, email, password };

    if (!form.firstname.trim()) {
      Swal.fire('Error', 'Please enter your First Name', 'error');
      return;
    }
    if (!form.lastname.trim()) {
      Swal.fire('Error', 'Please enter your Last Name', 'error');
      return;
    }
    if (form.firstname.length < 3 || form.firstname.length > 12) {
      Swal.fire('Error', 'First name must be between 3 and 12 characters!', 'error');
      return;
    }
    if (form.lastname.length < 3 || form.lastname.length > 12) {
      Swal.fire('Error', 'Last name must be between 3 and 12 characters!', 'error');
      return;
    }
    if (!form.email.trim()) {
      Swal.fire('Error', 'Email is required!', 'error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      Swal.fire('Error', 'Invalid email format!', 'error');
      return;
    }
    if (!form.password.trim()) {
      Swal.fire('Error', 'Password is required!', 'error');
      return;
    }

    if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
      Swal.fire('Error', 'Password must be at least 8 characters long and contain at least one uppercase letter and one number!', 'error');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('/auth/signup', form);
      Swal.fire('Success', res.data.message, 'success');
      navigate('/login');
    } catch (err) {
      Swal.fire('Error', err?.response?.data?.message || "Something went wrong!",);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl animate-fade-in space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600">Sign Up 👋</h2>

        {/* First Name */}
        <div className="space-y-1">
          <label htmlFor="firstname" className="block text-gray-700 font-semibold">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            placeholder="John"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        {/* Last Name */}
        <div className="space-y-1">
          <label htmlFor="lastname" className="block text-gray-700 font-semibold">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Doe"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="block text-gray-700 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label htmlFor="password" className="block text-gray-700 font-semibold">
            Password
          </label>
          <PasswordInput
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-bold rounded-xl shadow-lg transition transform duration-300 
        ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:scale-105"}`}
        >
          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Signing Up...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>


  )
};
export default Signup
