export interface Class {
  id: number;
  studentId: number;
  studentFirstName: string;
  studentLastName: string;
  date: string; // ISO format like "2025-04-21"
  timeStart: string; //hh:mm
  duration: string;
  classStatus: string;
  description: string;
  requestedByStudent: boolean;
}
