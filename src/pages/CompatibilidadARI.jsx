import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function CompatibilidadARI() {
  const [jd, setJd] = useState('');
  const [cv, setCv] = useState('');
  const [colaboradores, setColaboradores] = useState([]);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const obtenerColaboradores = async () => {
      const querySnapshot = await getDocs(collection(db, 'colaboradores'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setColaboradores(data);
    };
    obtenerColaboradores();
  }, []);

  const handleSeleccionColaborador = (id) => {
    const seleccionado = colaboradores.find(c => c.id === id);
    if (seleccionado) {
      const cvGenerado = `
Nombre: ${seleccionado.nombre}
Rol: ${seleccionado.rol}
Tecnologías: ${seleccionado.tecnologias.join(', ')}
Estado: ${seleccionado.estado}
Cliente: ${seleccionado.cliente || '-'}
      `.trim();
      setCv(cvGenerado);
    }
  };

  const analizarCompatibilidad = () => {
    const stopwords = new Set([
      'el', 'la', 'los', 'las', 'y', 'o', 'de', 'del', 'en', 'con', 'para', 'por',
      'un', 'una', 'que', 'se', 'al', 'a', 'es', 'su', 'sus', 'como', 'más', 'menos'
    ]);
    const normalizar = (texto) =>
      texto.toLowerCase().split(/\W+/).filter(p => p.length > 2 && !stopwords.has(p));

    const jdPalabras = normalizar(jd);
    const cvPalabras = normalizar(cv);
    const jdUnicas = new Set(jdPalabras);
    let coincidencias = 0;

    jdUnicas.forEach(p => {
      if (cvPalabras.includes(p)) coincidencias++;
    });

    const porcentaje = Math.round((coincidencias / jdUnicas.size) * 100);
    const brechas = [...jdUnicas].filter(p => !cvPalabras.includes(p));

    let recomendacion = '';
    if (porcentaje >= 80) recomendacion = '✅ Perfil altamente compatible.';
    else if (porcentaje >= 50) recomendacion = '⚠️ Perfil compatible con áreas a reforzar.';
    else recomendacion = '❌ Se recomienda reforzar varias habilidades.';

    setResultado({ porcentaje, fortalezas: coincidencias, brechas, recomendacion });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-center">ARI - Comparador de Perfiles</h1>

      <div>
        <label className="block font-semibold mb-1">Selecciona colaborador registrado:</label>
        <select
          className="w-full border p-2 rounded"
          onChange={(e) => handleSeleccionColaborador(e.target.value)}
        >
          <option value="">-- Selecciona un colaborador --</option>
          {colaboradores.map(c => (
            <option key={c.id} value={c.id}>
              {c.nombre} ({c.rol})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Job Description</label>
        <textarea
          className="w-full h-32 border p-2 rounded"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Pega aquí la descripción del puesto..."
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Currículum (CV)</label>
        <textarea
          className="w-full h-32 border p-2 rounded"
          value={cv}
          onChange={(e) => setCv(e.target.value)}
          placeholder="Pega o genera automáticamente el CV..."
        />
      </div>

      <button
        onClick={analizarCompatibilidad}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Analizar compatibilidad
      </button>

      {resultado && (
        <div className="mt-6 border-t pt-4 space-y-2">
          <h2 className="text-xl font-semibold">Resultado</h2>
          <p><strong>Porcentaje de coincidencia:</strong> {resultado.porcentaje}%</p>
          <p><strong>Fortalezas:</strong> {resultado.fortalezas} coincidencias encontradas.</p>
          <p><strong>Brechas:</strong> {resultado.brechas.join(', ') || 'Ninguna.'}</p>
          <p><strong>Recomendación:</strong> {resultado.recomendacion}</p>
        </div>
      )}
    </div>
  );
}