import { useState } from 'react';
import { useRouter } from 'next/router';
import { WithDefaultLayout } from '@/components/DefautLayout';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your validation logic here

    // Make a POST request to your API
    const response = await fetch('api/be/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        dob: dob,
        gender: gender,
        address: address,
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      // If the registration was successful, redirect to the login page
      router.push('/LoginPage');
    } else {
      // Handle error
      alert('Failed to register');
    }
  };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
              Register Page
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* DoB Field */}
              <div>
                <label htmlFor="dob" className="sr-only">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              {/* Gender Field */}
              <div>
                <span>Gender</span>
                <label>
                  <input
                    type="radio"
                    value="M"
                    checked={gender === 'M'}
                    onChange={() => setGender('M')}
                  />
                  Laki-laki
                </label>
                <label>
                  <input
                    type="radio"
                    value="P"
                    checked={gender === 'P'}
                    onChange={() => setGender('P')}
                  />
                  Perempuan
                </label>
                <label>
                  <input
                    type="radio"
                    value="Other"
                    checked={gender === 'Other'}
                    onChange={() => setGender('Other')}
                  />
                  Other
                </label>
              </div>
              {/* Address Field */}
              <div>
                <label htmlFor="address" className="sr-only">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  maxLength={255}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  maxLength={20}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  maxLength={64}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  

RegisterPage.layout = WithDefaultLayout;
