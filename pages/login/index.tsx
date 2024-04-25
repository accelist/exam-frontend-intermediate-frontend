import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";

const schema = z.object({
  email: z.string().nonempty(),
  password: z.string().min(4, "Password at least 4 characters"),
});

type FormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/be/api/v1/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }
      console.log("Login successful!");
    } catch (error: any) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="text"
              {...register("email")}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              {...register("password")}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            onClick={() => router.push("/main")}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          No Account ?{" "}
          <a href="../register" className="text-blue-500 hover:text-blue-700">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
