import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      if(!name || !email || !password){
        toast.info("Please fill in all the required fields.")
      }
      else{
        await axios.post('/register', {
          name,
          email,
          password,
        });
        setRegistrationSuccess(true);
        toast.success("Registration Successful. Now you can log in");
      }
      
    } catch (e) {
      toast.error('Registration failed. Please try again later');

    }

  }
  if (registrationSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="custom-background bg-cover bg-center h-screen">
      <div className="mt-20 grow flex items-center justify-around">
        <div className="mb-60">
          <h1 className="text-4xl text-center mb-4 font-bold">Register</h1>

          <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input type="text"
              placeholder="your name"
              value={name}
              onChange={ev => setName(ev.target.value)} />
            <input type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={ev => setEmail(ev.target.value)} />
            <input type="password"
              placeholder="password"
              value={password}
              onChange={ev => setPassword(ev.target.value)} />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-white font-bold">
              Already have an account?<Link className="underline text-primary font-bold bg-secondary rounded-full p-1" to={"/login"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>


  );
}

