import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import type {  Alumno,  AlumnoRequest } from '../dtos/Alumno';
import api from '../api/axios';
import toast from 'react-hot-toast';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
    alumnoParaEditar?: Alumno | null;
}

const AlumnoFormModal: React.FC<Props> = ({ onClose, onSuccess, alumnoParaEditar }) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AlumnoRequest>();

    useEffect(() => {
        if (alumnoParaEditar) {
            reset(alumnoParaEditar);
        }
    }, [alumnoParaEditar, reset]);

    const onSubmit = async (data: AlumnoRequest) => {
        try {
            if(alumnoParaEditar){
                await api.patch(`/alumnos/${alumnoParaEditar.id}`, data);
                toast.success("Datos actualizados correctamente")
            }else{
                await api.post('/alumnos', data);
                toast.success("Alumno registrado correctamente")
            }
            onSuccess();
            onClose();
        } catch (error: any) {
            console.log(error.response?.data?.mensaje || "Error de conexión con el servidor");
            ;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800">{alumnoParaEditar ? 'Editar Alumno' : 'Registrar Nuevo Alumno'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.nombre ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                            placeholder="Ej: Juan"
                        />
                        {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
                    </div>

                    {/* Apellido */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                        <input
                            {...register("apellido", { required: "El apellido es obligatorio" })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="Ej: Pérez"
                        />
                         {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                        <input
                            type="email"
                            {...register("email", { 
                                required: "El email es obligatorio",
                                pattern: { value: /^\S+@\S+$/i, message: "Formato de email inválido" }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="juan@universidad.edu.co"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Fecha Nacimiento */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            {...register("fechaNacimiento", { required: "La fecha es obligatoria" })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                         {errors.fechaNacimiento && <p className="text-red-500 text-xs mt-1">{errors.fechaNacimiento.message}</p>}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
                        >
                            {isSubmitting ? 'Guardando...' : 'Registrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AlumnoFormModal;