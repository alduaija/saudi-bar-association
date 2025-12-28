
export enum UserRole {
  TRAINEE = 'متدرب',
  TRAINER = 'مدرب',
  COURSE_MANAGER = 'مدير دورة',
  CONTENT_MANAGER = 'مدير محتوى',
  PROGRAM_MANAGER = 'مدير برنامج',
  OFFICIAL = 'موظف مسؤول',
  ADMIN = 'مسؤول النظام'
}

export interface Course {
  id: string;
  title: string;
  type: 'recorded' | 'virtual' | 'onsite';
  category: string;
  enrolledCount: number;
  status: 'active' | 'draft' | 'archived';
  thumbnail: string;
}

export interface LegalPublication {
  id: string;
  title: string;
  type: 'law' | 'regulation' | 'report' | 'policy' | 'guide';
  date: string;
  url: string;
}

export interface KPIStats {
  trainees: number;
  trainers: number;
  contentPieces: number;
  sales: number;
  vision2030Progress: number;
}
