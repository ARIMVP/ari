import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import CompatibilidadARI from './pages/CompatibilidadARI';
import Colaboradores from './pages/Colaboradores';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [vista, setVista] = useState('comparador');
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUsuario(user);
      } else {
        navigate('/'); // Redirige al login si no hay usuario
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (!usuario) return null; // evita mostrar UI hasta saber si hay sesión

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button onClick={() => setVista('comparador')} className={`px-4 py-2 rounded ${vista === 'comparador' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
            Comparador
          </button>
          <button onClick={() => setVista('colaboradores')} className={`px-4 py-2 rounded ${vista === 'colaboradores' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
            Colaboradores
          </button>
          <button onClick={() => setVista('dashboard')} className={`px-4 py-2 rounded ${vista === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
            Dashboard
          </button>
        </div>
        <button onClick={handleLogout} className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Cerrar sesión
        </button>
      </div>

      {vista === 'comparador' && <CompatibilidadARI />}
      {vista === 'colaboradores' && <Colaboradores />}
      {vista === 'dashboard' && <Dashboard />}
    </div>
  );
}
