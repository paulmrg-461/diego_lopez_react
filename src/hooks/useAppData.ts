import { useState } from 'react';
import type { Student, Attendance, Schedule, DashboardStats } from '../types';
import { 
  mockStudents, 
  mockAttendance, 
  mockSchedule, 
  mockDashboardStats 
} from '../data/mockData';

export const useAppData = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);
  const [schedule, setSchedule] = useState<Schedule[]>(mockSchedule);
  const [dashboardStats] = useState<DashboardStats>(mockDashboardStats);

  const updateAttendance = (studentId: string, date: string, status: 'present' | 'absent' | 'late') => {
    const existingAttendance = attendance.find(
      att => att.studentId === studentId && att.date === date
    );

    if (existingAttendance) {
      setAttendance(prev => 
        prev.map(att => 
          att.id === existingAttendance.id 
            ? { ...att, status, hours: status === 'present' ? 2 : 0 }
            : att
        )
      );
    } else {
      const newAttendance: Attendance = {
        id: Date.now().toString(),
        studentId,
        date,
        type: 'theoretical',
        status,
        hours: status === 'present' ? 2 : 0,
        instructor: 'Miguel Ángel Torres'
      };
      setAttendance(prev => [...prev, newAttendance]);
    }

    // Update student hours
    if (status === 'present') {
      setStudents(prev => 
        prev.map(student => 
          student.id === studentId 
            ? { ...student, theoreticalHours: student.theoreticalHours + 2 }
            : student
        )
      );
    }
  };

  const addSchedule = (newSchedule: Omit<Schedule, 'id'>) => {
    const schedule: Schedule = {
      ...newSchedule,
      id: Date.now().toString()
    };
    setSchedule(prev => [...prev, schedule]);
  };

  const updateScheduleStatus = (scheduleId: string, status: Schedule['status']) => {
    setSchedule(prev => 
      prev.map(sch => 
        sch.id === scheduleId ? { ...sch, status } : sch
      )
    );
  };

  const getStudentAttendance = (studentId: string) => {
    return attendance.filter(att => att.studentId === studentId);
  };

  const getStudentSchedule = (studentId: string) => {
    return schedule.filter(sch => sch.studentId === studentId);
  };

  const getTodayAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    return attendance.filter(att => att.date === today);
  };

  const getTodaySchedule = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedule.filter(sch => sch.date === today);
  };

  return {
    students,
    attendance,
    schedule,
    dashboardStats,
    updateAttendance,
    addSchedule,
    updateScheduleStatus,
    getStudentAttendance,
    getStudentSchedule,
    getTodayAttendance,
    getTodaySchedule
  };
};