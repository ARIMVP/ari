// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function Dashboard() {
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const snapshot = await getDocs(collection(db, 'colaboradores'));
      const datos = snapshot.docs.map(doc => doc.data());
      setColaboradores(datos);
    };
    obtenerDatos();
  }, []);

  const total = colaboradores.length;

  const porEstado = ['asignado', 'banca', 'baja'].map(estado => ({
    name: estado.charAt(0).toUpperCase() + estado.slice(1),
    value: colaboradores.filter(c => c.estado === estado).length
  }));

  const tecnologiasCount = colaboradores.flatMap(c => c.tecnologias || [])
    .reduce((acc, tech) => {
      acc[tech] = (acc[tech] || 0) + 1;
      return acc;
    }, {});

  const tecnologiasTop = Object.entries(tecnologiasCount)
    .map(([key, value]) => ({ name: key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const porCliente = colaboradores.reduce((acc, c) => {
    if (c.cliente) {
      acc[c.cliente] = (acc[c.cliente] || 0) + 1;
    }
    return acc;
  }, {});

  const clientesTop = Object.entries(porCliente)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold">📊 Dashboard de colaboradores</h2>
      <p>Total registrados: <strong>{total}</strong></p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2">Por estado</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={porEstado} dataKey="value" nameKey="name" outerRadius={80}>
                {porEstado.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2">Top tecnologías</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={tecnologiasTop}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2">Top clientes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={clientesTop}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
