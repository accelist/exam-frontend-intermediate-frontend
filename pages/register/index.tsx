import { useRouter } from "next/router";
import React, { useState } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    birthDate: "",
    gender: "",
    address: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    birthDate: "",
    gender: "",
    address: "",
    username: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { ...errors };
    let hasErrors = false;

    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Email is required and must be valid";
      hasErrors = true;
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Birth date is required";
      hasErrors = true;
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      hasErrors = true;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      hasErrors = true;
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
      hasErrors = true;
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password =
        "Password is required and must be at least 8 characters long";
      hasErrors = true;
    }

    // If there are errors, update the state and prevent form submission
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("/api/be/api/v1/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle non-successful response
        throw new Error("Failed to register. Please try again.");
      }

      // Handle successful registration
      alert("Registration successful!");
      router.push("/");
      // You can redirect to another page or handle the success in another way
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 shadow-xl p-8 rounded-xl"
    >
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${
            errors.email && "border-red-500"
          }`}
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="birthDate" className="block mb-1">
          Tanggal Lahir
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${
            errors.birthDate && "border-red-500"
          }`}
        />
        {errors.birthDate && (
          <span className="text-red-500">{errors.birthDate}</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="block mb-1">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${
            errors.gender && "border-red-500"
          }`}
        >
          <option value="">Select Gender</option>
          <option value="M">Laki-laki</option>
          <option value="P">Perempuan</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <span className="text-red-500">{errors.gender}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block mb-1">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${
            errors.address && "border-red-500"
          }`}
        />
        {errors.address && (
          <span className="text-red-500">{errors.address}</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${
            errors.username && "border-red-500"
          }`}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username}</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${
            errors.password && "border-red-500"
          }`}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password}</span>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
