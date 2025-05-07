import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RutaPrivada({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return null;
  return usuario ? children : <Navigate to="/login" />;
}
