import React, { useState } from "react";

const Colaboradores = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoCV, setNuevoCV] = useState("");

  const agregarColaborador = () => {
    if (!nuevoNombre.trim() || !nuevoCV.trim()) return;

    const nuevo = {
      nombre: nuevoNombre.trim(),
      cv: nuevoCV.trim(),
    };

    setColaboradores([...colaboradores, nuevo]);
    setNuevoNombre("");
    setNuevoCV("");
  };

  const eliminarColaborador = (index) => {
    const actualizados = colaboradores.filter((_, i) => i !== index);
    setColaboradores(actualizados);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Gestión de Colaboradores</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre del colaborador"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          className="border p-2 mr-2 w-64 rounded"
        />
        <textarea
          placeholder="CV del colaborador"
          value={nuevoCV}
          onChange={(e) => setNuevoCV(e.target.value)}
          className="border p-2 mr-2 w-64 h-24 align-top rounded"
        />
        <button
          onClick={agregarColaborador}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Agregar
        </button>
      </div>

      {colaboradores.length === 0 ? (
        <p className="text-gray-500">No hay colaboradores registrados.</p>
      ) : (
        <ul className="space-y-2">
          {colaboradores.map((colab, index) => (
            <li
              key={index}
              className="flex items-start justify-between bg-gray-100 p-3 rounded"
            >
              <div>
                <strong>{colab.nombre}</strong>
                <p className="text-sm text-gray-700 mt-1">{colab.cv}</p>
              </div>
              <button
                onClick={() => eliminarColaborador(index)}
                className="ml-4 text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Colaboradores;
