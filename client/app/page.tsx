"use client"

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const goToPage = (page: string) => {
    router.push(`/${page}`);
  }

  return (
      <div className="w-screen h-screen flex flex-col items-center gap-3 justify-center">
          <h1 className="text-3xl font-bold uppercase">Assignment-3</h1>
          <h2 className="text-xl font-semibold text-gray-700">Nextjs + Express (Authentication)</h2>
          <h2 className="text-md font-semibold text-gray-700">By Brang Tsawm Aung, LAP-4</h2>

          <div className="flex mt-4 gap-3">
            <p className="px-3 py-2 hover:bg-blue-700 hover:text-white duration-300 cursor-pointer uppercase rounded-md shadow-lg border border-gray-600" onClick={() => goToPage("auth/login")}>Login</p>
            <p className="px-3 py-2 hover:bg-blue-700 hover:text-white duration-300 cursor-pointer uppercase rounded-md shadow-lg border border-gray-600" onClick={() => goToPage("auth/register")}>Register</p>
          </div>
      </div>
  );
}
