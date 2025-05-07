import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useAuth } from './context/AuthContext';
import CompatibilidadARI from './pages/CompatibilidadARI';
import Colaboradores from './pages/Colaboradores';
import Dashboard from './pages/Dashboard';

export default function App() {
const [vista, setVista] = useState('comparador');
const navigate = useNavigate();
const { usuario } = useAuth();

const handleLogout = async () => {
await signOut(auth);
navigate('/');
};

return ( <div className="p-6">
{usuario && ( <p className="mb-4 text-gray-700 font-semibold">
Bienvenido, <span className="text-blue-600">{usuario.email}</span> </p>
)}

```
  <div className="flex gap-4 mb-6 flex-wrap">
    {usuario && (
      <>
        <button
          onClick={() => setVista('comparador')}
          className={`px-4 py-2 rounded ${vista === 'comparador' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Comparador
        </button>
        <button
          onClick={() => setVista('colaboradores')}
          className={`px-4 py-2 rounded ${vista === 'colaboradores' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Colaboradores
        </button>
        <button
          onClick={() => setVista('dashboard')}
          className={`px-4 py-2 rounded ${vista === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Dashboard
        </button>
      </>
    )}

    {!usuario && (
      <>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => navigate('/registro')}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Registrarse
        </button>
      </>
    )}

    {usuario && (
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    )}
  </div>

  {usuario ? (
    <>
      {vista === 'comparador' && <CompatibilidadARI />}
      {vista === 'colaboradores' && <Colaboradores />}
      {vista === 'dashboard' && <Dashboard />}
    </>
  ) : (
    <p className="text-gray-600">Por favor inicia sesión para usar la plataforma.</p>
  )}
</div>
```

);
}
