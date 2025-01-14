'use client';

import { signOut } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    signOut({
      redirect: false, 
    }).then(() => {
      router.push('/auth/login'); 
    });
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 text-white p-2 rounded-md">
      Log out
    </button>
  );
}
