import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import NotaFormModal from '../components/NotaFormModal';


const NotasPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSuccess = () => {
        console.log("Nota registrada con éxito");
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Calificaciones</h2>
                    <p className="text-gray-500">Registra notas académicas</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm"
                >
                    <Plus size={20} />
                    Registrar Calificación
                </button>
            </div>

            {isModalOpen && (
                <NotaFormModal 
                    onClose={() => setIsModalOpen(false)} 
                    onSuccess={handleSuccess} 
                />
            )}
        </div>
    );
};

export default NotasPage;