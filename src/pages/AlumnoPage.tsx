import React, { useState, useEffect, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Alumno } from "../dtos/Alumno";
import api from "../api/axios";
import AlumnoFormModal from "../components/AlumnoFormModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AlumnosPage: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<Alumno | null>(
    null,
  );

  const navigate = useNavigate();

  const handleEdit = (alumno: Alumno) => {
    setAlumnoSeleccionado(alumno);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAlumnoSeleccionado(null);
  };

  const fetchAlumnos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get<Alumno[]>("/alumnos");
      setAlumnos(response.data);
    } catch (error:any) {
      console.log(error.response?.data?.mensaje || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAlumno = async (id: string) => {
    if (
      !window.confirm(
        "¿Estás seguro de eliminar este alumno? Esta acción no se puede deshacer.",
      )
    ) {
      return;
    }

    try {
      await api.delete(`/alumnos/${id}`);
      fetchAlumnos();
      toast.success("Alumno eliminado correctamente")
    } catch (error: any) {
      console.log(error.response?.data?.mensaje || "Error de conexión con el servidor");
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, [fetchAlumnos]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Gestión de Alumnos
          </h2>
          <p className="text-gray-500">Listado y registro de estudiantes</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-shadow"
        >
          <Plus size={20} />
          Nuevo Alumno
        </button>
        {isModalOpen && (
          <AlumnoFormModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={fetchAlumnos}
          />
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Nombre Completo
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td className="px-6 py-4" colSpan={3}>
                  Cargando...
                </td>
              </tr>
            ) : (
              alumnos.map((alumno) => (
                <tr key={alumno.id}>
                  <td className="px-6 py-4 text-gray-800">
                    {alumno.nombre} {alumno.apellido}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{alumno.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-x-4 justify-end">
                      {" "}
                      <button
                        onClick={() => navigate(`/alumno/${alumno.id}`)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
                      >
                        Ver detalles
                      </button>
                      <button
                        onClick={() => handleEdit(alumno)}
                        className="text-amber-600 hover:text-amber-800 font-medium text-sm transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteAlumno(alumno.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <AlumnoFormModal
          onClose={handleCloseModal}
          onSuccess={fetchAlumnos}
          alumnoParaEditar={alumnoSeleccionado}
        />
      )}
    </div>
  );
};

export default AlumnosPage;
