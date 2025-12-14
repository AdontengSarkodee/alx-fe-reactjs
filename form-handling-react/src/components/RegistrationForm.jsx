
import { useState } from 'react';

export default function RegistrationForm() {
  const [form, setForm] = useState({ username:'', email:'', password:'' });
  const [error, setError] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setError('All fields are required');
      return;
    }
    console.log(form);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} />
      <input name="email" onChange={handleChange} />
      <input name="password" type="password" onChange={handleChange} />
      {error && <p>{error}</p>}
      <button>Register</button>
    </form>
  );
}
