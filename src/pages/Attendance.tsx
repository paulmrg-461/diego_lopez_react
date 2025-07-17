import React, { useState } from 'react';
import { 
  Calendar, 
  UserCheck, 
  UserX, 
  Clock, 
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useAppData } from '../hooks/useAppData';
import { formatDate, getStatusColor, cn } from '../utils';

const Attendance: React.FC = () => {
  const { students, attendance, updateAttendance } = useAppData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const dateAttendance = attendance.filter(att => att.date === selectedDate);
  
  const getAttendanceForStudent = (studentId: string, date: string) => {
    return attendance.find(att => att.studentId === studentId && att.date === date);
  };

  const handleAttendanceUpdate = (studentId: string, status: 'present' | 'absent' | 'late') => {
    updateAttendance(studentId, selectedDate, status);
  };

  const filteredStudents = students.filter(student => {
    if (filterType === 'all') return true;
    if (filterType === 'present') {
      const att = getAttendanceForStudent(student.id, selectedDate);
      return att?.status === 'present';
    }
    if (filterType === 'absent') {
      const att = getAttendanceForStudent(student.id, selectedDate);
      return att?.status === 'absent' || !att;
    }
    if (filterType === 'late') {
      const att = getAttendanceForStudent(student.id, selectedDate);
      return att?.status === 'late';
    }
    return true;
  });

  const attendanceStats = {
    total: students.length,
    present: dateAttendance.filter(att => att.status === 'present').length,
    absent: students.length - dateAttendance.filter(att => att.status === 'present' || att.status === 'late').length,
    late: dateAttendance.filter(att => att.status === 'late').length
  };

  const AttendanceButton = ({ 
    status, 
    onClick, 
    active, 
    icon: Icon, 
    label 
  }: { 
    status: string;
    onClick: () => void;
    active: boolean;
    icon: React.ElementType;
    label: string;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors",
        active 
          ? getStatusColor(status).replace('100', '200')
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      )}
    >
      <Icon className="w-3 h-3" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Control de Asistencia</h1>
          <p className="text-gray-600">Registra y gestiona la asistencia diaria de los estudiantes</p>
        </div>
      </div>

      {/* Date and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Date Selector */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Fecha</h3>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-2">
            {formatDate(selectedDate)}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Presentes</p>
              <p className="text-2xl font-bold text-green-600">{attendanceStats.present}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ausentes</p>
              <p className="text-2xl font-bold text-red-600">{attendanceStats.absent}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tardanzas</p>
              <p className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterType('all')}
              className={cn(
                "px-3 py-1 rounded-lg text-sm font-medium transition-colors",
                filterType === 'all'
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('present')}
              className={cn(
                "px-3 py-1 rounded-lg text-sm font-medium transition-colors",
                filterType === 'present'
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Presentes
            </button>
            <button
              onClick={() => setFilterType('absent')}
              className={cn(
                "px-3 py-1 rounded-lg text-sm font-medium transition-colors",
                filterType === 'absent'
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Ausentes
            </button>
            <button
              onClick={() => setFilterType('late')}
              className={cn(
                "px-3 py-1 rounded-lg text-sm font-medium transition-colors",
                filterType === 'late'
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Tardanzas
            </button>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista de Asistencia - {formatDate(selectedDate)}
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredStudents.map((student) => {
            const studentAttendance = getAttendanceForStudent(student.id, selectedDate);
            const currentStatus = studentAttendance?.status;
            
            return (
              <div key={student.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
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
                      <p className="text-sm text-gray-500">
                        Licencia {student.licenseType} • {student.instructor}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <AttendanceButton
                      status="present"
                      onClick={() => handleAttendanceUpdate(student.id, 'present')}
                      active={currentStatus === 'present'}
                      icon={CheckCircle}
                      label="Presente"
                    />
                    <AttendanceButton
                      status="late"
                      onClick={() => handleAttendanceUpdate(student.id, 'late')}
                      active={currentStatus === 'late'}
                      icon={AlertCircle}
                      label="Tarde"
                    />
                    <AttendanceButton
                      status="absent"
                      onClick={() => handleAttendanceUpdate(student.id, 'absent')}
                      active={currentStatus === 'absent'}
                      icon={XCircle}
                      label="Ausente"
                    />
                  </div>
                </div>
                
                {studentAttendance && (
                  <div className="mt-3 ml-16">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Horas: {studentAttendance.hours}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UserCheck className="w-4 h-4" />
                        <span>Tipo: {studentAttendance.type === 'theoretical' ? 'Teórica' : 'Práctica'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Marcar Todos Presentes</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Exportar Reporte</span>
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <UserX className="w-4 h-4" />
            <span>Limpiar Asistencia</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;