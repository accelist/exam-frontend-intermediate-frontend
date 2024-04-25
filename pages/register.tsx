import { useState } from 'react';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    const errorMessages: string[] = [];
    const birthDate = new Date(birthdate);
    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 14);
    if (birthDate > minAgeDate) {
      isValid = false;
      errorMessages.push('You must be at least 14 years old.');
    }

    if (!email || !birthdate || !gender || !address || !username || !password) {
      isValid = false;
      errorMessages.push('All fields are required.');
    }

    if (!isValid) {
      alert(errorMessages.join('\n'));
      return;
    }

    router.push('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field mb-4" required />
          <input type="date" placeholder="Tanggal Lahir" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="input-field mb-4" required />
          <div className="mb-4">
            <span className="mr-4">Gender:</span>
            <input type="radio" name="gender" value="M" checked={gender === 'M'} onChange={handleGenderChange} className="mr-2" /> Male
            <input type="radio" name="gender" value="P" checked={gender === 'P'} onChange={handleGenderChange} className="mr-2 ml-4" /> Woman
            <input type="radio" name="gender" value="Other" checked={gender === 'Other'} onChange={handleGenderChange} className="mr-2 ml-4" /> Other
          </div>
          <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="input-field mb-4" maxLength={255} required />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field mb-4" maxLength={20} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field mb-4" minLength={8} maxLength={64} required />
          <button type="submit" className="btn-primary w-full">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
