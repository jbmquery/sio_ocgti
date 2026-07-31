////sio_frontend/src/hooks/login/useLogin.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ correo: '', clave: '' });
  const [cargando, setCargando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);

    try {
      await login(form.correo, form.clave);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Correo o contraseña incorrectos');
    } finally {
      setCargando(false);
    }
  }

  return { form, cargando, handleChange, handleSubmit };
}