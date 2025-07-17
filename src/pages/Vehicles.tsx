import React, { useState } from 'react';
import { 
  Car, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings
} from 'lucide-react';
import { useAppData } from '../hooks/useAppData';
import { formatDate, getStatusColor, cn } from '../utils';
import type { Vehicle, VehicleStatus } from '../types';
import { mockVehicles } from '../data/mockData';

const Vehicles: React.FC = () => {
  const { schedule } = useAppData();
  const [vehicles] = useState(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getVehicleSchedule = (vehicleId: string) => {
    const today = new Date().toISOString().split('T')[0];
    return schedule.filter(sch => 
      sch.vehicle?.includes(vehicles.find(v => v.id === vehicleId)?.brand || '') &&
      sch.date >= today &&
      sch.status === 'scheduled'
    );
  };

  const getStatusIcon = (status: VehicleStatus) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_use':
        return <User className="w-5 h-5 text-blue-500" />;
      case 'maintenance':
        return <Settings className="w-5 h-5 text-yellow-500" />;
      case 'out_of_service':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: VehicleStatus) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'in_use':
        return 'En Uso';
      case 'maintenance':
        return 'Mantenimiento';
      case 'out_of_service':
        return 'Fuera de Servicio';
      default:
        return 'Desconocido';
    }
  };

  const VehicleDetailModal = ({ vehicle }: { vehicle: Vehicle }) => {
    const vehicleSchedule = getVehicleSchedule(vehicle.id);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {vehicle.brand} {vehicle.model}
                  </h2>
                  <p className="text-gray-600">{vehicle.plate}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedVehicle(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Vehicle Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Información del Vehículo</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marca:</span>
                    <span className="font-medium">{vehicle.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Modelo:</span>
                    <span className="font-medium">{vehicle.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Año:</span>
                    <span className="font-medium">{vehicle.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Placa:</span>
                    <span className="font-medium">{vehicle.plate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo de Licencia:</span>
                    <span className="font-medium">{vehicle.licenseType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estado:</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(vehicle.status)}
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(vehicle.status)
                      )}>
                        {getStatusText(vehicle.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Mantenimiento</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Último Mantenimiento:</span>
                    <span className="font-medium">{formatDate(vehicle.lastMaintenance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Próximo Mantenimiento:</span>
                    <span className="font-medium">{formatDate(vehicle.nextMaintenance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kilometraje:</span>
                    <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                </div>
                
                {/* Maintenance Alert */}
                {new Date(vehicle.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800 font-medium">
                        Mantenimiento próximo
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      El vehículo requiere mantenimiento en los próximos 7 días.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Schedule */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Clases Programadas</h3>
              
              {vehicleSchedule.length > 0 ? (
                <div className="space-y-3">
                  {vehicleSchedule.slice(0, 5).map((sch) => (
                    <div key={sch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {formatDate(sch.date)} - {sch.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            Instructor: {sch.instructor}
                          </p>
                        </div>
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(sch.status)
                      )}>
                        {sch.status === 'scheduled' ? 'Programada' : 
                         sch.status === 'completed' ? 'Completada' : 'Cancelada'}
                      </span>
                    </div>
                  ))}
                  
                  {vehicleSchedule.length > 5 && (
                    <p className="text-sm text-gray-500 text-center">
                      Y {vehicleSchedule.length - 5} clases más...
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No hay clases programadas</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Editar</span>
              </button>
              <button className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                Programar Mantenimiento
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddVehicleModal = () => {
    const [formData, setFormData] = useState({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      plate: '',
      licenseType: 'B1',
      mileage: 0
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Here you would typically add the vehicle to your state/database
      console.log('Adding vehicle:', formData);
      setShowAddModal(false);
      setFormData({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        plate: '',
        licenseType: 'B1',
        mileage: 0
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Agregar Nuevo Vehículo</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Año
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  min="2000"
                  max={new Date().getFullYear() + 1}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Placa
                </label>
                <input
                  type="text"
                  value={formData.plate}
                  onChange={(e) => setFormData({...formData, plate: e.target.value.toUpperCase()})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ABC123"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Licencia
              </label>
              <select
                value={formData.licenseType}
                onChange={(e) => setFormData({...formData, licenseType: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="A1">A1 - Motocicleta hasta 125cc</option>
                <option value="A2">A2 - Motocicleta hasta 400cc</option>
                <option value="B1">B1 - Automóvil</option>
                <option value="B2">B2 - Camioneta</option>
                <option value="C1">C1 - Camión</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kilometraje
              </label>
              <input
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData({...formData, mileage: parseInt(e.target.value)})}
                min="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

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
                Agregar
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
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Vehículos</h1>
          <p className="text-gray-600">Administra la flota de vehículos de la escuela</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Vehículo</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vehículos</p>
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
            <Car className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Disponibles</p>
              <p className="text-2xl font-bold text-green-600">
                {vehicles.filter(v => v.status === 'available').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Uso</p>
              <p className="text-2xl font-bold text-blue-600">
                {vehicles.filter(v => v.status === 'in_use').length}
              </p>
            </div>
            <User className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mantenimiento</p>
              <p className="text-2xl font-bold text-yellow-600">
                {vehicles.filter(v => v.status === 'maintenance').length}
              </p>
            </div>
            <Settings className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por marca, modelo o placa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="available">Disponible</option>
              <option value="in_use">En Uso</option>
              <option value="maintenance">Mantenimiento</option>
              <option value="out_of_service">Fuera de Servicio</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => {
          const upcomingClasses = getVehicleSchedule(vehicle.id).length;
          const needsMaintenance = new Date(vehicle.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          
          return (
            <div 
              key={vehicle.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Car className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-600">{vehicle.year} • {vehicle.plate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(vehicle.status)}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tipo de Licencia:</span>
                    <span className="font-medium">{vehicle.licenseType}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kilometraje:</span>
                    <span className="font-medium">{vehicle.mileage?.toLocaleString() ?? 'N/A'} km</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estado:</span>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      getStatusColor(vehicle.status)
                    )}>
                      {getStatusText(vehicle.status)}
                    </span>
                  </div>
                  
                  {upcomingClasses > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Clases Programadas:</span>
                      <span className="font-medium text-blue-600">{upcomingClasses}</span>
                    </div>
                  )}
                </div>
                
                {needsMaintenance && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800 font-medium">
                        Mantenimiento próximo
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Edit vehicle logic
                    }}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Delete vehicle logic
                    }}
                    className="px-3 py-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron vehículos</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Agregar Primer Vehículo
          </button>
        </div>
      )}

      {/* Modals */}
      {selectedVehicle && <VehicleDetailModal vehicle={selectedVehicle} />}
      {showAddModal && <AddVehicleModal />}
    </div>
  );
};

export default Vehicles;