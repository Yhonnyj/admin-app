"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const signInHook = useSignIn();
  const router = useRouter();
  const [email] = useState("info@caibo.ca");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!signInHook?.signIn || !signInHook?.setActive) {
      setError("Clerk aún no está listo. Intenta de nuevo.");
      return;
    }

    try {
      const result = await signInHook.signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await signInHook.setActive({ session: result.createdSessionId });
        router.push("/admin/orders");
      }
    } catch (err) {
      setError("Credenciales inválidas");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-green-400">Login Admin</h2>

        <input
          type="email"
          value={email}
          disabled
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full p-3 bg-green-600 hover:bg-green-700 rounded font-semibold"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
