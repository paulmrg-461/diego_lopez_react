import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  UserCheck,
  Car,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '../utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/'
    },
    {
      icon: Users,
      label: 'Estudiantes',
      path: '/students'
    },
    {
      icon: UserCheck,
      label: 'Asistencia',
      path: '/attendance'
    },
    {
      icon: Clock,
      label: 'Control de Horas',
      path: '/hours'
    },
    {
      icon: Calendar,
      label: 'Turnos',
      path: '/schedule'
    },
    {
      icon: Car,
      label: 'Vehículos',
      path: '/vehicles'
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 w-64 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DL</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Diego López</h2>
                <p className="text-xs text-gray-500">Escuela de Conducción</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button className="flex items-center space-x-3 px-4 py-3 w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Configuración</span>
            </button>
            <button className="flex items-center space-x-3 px-4 py-3 w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;