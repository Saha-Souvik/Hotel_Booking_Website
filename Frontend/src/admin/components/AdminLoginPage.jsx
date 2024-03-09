import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminLoginPage({ onLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);


  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@gmail.com' && password == '123') {
      setRedirect(true);
      toast.success('Login successful');
      onLogin(true);
    } else {
      toast.error('Invalid email or password');
      onLogin(false);
    }

  };
  if (redirect) {
    return <Navigate to={'/admin/home'} />
  }
  return (
    <div className="admin bg-cover bg-center h-screen">
      <div className=" grow flex items-center justify-around h-screen">
        <div className="mb-64">
          <h1 className="mt-30 text-4xl text-center mb-10 font-bold font-serif text-black-600 underline">Admin Login</h1>
          <form className="max-w-md mx-auto mt-15" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="primary mt-4">
              Login
            </button>
            <div className="text-center py-2 text-white font-bold"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

