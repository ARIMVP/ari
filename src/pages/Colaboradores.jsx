import React, { useState } from 'react';

const Colaboradores = ({ colaboradores, setColaboradores }) => {
  const [nombre, setNombre] = useState('');
  const [cv, setCV] = useState('');
  const [estado, setEstado] = useState('En banca');
  const [rol, setRol] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [skills, setSkills] = useState('');

  const agregarColaborador = () => {
    if (!nombre || !cv) return;
    const nuevo = {
      id: Date.now(),
      nombre,
      cv,
      estado,
      rol,
      ubicacion,
      skills: skills.split(',').map(s => s.trim()),
    };
    setColaboradores([...colaboradores, nuevo]);
    setNombre('');
    setCV('');
    setEstado('En banca');
    setRol('');
    setUbicacion('');
    setSkills('');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Colaboradores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Nombre del colaborador"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="CV del colaborador"
          value={cv}
          onChange={e => setCV(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={estado}
          onChange={e => setEstado(e.target.value)}
        >
          <option>En banca</option>
          <option>En proyecto</option>
          <option>De vacaciones</option>
        </select>
        <input
          className="border p-2 rounded"
          placeholder="Rol actual"
          value={rol}
          onChange={e => setRol(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={e => setUbicacion(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Skills principales (separadas por coma)"
          value={skills}
          onChange={e => setSkills(e.target.value)}
        />
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={agregarColaborador}
      >
        Agregar
      </button>

      <ul className="mt-6">
        {colaboradores.length === 0 ? (
          <p className="text-gray-600">No hay colaboradores registrados.</p>
        ) : (
          colaboradores.map(col => (
            <li key={col.id} className="border p-4 rounded mb-2">
              <strong>{col.nombre}</strong> - {col.estado} - {col.rol}<br />
              Ubicación: {col.ubicacion}<br />
              Skills: {col.skills.join(', ')}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Colaboradores;
