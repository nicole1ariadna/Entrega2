import { useState } from 'react';
import { loginUser } from '../api/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
const { token, rol } = res; // el backend devuelve 'rol', no 'role'

localStorage.setItem('token', token);
localStorage.setItem('rol', rol);

window.location.href = rol === 'organizador'
  ? '/dashboard-organizador'
  : '/dashboard-trabajador';

    } catch {
      alert('Error en login');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
