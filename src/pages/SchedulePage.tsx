import { Box, Flex, Text } from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import { colors, texts } from "../constants";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import srLocale from '@fullcalendar/core/locales/sr'; // Serbian locale





const SchedulePageSection = () => {
  return (
    <Flex
      flex="1"
      bg={colors.cream}
      align={"center"}
      p={8}
      gap={8}
      width={'100%'}
      color={colors.darkBrown}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locales={[srLocale]} // Important: provide this too
        events={[
          { title: 'Moj događaj', date: '2025-04-15' },
        ]}
        locale={{
          ...srLocale,
          code: 'sr-latn',
          buttonText: {
            today: 'Danas',
            month: 'Mesec',
            week: 'Nedelja',
            day: 'Dan',
            list: 'Lista',
          },
          allDayText: 'Ceo dan',
          moreLinkText: n => `+ još ${n}`,
          noEventsText: 'Nema događaja za prikaz',
        }}
        height="auto"
        contentHeight="100%" // Makes the content fill vertical space
        aspectRatio={1.5}     // Wider calendar (default is 1.35)
        dayCellClassNames={() => 'fc-day-cell'}
        eventClassNames={() => 'fc-event-custom'}
        style={{ width: "100%", fontSize: "1rem", }} // Optional: increase font size 
        />
    </Flex>
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
