import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function Colaboradores() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    rol: '',
    tecnologias: '',
    estado: 'banca',
    cliente: ''
  });
  const [colaboradores, setColaboradores] = useState([]);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    obtenerColaboradores();
  }, []);

  const obtenerColaboradores = async () => {
    const querySnapshot = await getDocs(collection(db, 'colaboradores'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setColaboradores(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoColaborador = {
      ...formulario,
      tecnologias: formulario.tecnologias.split(',').map(t => t.trim()),
      fechaRegistro: new Date().toISOString()
    };
    await addDoc(collection(db, 'colaboradores'), nuevoColaborador);
    setFormulario({ nombre: '', email: '', rol: '', tecnologias: '', estado: 'banca', cliente: '' });
    obtenerColaboradores();
  };

  const filtrados = colaboradores.filter(c =>
    filtro === 'todos' ? true : c.estado === filtro
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold">Registrar nuevo colaborador</h2>

        <input type="text" name="nombre" placeholder="Nombre completo"
          className="w-full border p-2 rounded" value={formulario.nombre} onChange={handleChange} required />

        <input type="email" name="email" placeholder="Correo electrónico"
          className="w-full border p-2 rounded" value={formulario.email} onChange={handleChange} required />

        <input type="text" name="rol" placeholder="Rol profesional"
          className="w-full border p-2 rounded" value={formulario.rol} onChange={handleChange} required />

        <input type="text" name="tecnologias" placeholder="Tecnologías (separadas por coma)"
          className="w-full border p-2 rounded" value={formulario.tecnologias} onChange={handleChange} />

        <select name="estado" className="w-full border p-2 rounded"
          value={formulario.estado} onChange={handleChange}>
          <option value="asignado">Asignado</option>
          <option value="banca">En banca</option>
          <option value="baja">Dado de baja</option>
        </select>

        <input type="text" name="cliente" placeholder="Cliente actual (opcional)"
          className="w-full border p-2 rounded" value={formulario.cliente} onChange={handleChange} />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Guardar colaborador
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Colaboradores registrados</h2>

        <div className="mb-4">
          <label className="font-semibold mr-2">Filtrar por estado:</label>
          <select value={filtro} onChange={e => setFiltro(e.target.value)} className="border p-2 rounded">
            <option value="todos">Todos</option>
            <option value="asignado">Asignado</option>
            <option value="banca">En banca</option>
            <option value="baja">Dado de baja</option>
          </select>
        </div>

        <table className="w-full text-sm border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Nombre</th>
              <th className="border px-2 py-1">Rol</th>
              <th className="border px-2 py-1">Estado</th>
              <th className="border px-2 py-1">Tecnologías</th>
              <th className="border px-2 py-1">Cliente</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(c => (
              <tr key={c.id} className="border-t">
                <td className="border px-2 py-1">{c.nombre}</td>
                <td className="border px-2 py-1">{c.rol}</td>
                <td className="border px-2 py-1">{c.estado}</td>
                <td className="border px-2 py-1">{c.tecnologias?.join(', ')}</td>
                <td className="border px-2 py-1">{c.cliente || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}