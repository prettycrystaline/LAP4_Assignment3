"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormData {
  [key: string]: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email) {
      toast.error("Email is required!", { position: "top-center" });
      return false;
    }
    
    if(!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email is invalid!", { position: "top-center" });
      return false;
    }

    if (!password) {
      toast.error("Password is required!", { position: "top-center" });
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!", {
        position: "top-center",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    await toast.promise(
      signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      }),
      {
        loading: "Logging in...",
        success: (result: { error: string}) => {
          if (result?.error) {
            throw new Error(result.error);
          }
          router.push("/dashboard");
          return "Login successful!";
        },
        error: (err: { message: unknown; }) => `Login failed! ${err.message}`,
      },
      { position: "top-center" } 
    );
  };
  

  return (
    <div className="w-screen flex items-center justify-center flex-col my-24">
      <Toaster />
      <h1 className="text-2xl font-bold uppercase">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold mb-2"
          >
            Email
          </label>
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
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
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
          Login
        </button>
        <p className="mt-6 text-sm">
          Do not have an account?
          <Link
            className="uppercase font-semibold text-blue-600"
            href="/auth/register"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
