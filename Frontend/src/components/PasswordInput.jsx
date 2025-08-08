import { useState } from 'react';

const PasswordInput = ({ name, value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute inset-y-0 right-0 px-3 text-purple-600 font-bold focus:outline-none"
      >
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default PasswordInput;
