import React, { useState } from "react";

const CompatibilidadARI = () => {
  const [jd, setJd] = useState("");
  const [cv, setCv] = useState("");
  const [resultado, setResultado] = useState(null);

  const analizarCompatibilidad = () => {
    const jdSkills = jd.toLowerCase().split(/[\s,.;:()]+/).filter(Boolean);
    const cvSkills = cv.toLowerCase().split(/[\s,.;:()]+/).filter(Boolean);

    const totalSkills = [...new Set(jdSkills)];
    const coincidencias = totalSkills.filter(skill => cvSkills.includes(skill));
    const brechas = totalSkills.filter(skill => !cvSkills.includes(skill));

    const porcentaje = totalSkills.length > 0
      ? ((coincidencias.length / totalSkills.length) * 100).toFixed(2)
      : 0;

    setResultado({
      coincidencias,
      brechas,
      porcentaje,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Comparador ARI</h1>

      <label className="block mb-2 font-semibold">Descripción del trabajo</label>
      <textarea
        value={jd}
        onChange={e => setJd(e.target.value)}
        className="w-full border rounded p-2 mb-4"
        rows={5}
        placeholder="Pega aquí la descripción del trabajo"
      />

      <label className="block mb-2 font-semibold">Currículum (CV)</label>
      <textarea
        value={cv}
        onChange={e => setCv(e.target.value)}
        className="w-full border rounded p-2 mb-4"
        rows={5}
        placeholder="Pega aquí el CV del colaborador"
      />

      <button
        onClick={analizarCompatibilidad}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Analizar compatibilidad
      </button>

      {resultado && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold">Resultado</h2>
          <p><strong>Porcentaje de coincidencia:</strong> {resultado.porcentaje} %</p>
          <p><strong>Fortalezas:</strong> {resultado.coincidencias.length} coincidencias encontradas.</p>
          <p><strong>Brechas:</strong> {resultado.brechas.length > 0 ? resultado.brechas.join(", ") : "Ninguna."}</p>
          <p>
            <strong>Recomendación:</strong>{" "}
            {resultado.porcentaje < 50
              ? "❌ Se recomienda reforzar varias habilidades."
              : "✅ Buen nivel de coincidencia."}
          </p>
        </div>
      )}
    </div>
  );
};

export default CompatibilidadARI;
