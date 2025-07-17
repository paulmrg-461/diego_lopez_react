import React from 'react';
import { 
  Users, 
  UserCheck, 
  GraduationCap, 
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useAppData } from '../hooks/useAppData';
import { getStatusColor, cn } from '../utils';

const Dashboard: React.FC = () => {
  const { 
    students, 
    dashboardStats, 
    getTodaySchedule 
  } = useAppData();
  const todaySchedule = getTodaySchedule();
  const recentStudents = students.slice(0, 5);

  const statCards = [
    {
      title: 'Total Estudiantes',
      value: dashboardStats.totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Estudiantes Activos',
      value: dashboardStats.activeStudents,
      icon: UserCheck,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Graduados',
      value: dashboardStats.graduatedStudents,
      icon: GraduationCap,
      color: 'bg-purple-500',
      change: '+25%'
    },
    {
      title: 'Clases Hoy',
      value: todaySchedule.length,
      icon: Calendar,
      color: 'bg-orange-500',
      change: '0%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">¡Bienvenido al Sistema de Gestión!</h1>
        <p className="text-blue-100">
          Gestiona la asistencia y el progreso de los estudiantes de la Escuela de Conducción Diego López
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className={cn("p-3 rounded-lg", stat.color)}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Clases de Hoy</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            {todaySchedule.length > 0 ? (
              <div className="space-y-4">
                {todaySchedule.map((schedule) => {
                  const student = students.find(s => s.id === schedule.studentId);
                  return (
                    <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {student?.name.charAt(0)}{student?.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {student?.name} {student?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {schedule.type === 'theoretical' ? 'Teórica' : 'Práctica'} - {schedule.time}
                          </p>
                        </div>
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(schedule.status)
                      )}>
                        {schedule.status === 'scheduled' ? 'Programada' : 
                         schedule.status === 'completed' ? 'Completada' : 'Cancelada'}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No hay clases programadas para hoy</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Students */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Estudiantes Recientes</h2>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentStudents.map((student) => {
                const progressPercentage = Math.round(
                  ((student.theoreticalHours + student.practicalHours) / 
                   (student.totalTheoreticalRequired + student.totalPracticalRequired)) * 100
                );
                
                return (
                  <div key={student.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {student.name.charAt(0)}{student.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {student.name} {student.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Licencia {student.licenseType}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{progressPercentage}%</p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <UserCheck className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Marcar Asistencia</p>
                <p className="text-sm text-gray-500">Registrar asistencia del día</p>
              </div>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Programar Clase</p>
                <p className="text-sm text-gray-500">Agendar nueva clase</p>
              </div>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-6 h-6 text-purple-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Nuevo Estudiante</p>
                <p className="text-sm text-gray-500">Registrar estudiante</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;