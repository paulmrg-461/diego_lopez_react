import React, { useState } from 'react';
import { 
  Clock, 
  BookOpen, 
  Car, 
  TrendingUp, 
  Filter,
  Search,
  Award,
  AlertTriangle
} from 'lucide-react';
import { useAppData } from '../hooks/useAppData';
import { getProgressPercentage, getLicenseTypeColor, getStatusColor, cn } from '../utils';

const Hours: React.FC = () => {
  const { students, getStudentAttendance } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLicense, setFilterLicense] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('progress');

  const filteredAndSortedStudents = students
    .filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLicense = filterLicense === 'all' || student.licenseType === filterLicense;
      
      return matchesSearch && matchesLicense;
    })
    .sort((a, b) => {
      if (sortBy === 'progress') {
        const progressA = getProgressPercentage(
          a.theoreticalHours + a.practicalHours,
          a.totalTheoreticalRequired + a.totalPracticalRequired
        );
        const progressB = getProgressPercentage(
          b.theoreticalHours + b.practicalHours,
          b.totalTheoreticalRequired + b.totalPracticalRequired
        );
        return progressB - progressA;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'license') {
        return a.licenseType.localeCompare(b.licenseType);
      }
      return 0;
    });

  const getStudentProgress = (student: any) => {
    const totalCompleted = student.theoreticalHours + student.practicalHours;
    const totalRequired = student.totalTheoreticalRequired + student.totalPracticalRequired;
    const overallProgress = getProgressPercentage(totalCompleted, totalRequired);
    
    const theoreticalProgress = getProgressPercentage(
      student.theoreticalHours, 
      student.totalTheoreticalRequired
    );
    
    const practicalProgress = getProgressPercentage(
      student.practicalHours, 
      student.totalPracticalRequired
    );

    return {
      overall: overallProgress,
      theoretical: theoreticalProgress,
      practical: practicalProgress,
      isComplete: overallProgress >= 100,
      needsAttention: overallProgress < 50
    };
  };

  const overallStats = {
    totalStudents: students.length,
    completed: students.filter(s => {
      const progress = getStudentProgress(s);
      return progress.isComplete;
    }).length,
    inProgress: students.filter(s => {
      const progress = getStudentProgress(s);
      return progress.overall >= 50 && !progress.isComplete;
    }).length,
    needsAttention: students.filter(s => {
      const progress = getStudentProgress(s);
      return progress.needsAttention;
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Control de Horas</h1>
          <p className="text-gray-600">Monitorea el progreso de horas teóricas y prácticas</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Estudiantes</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.totalStudents}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completados</p>
              <p className="text-2xl font-bold text-green-600">{overallStats.completed}</p>
            </div>
            <Award className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Progreso</p>
              <p className="text-2xl font-bold text-blue-600">{overallStats.inProgress}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Requieren Atención</p>
              <p className="text-2xl font-bold text-orange-600">{overallStats.needsAttention}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar estudiantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterLicense}
                onChange={(e) => setFilterLicense(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas las licencias</option>
                <option value="A1">Licencia A1</option>
                <option value="A2">Licencia A2</option>
                <option value="B1">Licencia B1</option>
                <option value="B2">Licencia B2</option>
                <option value="C1">Licencia C1</option>
              </select>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="progress">Ordenar por progreso</option>
              <option value="name">Ordenar por nombre</option>
              <option value="license">Ordenar por licencia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Progress List */}
      <div className="space-y-4">
        {filteredAndSortedStudents.map((student) => {
          const progress = getStudentProgress(student);
          const attendance = getStudentAttendance(student.id);
          
          return (
            <div key={student.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Student Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {student.name.charAt(0)}{student.lastName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {student.name} {student.lastName}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getLicenseTypeColor(student.licenseType)
                      )}>
                        Licencia {student.licenseType}
                      </span>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(student.status)
                      )}>
                        {student.status === 'active' ? 'Activo' : 
                         student.status === 'graduated' ? 'Graduado' : 
                         student.status === 'suspended' ? 'Suspendido' : 'Inactivo'}
                      </span>
                      {progress.isComplete && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Completado
                        </span>
                      )}
                      {progress.needsAttention && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          ⚠ Requiere atención
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Overview */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{progress.overall}%</p>
                  <p className="text-sm text-gray-500">Progreso general</p>
                </div>
              </div>

              {/* Detailed Progress */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Theoretical Hours */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <h4 className="font-medium text-blue-900">Horas Teóricas</h4>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {progress.theoretical}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {student.theoreticalHours}
                    </span>
                    <span className="text-sm text-blue-600">
                      de {student.totalTheoreticalRequired} horas
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress.theoretical}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Faltan {student.totalTheoreticalRequired - student.theoreticalHours} horas
                  </p>
                </div>

                {/* Practical Hours */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Car className="w-4 h-4 text-green-600" />
                      <h4 className="font-medium text-green-900">Horas Prácticas</h4>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {progress.practical}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-green-600">
                      {student.practicalHours}
                    </span>
                    <span className="text-sm text-green-600">
                      de {student.totalPracticalRequired} horas
                    </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress.practical}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Faltan {student.totalPracticalRequired - student.practicalHours} horas
                  </p>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progreso General</span>
                  <span className="text-sm font-medium text-gray-700">{progress.overall}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={cn(
                      "h-3 rounded-full transition-all duration-300",
                      progress.isComplete ? "bg-green-600" :
                      progress.overall >= 75 ? "bg-blue-600" :
                      progress.overall >= 50 ? "bg-yellow-500" : "bg-red-500"
                    )}
                    style={{ width: `${progress.overall}%` }}
                  ></div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>Instructor: {student.instructor}</span>
                <span>Clases asistidas: {attendance.length}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hours;