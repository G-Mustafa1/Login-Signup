import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({
  name,
  value,
  onChange,
  placeholder,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-blue-600 focus:outline-none"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
