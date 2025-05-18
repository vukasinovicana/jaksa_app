import {
  Box,
  Button,
  Dialog,
  Flex,
  Portal,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import { colors, texts } from "../constants";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import srLocale from "@fullcalendar/core/locales/sr"; // Serbian locale
import { useState } from "react";

const SchedulePageSection = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr); // ISO format like "2025-04-21"
    onOpen();
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
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locales={[srLocale]} // Important: provide this too
          events={[{ title: "Moj događaj", date: "2025-04-15" }]}
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
          dayCellClassNames={() => "fc-day-cell"}
          eventClassNames={() => "fc-event-custom"}
          dateClick={handleDateClick}
        />
      </Flex>

      <Dialog.Root
        key={"center"}
        placement={"center"}
        motionPreset="slide-in-bottom"
        isOpen={open}
        onClose={onClose}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Dialog Title</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
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
