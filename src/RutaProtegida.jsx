// src/RutaProtegida.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function RutaProtegida({ children }) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/" replace />; // Redirige al login si no hay sesión
  }

  return children; // Si hay sesión, renderiza el contenido protegido
}
