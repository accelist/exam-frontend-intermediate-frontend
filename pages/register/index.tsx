import { useRouter } from "next/router";
import React, { useState } from "react";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!email || !dob || !gender || !address || !username || !password) {
        setErrorMessage("Please fill in all fields.");
        return;
      }
      if (!validateEmail(email)) {
        setErrorMessage("Invalid email format.");
        return;
      }
      const age = calculateAge(new Date(dob));
      if (age < 14) {
        setErrorMessage("You must be at least 14 years old to register.");
        return;
      }
      if (password.length < 8 || password.length > 64) {
        setErrorMessage("Password must be between 8 and 64 characters long.");
        return;
      }
      const response = await fetch("/api/be/api/v1/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          dob,
          gender,
          address,
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed.");
      }

      setEmail("");
      setDob("");
      setGender("");
      setAddress("");
      setUsername("");
      setPassword("");
      setErrorMessage("");

      router.push("/login");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const calculateAge = (dob: Date): number => {
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Gender:</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  value="M"
                  checked={gender === "M"}
                  onChange={() => setGender("Male")}
                  className="mr-1"
                />
                M
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  value="F"
                  checked={gender === "F"}
                  onChange={() => setGender("Female")}
                  className="mr-1"
                />
                F
              </label>
              <label>
                <input
                  type="radio"
                  value="O"
                  checked={gender === "O"}
                  onChange={() => setGender("Other")}
                  className="mr-1"
                />
                Other
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              maxLength={255}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
