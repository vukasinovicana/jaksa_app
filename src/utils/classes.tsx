import { Class } from "../types/Class";

export const classes: Class[] = [
  {
    id: 1,
    date: "2025-06-20",
    timeStart: "09:00",
    timeEnd: "10:00",
    duration: "1",
    description: "Matematika - priprema za test",
    student: {
      firstname: "Ana",
      lastname: "Vukasinovic",
      email: "marko.markovic@example.com",
      phone: "+381601234567",
      username: "anvu",
    },
  },
  {
    id: 2,
    date: "2025-06-21",
    timeStart: "14:30",
    timeEnd: "15:30",
    duration: "1",
    description: "Vezbanje integrala 2",
    student: {
      firstname: "Ana",
      lastname: "Vukasinovic",
      email: "marko.markovic@example.com",
      phone: "+381601234567",
      username: "anvu",
    },
  },
  {
    id: 3,
    date: "2025-06-22",
    timeStart: "11:00",
    timeEnd: "12:00",
    duration: "1",
    description: " ",
    student: {
      firstname: "Ivan",
      lastname: "Petrovic",
      email: "ivan.petrovic@example.com",
      phone: "+381609876543",
      username: "ivanP",
    },
  },
  {
    id: 4,
    date: "2025-06-23",
    timeStart: "16:00",
    timeEnd: "17:30",
    duration: "1.5",
    description: "Kolokvijum 1",
    student: {
      firstname: "Ana",
      lastname: "Nikolic",
      email: "ana.nikolic@example.com",
      phone: "+381608765432",
      username: "anaN",
    },
  },
  {
    id: 5,
    date: "2025-06-24",
    timeStart: "08:00",
    timeEnd: "09:00",
    duration: "1",
    student: {
      firstname: "Petar",
      lastname: "Savic",
      email: "petar.savic@example.com",
      phone: "+381607654321",
      username: "petarS",
    },
  },
  {
    id: 6,
    date: "2025-06-20",
    timeStart: "14:30",
    timeEnd: "15:30",
    duration: "1",
    description: "Vezbanje integrala 1",
    student: {
      firstname: "Jelena",
      lastname: "Jovanovic",
      email: "jelena.jovanovic@example.com",
      phone: "+381601112233",
      username: "jelenaJ",
    },
  },
  {
    id: 7,
    date: "2025-06-20",
    timeStart: "11:00",
    timeEnd: "12:00",
    duration: "1",
    description: " ",
    student: {
      firstname: "Ivan",
      lastname: "Petrovic",
      email: "ivan.petrovic@example.com",
      phone: "+381609876543",
      username: "ivanP",
    },
  },
  {
    id: 8,
    date: "2025-06-20",
    timeStart: "16:00",
    timeEnd: "17:30",
    duration: "1.5",
    description: "Kolokvijum 1",
    student: {
      firstname: "Ana",
      lastname: "Nikolic",
      email: "ana.nikolic@example.com",
      phone: "+381608765432",
      username: "anaN",
    },
  },
];

export const calendarEvents = classes.map(
  ({ id, date, timeStart, timeEnd, description, student }) => ({
    id: id.toString(), // FullCalendar expects string IDs
    title: student.firstname + " " + student.lastname || "Čas", // Use description or default title
    start: `${date}T${timeStart}`, // Combine date and timeStart in ISO format
    end: `${date}T${timeEnd}`, // Combine date and timeEnd in ISO format
  })
);
