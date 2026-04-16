import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Award, BookOpen, Hash } from 'lucide-react';
import type{ Alumno, NotaResponse } from '../dtos';
import api from '../api/axios';

const AlumnoDetallePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [alumno, setAlumno] = useState<Alumno | null>(null);
    const [notas, setNotas] = useState<NotaResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const [resAlumno, resNotas] = await Promise.all([
                    api.get<Alumno>(`/alumnos/${id}`),
                    api.get<NotaResponse[]>(`/notas/alumno/${id}`)
                ]);
                setAlumno(resAlumno.data);
                setNotas(resNotas.data);
            } catch (error:any) {
                console.log(error.response?.data?.mensaje || "Error de conexión con el servidor");
            } finally {
                setLoading(false);
            }
        };
        fetchDatos();
    }, [id]);

    if (loading) return <div className="p-10 text-center text-gray-500">Cargando expediente académico...</div>;
    if (!alumno) return <div className="p-10 text-center text-red-500">Estudiante no encontrado.</div>;

    const promedio = notas.length > 0 
        ? (notas.reduce((acc, n) => acc + n.valor, 0) / notas.length).toFixed(2)
        : "0.0";

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Botón de Regreso */}
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Volver al listado</span>
            </button>

            {/* Header del Perfil */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg shadow-indigo-100">
                        {alumno.nombre[0]}{alumno.apellido[0]}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{alumno.nombre} {alumno.apellido}</h2>
                        <div className="flex flex-wrap gap-4 mt-2">
                            <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                                <Mail size={16} /> {alumno.email}
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                                <BookOpen size={16} /> Ingeniería de Sistemas
                            </span>
                        </div>
                    </div>
                </div>

                {/* Badge de Promedio */}
                <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Promedio Actual</p>
                    <p className={`text-4xl font-black ${Number(promedio) >= 3 ? 'text-green-600' : 'text-red-600'}`}>
                        {promedio}
                    </p>
                </div>
            </div>

            {/* Tabla de Calificaciones */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Award className="text-amber-500" size={22} />
                        Historial de Notas
                    </h3>
                    <span className="text-sm text-gray-400">{notas.length} registros encontrados</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Materia</th>
                                <th className="px-6 py-4 font-semibold text-center"><Hash size={14} className="inline mr-1"/>Código</th>
                                <th className="px-6 py-4 font-semibold text-center">Calificación</th>
                                <th className="px-6 py-4 font-semibold text-right">Fecha</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {notas.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">
                                        No hay calificaciones registradas para este estudiante.
                                    </td>
                                </tr>
                            ) : (
                                notas.map((n) => (
                                    <tr key={n.notaId} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800">{n.nombreMateria}</td>
                                        <td className="px-6 py-4 text-center text-gray-500 font-mono text-xs">{n.codigoMateria}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-block w-12 py-1 rounded-lg font-bold text-sm ${
                                                n.valor >= 3 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {n.valor.toFixed(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-400 text-sm">
                                            {new Date(n.fechaRegistro).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AlumnoDetallePage;