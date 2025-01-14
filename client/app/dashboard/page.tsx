import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";
import avatar from "@/public/avatar.jpg";

async function fetchDataById(userId: string) {
  const response = await fetch(`http://localhost:8080/auth/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const data = await response.json();
  return data;
}

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <p className="text-red-600 text-lg font-bold">Access Denied</p>
        <a className="text-sm font-bold" href="/auth/login">Go to Login</a>
      </div>
    );
  }

  const data = await fetchDataById(session.user.id);

  if (!data) {
    return (
      <div>
        <p className="text-red-600 text-lg font-bold">Failed to fetch user data</p>
        <a className="text-sm font-bold" href="/auth/login">Retry</a>
      </div>
    );
  }

  return (
    <div className="w-screen flex items-center justify-center flex-col my-24">
      <div className="card flex flex-col items-center justify-center p-12 bg-white gap-4 rounded-lg shadow-md">
        <Image
          src={avatar}
          alt="User Avatar"
          width={128}
          height={128}
          className="rounded-full shadow-md"
        />
        <p className="text-lg">
          Name: <span className="text-gray-600 italic">{data.userData.name}</span>
        </p>
        <p className="text-lg">
          Email: <span className="text-gray-600 italic">{data.userData.email}</span>
        </p>
        <p className="text-lg">
          User ID: <span className="text-gray-600 italic">{data.userData._id}</span>
        </p>
        <div className="mt-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
