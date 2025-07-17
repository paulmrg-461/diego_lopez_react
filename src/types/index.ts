

export type LicenseType = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type StudentStatus = 'active' | 'graduated' | 'suspended' | 'inactive';

export type VehicleStatus = 'available' | 'in_use' | 'maintenance' | 'out_of_service';

export interface Student {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  licenseType: LicenseType;
  enrollmentDate: string;
  instructor: string;
  theoreticalHours: number;
  practicalHours: number;
  totalTheoreticalRequired: number;
  totalPracticalRequired: number;
  status: StudentStatus;
  avatar?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  type: 'theoretical' | 'practical';
  status: 'present' | 'absent' | 'late';
  hours: number;
  instructor: string;
  notes?: string;
}

export interface Schedule {
  id: string;
  studentId: string;
  date: string;
  time: string;
  type: 'theoretical' | 'practical';
  instructor: string;
  vehicle?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Instructor {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  specialties: LicenseType[];
  avatar?: string;
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  graduatedStudents: number;
  todayAttendance: number;
  scheduledClasses: number;
  completionRate: number;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  licenseType: LicenseType;
  status: VehicleStatus;
  mileage: number;
  lastMaintenance: string;
  nextMaintenance: string;
}