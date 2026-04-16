import type React from "react";
import type { Materia } from "../dtos/Materia";
import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import api from "../api/axios";
import MateriaFormModal from "../components/MateriaFormModal";
import toast from "react-hot-toast";

const MateriasPage: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [materiaSeleccionada, setMateriaSeleccionada] =
    useState<Materia | null>(null);

  const handleEdit = (materia: Materia) => {
    setMateriaSeleccionada(materia);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMateriaSeleccionada(null);
  };

  const fetchMaterias = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get<Materia[]>("/materias");
      setMaterias(response.data);
    } catch (error:any) {
      console.log(error.response?.data?.mensaje || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMateria = async (id: string) => {
    if (
      !window.confirm(
        "¿Estás seguro de eliminar esta materia ? Esta acción no se puede deshacer.",
      )
    ) {
      return;
    }
    try {
      await api.delete(`/materias/${id}`);
      fetchMaterias();
      toast.success("Materia eliminada correctamente")
    } catch (error: any) {
      console.log(error.response?.data?.mensaje || "Error de conexión con el servidor");
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, [fetchMaterias]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Gestión de Materias
          </h2>
          <p className="text-gray-500">Listado y registro de materias</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-shadow"
        >
          <Plus size={20} />
          Nueva materia
        </button>
        {isModalOpen && (
          <MateriaFormModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={fetchMaterias}
          />
        )}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Nombre{" "}
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Codigo
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
              materias.map((materia) => (
                <tr key={materia.id}>
                  <td className="px-6 py-4 text-gray-800">{materia.nombre}</td>
                  <td className="px-6 py-4 text-gray-800">{materia.codigo}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-x-4 justify-end">
                      {" "}
                      <button
                        onClick={() => handleEdit(materia)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteMateria(materia.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        <MateriaFormModal
          onClose={handleCloseModal}
          onSuccess={fetchMaterias}
          materiaParaEditar={materiaSeleccionada}
        />
      )}
    </div>
  );
};

export default MateriasPage;
