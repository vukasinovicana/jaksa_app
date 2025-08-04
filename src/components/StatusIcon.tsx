import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { Box } from "@chakra-ui/react";

interface StatusIconProps {
  status: string;
}

const StatusIcon = ({ status }: StatusIconProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      {status == "APPROVED" && (
        <IoIosCheckmarkCircle color="green" size="32px" />
      )}
      {status == "REJECTED" && <IoIosCloseCircle color="red" size="32px" />}
      {status == "PENDING" && <FaRegClock size="28px" />}
    </Box>
  );
};

export default StatusIcon;
