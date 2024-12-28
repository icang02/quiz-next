"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ message }: { message: string }) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Oops! Terjadi Kesalahan
        </h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <Button onClick={handleRefresh}>Refresh Halaman</Button>
      </div>
    </div>
  );
}
