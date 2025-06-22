import { Button, Input, InputGroup } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { srLatn } from "date-fns/locale";
import { format } from "date-fns";

interface CustomDatePickerProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  disabled: boolean;
}

const CustomInput = forwardRef(
  ({ value, onClick, disabled }: any, ref: any) => (
    <InputGroup
      endElement={
        <Button onClick={onClick} bg="transparent" disabled={disabled}>
          <FaCalendarAlt color="#1E1E1E" />
        </Button>
      }
      autoFocus={false}
    >
      <Input
        value={value}
        readOnly
        placeholder="Izaberite datum"
        cursor={disabled ? "not-allowed" : "pointer"}
        bg="#EFE4D7"
        color="#1E1E1E"
        border="1px solid"
        borderColor="#1E1E1E"
        fontWeight={"bold"}
        disabled={disabled}
      />
    </InputGroup>
  )
);

const CustomDatePicker = ({
  selectedDate,
  setSelectedDate,
  disabled,
}: CustomDatePickerProps) => {
  return (
    <DatePicker
      selected={selectedDate ? new Date(selectedDate) : null}
      onChange={(date) => {
        if (date) {
          const formatted = format(date, "yyyy-MM-dd");
          setSelectedDate(formatted);
        }
      }}
      dateFormat="yyyy-MM-dd"
      placeholderText="Izaberite datum"
      customInput={<CustomInput disabled={disabled} />}
      locale={srLatn}
      disabled={disabled}
    />
  );
};

export default CustomDatePicker;
