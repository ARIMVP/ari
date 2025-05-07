import { useState } from 'react';
import CompatibilidadARI from './pages/CompatibilidadARI';
import Colaboradores from './pages/Colaboradores';
import Dashboard from './pages/Dashboard'; // Nuevo import

export default function App() {
  const [vista, setVista] = useState('comparador');

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
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
      </div>

      {vista === 'comparador' && <CompatibilidadARI />}
      {vista === 'colaboradores' && <Colaboradores />}
      {vista === 'dashboard' && <Dashboard />}
    </div>
  );
}
