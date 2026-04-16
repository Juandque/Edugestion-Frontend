import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Save } from 'lucide-react';
import type { Alumno, Materia, NotaRequest } from '../dtos';
import api from '../api/axios';
import toast from 'react-hot-toast';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

const NotaFormModal: React.FC<Props> = ({ onClose, onSuccess }) => {
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NotaRequest>();

    useEffect(() => {
        const loadFormData = async () => {
            try {
                const [resAlumnos, resMaterias] = await Promise.all([
                    api.get<Alumno[]>('/alumnos'),
                    api.get<Materia[]>('/materias')
                ]);
                setAlumnos(resAlumnos.data);
                setMaterias(resMaterias.data);
            } catch (error:any) {
                console.log(error.response?.data?.mensaje || "Error de conexión con el servidor");
            } finally {
                setLoadingData(false);
            }
        };
        loadFormData();
    }, []);

    const onSubmit = async (data: NotaRequest) => {
        try {
            await api.post('/notas', data);
            toast.success("Nota registrada correctamente")
            onSuccess();
            onClose();
        } catch (error: any) {
            console.log(error.response?.data?.mensaje || "Error de conexión con el servidor");
        }
    };

    if (loadingData) return null; 

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100">
                <div className="flex justify-between items-center p-6 border-b border-gray-50">
                    <h3 className="text-xl font-bold text-gray-800">Registrar Calificación</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    {/* Selector de Alumno */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alumno</label>
                        <select
                            {...register("alumnoId", { required: "Seleccione un alumno" })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white"
                        >
                            <option value="">Seleccione el estudiante...</option>
                            {alumnos.map(a => (
                                <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>
                            ))}
                        </select>
                        {errors.alumnoId && <p className="text-red-500 text-xs mt-1">{errors.alumnoId.message}</p>}
                    </div>

                    {/* Selector de Materia */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Materia</label>
                        <select
                            {...register("materiaId", { required: "Seleccione una materia" })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white"
                        >
                            <option value="">Seleccione la materia...</option>
                            {materias.map(m => (
                                <option key={m.id} value={m.id}>{m.nombre} ({m.codigo})</option>
                            ))}
                        </select>
                        {errors.materiaId && <p className="text-red-500 text-xs mt-1">{errors.materiaId.message}</p>}
                    </div>

                    {/* Valor de la Nota */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nota (1.0 - 5.0)</label>
                        <input
                            type="number"
                            step="0.1"
                            onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                            {...register("valor", { 
                                required: "La nota es obligatoria",
                                valueAsNumber: true,
                                min: { value: 1, message: "Mínimo 1.0" },
                                max: { value: 5, message: "Máximo 5.0" }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="4.5"
                        />
                        {errors.valor && <p className="text-red-500 text-xs mt-1">{errors.valor.message}</p>}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
                        >
                            <Save size={18} />
                            {isSubmitting ? 'Guardando...' : 'Guardar Nota'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NotaFormModal;