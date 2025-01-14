"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormData {
  [key: string]: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password } = formData;
    let isValid = true;

    // Validate Username
    if (!name) {
      toast.error('Username is required');
      isValid = false;
    }

    // Validate Email
    if (!email) {
      toast.error('Email is required');
      isValid = false;
    }
    
    if(!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Email is invalid');
      isValid = false;
    }

    // Validate Password
    if (!password) {
      toast.error('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    await toast.promise(
      fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Registration failed');
        }
        setFormData({ name: '', email: '', password: '' });
        router.push('/auth/login');
        return 'Registration successful!';
      }),
      {
        loading: 'Registering...',
        success: (message: unknown) => message,
        error: (error: { message: unknown; }) => error.message || 'An error occurred while registering',
      },
      { position: 'top-center' }
    );
  };  
  

  return (
    <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center flex-col my-24">
      <Toaster />
      <h1 className="text-2xl font-bold uppercase">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Username</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={formData.name}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create an account
        </button>
        <p className="mt-6 text-sm">
          If already have an account, <Link className="uppercase font-semibold text-blue-600" href="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
