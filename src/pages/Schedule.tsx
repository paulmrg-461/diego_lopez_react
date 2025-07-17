import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  Car, 
  User,
  BookOpen,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAppData } from '../hooks/useAppData';
import { formatDate, formatTime, getStatusColor, cn } from '../utils';
import type { Schedule as ScheduleType } from '../types';
import { mockInstructors, mockVehicles } from '../data/mockData';

const Schedule: React.FC = () => {
  const { students, schedule, addSchedule, updateScheduleStatus } = useAppData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Get current week dates
  const getWeekDates = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startDate.setDate(diff);
    
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startDate);
      weekDate.setDate(startDate.getDate() + i);
      week.push(weekDate);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);
  
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const getScheduleForDate = (date: string) => {
    return schedule.filter(sch => {
      const matchesDate = sch.date === date;
      const matchesType = filterType === 'all' || sch.type === filterType;
      const matchesStatus = filterStatus === 'all' || sch.status === filterStatus;
      return matchesDate && matchesType && matchesStatus;
    });
  };

  const AddScheduleModal = () => {
    const [formData, setFormData] = useState({
      studentId: '',
      date: selectedDate,
      time: '',
      type: 'theoretical' as 'theoretical' | 'practical',
      instructor: '',
      vehicle: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newSchedule: Omit<ScheduleType, 'id'> = {
        ...formData,
        status: 'scheduled'
      };
      addSchedule(newSchedule);
      setShowAddModal(false);
      setFormData({
        studentId: '',
        date: selectedDate,
        time: '',
        type: 'theoretical',
        instructor: '',
        vehicle: ''
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Programar Nueva Clase</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estudiante
              </label>
              <select
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Seleccionar estudiante</option>
                {students.filter(s => s.status === 'active').map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} {student.lastName} - {student.licenseType}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Clase
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as 'theoretical' | 'practical'})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="theoretical">Teórica</option>
                <option value="practical">Práctica</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructor
              </label>
              <select
                value={formData.instructor}
                onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Seleccionar instructor</option>
                {mockInstructors.map(instructor => (
                  <option key={instructor.id} value={`${instructor.name} ${instructor.lastName}`}>
                    {instructor.name} {instructor.lastName}
                  </option>
                ))}
              </select>
            </div>

            {formData.type === 'practical' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehículo
                </label>
                <select
                  value={formData.vehicle}
                  onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleccionar vehículo</option>
                  {mockVehicles.filter(v => v.status === 'available').map(vehicle => (
                    <option key={vehicle.id} value={`${vehicle.brand} ${vehicle.model}`}>
                      {vehicle.brand} {vehicle.model} - {vehicle.plate}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Programar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Turnos</h1>
          <p className="text-gray-600">Programa y gestiona las clases de los estudiantes</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Clase</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los tipos</option>
            <option value="theoretical">Teóricas</option>
            <option value="practical">Prácticas</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="scheduled">Programadas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigateWeek('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <h2 className="text-lg font-semibold text-gray-900">
            Semana del {formatDate(weekDates[0].toISOString().split('T')[0])} al {formatDate(weekDates[6].toISOString().split('T')[0])}
          </h2>
          
          <button 
            onClick={() => navigateWeek('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Week Calendar */}
        <div className="grid grid-cols-7 gap-4">
          {weekDates.map((date, index) => {
            const dateString = date.toISOString().split('T')[0];
            const daySchedule = getScheduleForDate(dateString);
            const isToday = dateString === new Date().toISOString().split('T')[0];
            const isSelected = dateString === selectedDate;
            
            return (
              <div 
                key={index}
                className={cn(
                  "p-4 border rounded-lg cursor-pointer transition-colors",
                  isSelected ? "border-blue-500 bg-blue-50" :
                  isToday ? "border-green-500 bg-green-50" :
                  "border-gray-200 hover:bg-gray-50"
                )}
                onClick={() => setSelectedDate(dateString)}
              >
                <div className="text-center">
                  <p className={cn(
                    "text-xs font-medium mb-1",
                    isSelected ? "text-blue-600" :
                    isToday ? "text-green-600" : "text-gray-500"
                  )}>
                    {date.toLocaleDateString('es-CO', { weekday: 'short' }).toUpperCase()}
                  </p>
                  <p className={cn(
                    "text-lg font-bold",
                    isSelected ? "text-blue-600" :
                    isToday ? "text-green-600" : "text-gray-900"
                  )}>
                    {date.getDate()}
                  </p>
                  {daySchedule.length > 0 && (
                    <div className="mt-2">
                      <span className={cn(
                        "inline-block w-2 h-2 rounded-full",
                        isSelected ? "bg-blue-600" :
                        isToday ? "bg-green-600" : "bg-gray-400"
                      )}></span>
                      <p className="text-xs text-gray-500 mt-1">
                        {daySchedule.length} clase{daySchedule.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Schedule */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Clases del {formatDate(selectedDate)}
          </h2>
        </div>
        
        <div className="p-6">
          {getScheduleForDate(selectedDate).length > 0 ? (
            <div className="space-y-4">
              {getScheduleForDate(selectedDate)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((scheduleItem) => {
                  const student = students.find(s => s.id === scheduleItem.studentId);
                  
                  return (
                    <div key={scheduleItem.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {student?.name.charAt(0)}{student?.lastName.charAt(0)}
                            </span>
                          </div>
                          
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {student?.name} {student?.lastName}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{formatTime(scheduleItem.time)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {scheduleItem.type === 'theoretical' ? (
                                  <BookOpen className="w-4 h-4" />
                                ) : (
                                  <Car className="w-4 h-4" />
                                )}
                                <span>{scheduleItem.type === 'theoretical' ? 'Teórica' : 'Práctica'}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{scheduleItem.instructor}</span>
                              </div>
                              {scheduleItem.vehicle && (
                                <div className="flex items-center space-x-1">
                                  <Car className="w-4 h-4" />
                                  <span>{scheduleItem.vehicle}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            getStatusColor(scheduleItem.status)
                          )}>
                            {scheduleItem.status === 'scheduled' ? 'Programada' :
                             scheduleItem.status === 'completed' ? 'Completada' : 'Cancelada'}
                          </span>
                          
                          <div className="flex space-x-1">
                            {scheduleItem.status === 'scheduled' && (
                              <>
                                <button 
                                  onClick={() => updateScheduleStatus(scheduleItem.id, 'completed')}
                                  className="p-1 text-green-600 hover:text-green-800 transition-colors"
                                  title="Marcar como completada"
                                >
                                  <Clock className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => updateScheduleStatus(scheduleItem.id, 'cancelled')}
                                  className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                  title="Cancelar"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button className="p-1 text-gray-600 hover:text-gray-800 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay clases programadas para esta fecha</p>
              <button 
                onClick={() => setShowAddModal(true)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Programar Primera Clase
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Schedule Modal */}
      {showAddModal && <AddScheduleModal />}
    </div>
  );
};

export default Schedule;