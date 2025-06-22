import { User } from "./User";

export interface Class {
  id: number;
  date: string; // ISO format like "2025-04-21"
  timeStart: string; //hh:mm
  timeEnd: string;
  duration: string;
  description?: string;
  student: User;
}
