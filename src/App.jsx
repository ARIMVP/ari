import { useState } from 'react'
import CompatibilidadARI from './pages/CompatibilidadARI'
import Colaboradores from './pages/Colaboradores'
export default function App() {
  const [vista, setVista] = useState('comparador')
  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setVista('comparador')} className="bg-blue-500 text-white px-4 py-2 rounded">Comparador</button>
        <button onClick={() => setVista('colaboradores')} className="bg-gray-600 text-white px-4 py-2 rounded">Colaboradores</button>
      </div>
      {vista === 'comparador' ? <CompatibilidadARI /> : <Colaboradores />}
    </div>
  )
}