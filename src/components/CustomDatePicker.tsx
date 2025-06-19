import { Button, Input, InputGroup } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { srLatn } from "date-fns/locale";
import { format } from "date-fns";

interface CustomDatePickerProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <InputGroup
    endElement={
      <Button onClick={onClick} bg="transparent">
        <FaCalendarAlt color="#1E1E1E" />
      </Button>
    }
    autoFocus={false}
  >
    <Input
      value={value}
      readOnly
      placeholder="Izaberite datum"
      cursor="pointer"
      bg="#EFE4D7"
      color="#1E1E1E"
      border="1px solid"
      borderColor="#1E1E1E"
      fontWeight={"bold"}
    />
  </InputGroup>
));

interface CustomDatePickerProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const CustomDatePicker = ({
  selectedDate,
  setSelectedDate,
}: CustomDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(
    selectedDate ? new Date(selectedDate) : null
  );

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        if (date) {
          // Convert Date to "yyyy-MM-dd" string
          const formatted = format(date, "yyyy-MM-dd");
          setSelectedDate(formatted);
        }
      }}
      dateFormat="yyyy-MM-dd"
      placeholderText="Izaberite datum"
      customInput={<CustomInput />}
      locale={srLatn}
    />
  );
};

export default CustomDatePicker;
