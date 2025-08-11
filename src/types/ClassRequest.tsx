export interface ClassRequest {
  studentId: number;
  date: string; // Format: "YYYY-MM-DD"
  timeStart: string; // Format: "HH:mm"
  duration: string;
  description: string;
  requestedByStudent: boolean;
}
