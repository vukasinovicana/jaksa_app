import {
  Box,
  Flex,
  HStack,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import NavBar from "../components/Navbar";
import { colors, texts } from "../constants";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import srLocale from "@fullcalendar/core/locales/sr"; // Serbian locale
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import DialogWindow from "../components/DialogWindow";
import "./css/SchedulePage.css";
import DialogWindowClass from "../components/DialogWindowClass";
import { Class } from "../types/Class";
import { fetchAllClasses } from "../api/class";
import { calculateEndTime } from "../components/RequestsSection";
import { User } from "../types/User";
import { fetchUser } from "../api/user";

const SchedulePageSection = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const {
    open: isDateOpen,
    onOpen: onDateOpen,
    onClose: onDateClose,
  } = useDisclosure();
  const {
    open: isClassOpen,
    onOpen: onClassOpen,
    onClose: onClassClose,
  } = useDisclosure();

  const [selectedDate, setSelectedDate] = useState("");
  const [checked, setChecked] = useState(true); //for switch component
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]); // FullCalendar EventInput[]

  // Fetch classes on mount
  React.useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data_user = await fetchUser();
        const classes = await fetchAllClasses();
        // keep only approved ones
        const approvedClasses = classes.filter(
          (cls) => cls.classStatus === "APPROVED"
        );

        setClasses(approvedClasses);

        const events = approvedClasses.map(
          ({
            id,
            date,
            timeStart,
            duration,
            studentFirstName,
            studentLastName,
            studentId,
          }) => ({
            id: id.toString(),
            title: studentFirstName + " " + studentLastName || "Čas",
            start: `${date}T${timeStart}`,
            end: `${date}T${calculateEndTime(timeStart, duration)}`,
            className:
              Number(studentId) === Number(data_user?.id)
                ? "fc-event-user"
                : "fc-event-custom",
          })
        );
        setCalendarEvents(events);
        if (approvedClasses.length > 0) {
          setSelectedClass(approvedClasses[0]);
        }
      } catch (error) {
        console.error("Došlo je do greške.", error);
      }
    };

    fetchClasses();
  }, []);

  // Whenever checked changes, change the calendar view programmatically
  React.useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(checked ? "dayGridMonth" : "timeGridWeek");
    }
  }, [checked]);

  const handleEventClick = (arg: any) => {
    const classId = parseInt(arg.event.id);
    const originalClass = classes.find((c) => c.id === Number(classId));

    if (originalClass) {
      setSelectedClass(originalClass); // this is now of type Class
      onClassOpen();
    }
  };

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr); // ISO format like "2025-04-21"
    onDateOpen();
  };

  // Call updateSize after month change
  const handleDatesSet = () => {
    setTimeout(() => {
      calendarRef.current?.getApi().updateSize();
    }, 25); // small delay ensures DOM is updated
  };

  return (
    <>
      <Flex
        flex="1"
        bg={colors.cream}
        align={"center"}
        p={8}
        gap={8}
        width={"100%"}
        color={colors.darkBrown}
        direction={"column"}
      >
        <HStack>
          <Text fontWeight={checked ? "normal" : "bold"} color={"#1E1E1E"}>
            Nedelja
          </Text>
          <Switch.Root
            checked={checked}
            onCheckedChange={() => {
              setChecked(!checked);
            }}
          >
            <Switch.HiddenInput />
            <Switch.Control bg={checked ? "#1E1E1E" : "#877358"} />
          </Switch.Root>
          <Text fontWeight={checked ? "bold" : "normal"} color={"#1E1E1E"}>
            Mesec
          </Text>
        </HStack>
        <Box w="100%" overflowX="hidden" className="calendar-wrapper">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locales={[srLocale]}
            events={calendarEvents}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // Set to false for 24-hour format
            }}
            displayEventEnd={true}
            locale={{
              ...srLocale,
              code: "sr-latn",
              buttonText: {
                today: "Danas",
                month: "Mesec",
                week: "Nedelja",
                day: "Dan",
                list: "Lista",
              },
              allDayText: "Ceo dan",
              moreLinkText: (n) => `+ još ${n}`,
              noEventsText: "Nema događaja za prikaz",
            }}
            height="auto"
            contentHeight="100%" // Makes the content fill vertical space
            aspectRatio={1.5} // Wider calendar (default is 1.35)
            eventClassNames={() => "fc-event-custom"}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            datesSet={handleDatesSet} // triggers on navigation/view change
          />
        </Box>
      </Flex>

      <DialogWindow
        open={isDateOpen}
        onOpen={onDateOpen}
        onClose={onDateClose}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        classes={classes}
      />

      {selectedClass && (
        <DialogWindowClass
          open={isClassOpen}
          onOpen={onClassOpen}
          onClose={onClassClose}
          selectedClass={selectedClass}
          onStatusChange={() => {
            setClasses((prev) =>
              prev?.filter((r) => r.id !== selectedClass.id)
            );
            setCalendarEvents((prevEvents) =>
              prevEvents.filter(
                (event) => event.id !== selectedClass.id.toString()
              )
            );
          }}
        />
      )}
    </>
  );
};

function SchedulePage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
      <NavBar />
      <SchedulePageSection />
    </Box>
  );
}

export default SchedulePage;
