import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, GraduationCap, LayoutDashboard, type LucideIcon, PencilLineIcon } from 'lucide-react';

interface MenuItem {
    name: string;
    path: string;
    icon: LucideIcon;
}

const Sidebar: React.FC = () => {
    const location = useLocation();
    
    const menuItems: MenuItem[] = [
        { name: 'Alumnos', path: '/', icon: Users },
        { name: 'Materias', path: '/materias', icon: GraduationCap },
        {name: 'Notas', path:'/notas', icon: PencilLineIcon},
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6">
                <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                    <LayoutDashboard size={24} />
                    EduGestion
                </h1>
            </div>
            
            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive 
                                    ? 'bg-indigo-50 text-indigo-700' 
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;