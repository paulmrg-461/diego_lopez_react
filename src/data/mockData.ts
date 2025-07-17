import type { Student, Instructor, Attendance, Schedule, Vehicle, DashboardStats } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Carlos Andrés',
    lastName: 'Rodríguez Muñoz',
    email: 'carlos.rodriguez@email.com',
    phone: '+57 312 456 7890',
    licenseType: 'B1',
    enrollmentDate: '2024-01-15',
    instructor: 'Miguel Ángel Torres',
    theoreticalHours: 18,
    practicalHours: 12,
    totalTheoreticalRequired: 20,
    totalPracticalRequired: 20,
    status: 'active'
  },
  {
    id: '2',
    name: 'María Fernanda',
    lastName: 'López Castaño',
    email: 'maria.lopez@email.com',
    phone: '+57 318 234 5678',
    licenseType: 'A2',
    enrollmentDate: '2024-02-01',
    instructor: 'Ana Patricia Gómez',
    theoreticalHours: 15,
    practicalHours: 8,
    totalTheoreticalRequired: 16,
    totalPracticalRequired: 16,
    status: 'active'
  },
  {
    id: '3',
    name: 'Juan Pablo',
    lastName: 'Vargas Hernández',
    email: 'juan.vargas@email.com',
    phone: '+57 315 987 6543',
    licenseType: 'C1',
    enrollmentDate: '2023-11-20',
    instructor: 'Roberto Silva Pérez',
    theoreticalHours: 25,
    practicalHours: 22,
    totalTheoreticalRequired: 25,
    totalPracticalRequired: 25,
    status: 'graduated'
  },
  {
    id: '4',
    name: 'Alejandra',
    lastName: 'Moreno Quintero',
    email: 'alejandra.moreno@email.com',
    phone: '+57 320 111 2233',
    licenseType: 'B2',
    enrollmentDate: '2024-03-10',
    instructor: 'Miguel Ángel Torres',
    theoreticalHours: 10,
    practicalHours: 6,
    totalTheoreticalRequired: 22,
    totalPracticalRequired: 22,
    status: 'active'
  },
  {
    id: '5',
    name: 'Diego Alejandro',
    lastName: 'Sánchez Ramos',
    email: 'diego.sanchez@email.com',
    phone: '+57 317 444 5566',
    licenseType: 'A1',
    enrollmentDate: '2024-01-30',
    instructor: 'Ana Patricia Gómez',
    theoreticalHours: 12,
    practicalHours: 10,
    totalTheoreticalRequired: 14,
    totalPracticalRequired: 14,
    status: 'active'
  },
  {
    id: '6',
    name: 'Valentina',
    lastName: 'Ospina Cardona',
    email: 'valentina.ospina@email.com',
    phone: '+57 314 777 8899',
    licenseType: 'B1',
    enrollmentDate: '2024-02-15',
    instructor: 'Roberto Silva Pérez',
    theoreticalHours: 20,
    practicalHours: 18,
    totalTheoreticalRequired: 20,
    totalPracticalRequired: 20,
    status: 'active'
  }
];

export const mockInstructors: Instructor[] = [
  {
    id: '1',
    name: 'Miguel Ángel',
    lastName: 'Torres',
    email: 'miguel.torres@diegolopez.com',
    phone: '+57 312 100 2000',
    specialties: ['B1', 'B2']
  },
  {
    id: '2',
    name: 'Ana Patricia',
    lastName: 'Gómez',
    email: 'ana.gomez@diegolopez.com',
    phone: '+57 318 200 3000',
    specialties: ['A1', 'A2']
  },
  {
    id: '3',
    name: 'Roberto',
    lastName: 'Silva Pérez',
    email: 'roberto.silva@diegolopez.com',
    phone: '+57 315 300 4000',
    specialties: ['B1', 'B2', 'C1']
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Chevrolet',
    model: 'Spark',
    year: 2022,
    plate: 'ABC-123',
    licenseType: 'B1',
    status: 'available'
  },
  {
    id: '2',
    brand: 'Renault',
    model: 'Logan',
    year: 2021,
    plate: 'DEF-456',
    licenseType: 'B2',
    status: 'available'
  },
  {
    id: '3',
    brand: 'Honda',
    model: 'CB 125',
    year: 2023,
    plate: 'GHI-789',
    licenseType: 'A2',
    status: 'in_use'
  },
  {
    id: '4',
    brand: 'Yamaha',
    model: 'XTZ 125',
    year: 2022,
    plate: 'JKL-012',
    licenseType: 'A1',
    status: 'available'
  }
];

export const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentId: '1',
    date: '2024-07-16',
    type: 'theoretical',
    status: 'present',
    hours: 2,
    instructor: 'Miguel Ángel Torres'
  },
  {
    id: '2',
    studentId: '2',
    date: '2024-07-16',
    type: 'practical',
    status: 'present',
    hours: 2,
    instructor: 'Ana Patricia Gómez'
  },
  {
    id: '3',
    studentId: '4',
    date: '2024-07-16',
    type: 'theoretical',
    status: 'absent',
    hours: 0,
    instructor: 'Miguel Ángel Torres'
  }
];

export const mockSchedule: Schedule[] = [
  {
    id: '1',
    studentId: '1',
    date: '2024-07-17',
    time: '08:00',
    type: 'theoretical',
    instructor: 'Miguel Ángel Torres',
    status: 'scheduled'
  },
  {
    id: '2',
    studentId: '2',
    date: '2024-07-17',
    time: '10:00',
    type: 'practical',
    instructor: 'Ana Patricia Gómez',
    vehicle: 'Honda CB 125',
    status: 'scheduled'
  },
  {
    id: '3',
    studentId: '5',
    date: '2024-07-17',
    time: '14:00',
    type: 'practical',
    instructor: 'Ana Patricia Gómez',
    vehicle: 'Yamaha XTZ 125',
    status: 'scheduled'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalStudents: 6,
  activeStudents: 5,
  graduatedStudents: 1,
  todayAttendance: 2,
  scheduledClasses: 3,
  completionRate: 75
};

export const licenseRequirements = {
  A1: { theoretical: 14, practical: 14 },
  A2: { theoretical: 16, practical: 16 },
  B1: { theoretical: 20, practical: 20 },
  B2: { theoretical: 22, practical: 22 },
  C1: { theoretical: 25, practical: 25 }
};