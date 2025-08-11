import { Box, Button, Flex, Table, Text } from "@chakra-ui/react";
import { IoIosCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
import "./css/RequestsSection.css";
import { User } from "../types/User";
import { useEffect, useState } from "react";
import { Class } from "../types/Class";
import {
  acceptRequest,
  deleteClass,
  fetchAllClasses,
  fetchAllClassesForStudent,
  rejectRequest,
} from "../api/class";
import { RiDeleteBin5Line } from "react-icons/ri";
import StatusIcon from "./StatusIcon";
import DeleteClassDialogButton from "./DeleteClassDialogButton";
import React from "react";

interface RequestsSectionProps {
  user?: User;
  status?: string;
}

export function calculateEndTime(startTime: string, durationStr: string) {
  const [startHours, startMinutes, startSeconds] = startTime
    .split(":")
    .map(Number);
  const startDate = new Date();
  startDate.setHours(startHours, startMinutes, startSeconds);

  const durationInHours = parseFloat(durationStr.replace("h", ""));
  const durationInMinutes = durationInHours * 60;

  startDate.setMinutes(startDate.getMinutes() + durationInMinutes);

  const endHours = startDate.getHours().toString().padStart(2, "0");
  const endMinutes = startDate.getMinutes().toString().padStart(2, "0");

  return `${endHours}:${endMinutes}`;
}

const RequestsSection = ({ user, status }: RequestsSectionProps) => {
  const [requests, setRequests] = useState<Class[]>();
  const is_student = user?.role == "STUDENT";

  const handleDeleteClass = async (classId: number) => {
    try {
      const result = await deleteClass(classId);
      console.log("Class deleted:", result);
    } catch (error) {
      console.error("Greška pri brisanju časa", error);
    }
  };

  useEffect(() => {
    const loadRequests = async () => {
      try {
        let data: Class[] = [];

        if (is_student) {
          data = await fetchAllClassesForStudent(user?.id ?? 0);
        } else {
          data = await fetchAllClasses();
        }

        let filtered: Class[] = [];

        if (status !== undefined) {
          // Poslati zahtevi
          filtered = data.filter((req) =>
            is_student
              ? req.classStatus === status && req.requestedByStudent
              : req.classStatus === status && !req.requestedByStudent
          );
        } else {
          // Primljeni zahtevi
          filtered = data.filter((req) =>
            is_student ? !req.requestedByStudent : req.requestedByStudent
          );
        }

        setRequests(filtered);
      } catch (error) {
        console.error("Došlo je do greške:", error);
      }
    };

    loadRequests();
  }, []);

  return (
    <Flex className="requests-section">
      <Table.Root
        size="lg"
        width="100%"
        minWidth="1100px"
        className="requests-table"
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>Student</Table.ColumnHeader>
            <Table.ColumnHeader>Datum</Table.ColumnHeader>
            <Table.ColumnHeader>Vreme</Table.ColumnHeader>
            <Table.ColumnHeader style={{ width: "30%" }}>
              Opis
            </Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {requests?.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={6}>
                <Text fontWeight="bold" textAlign="center" py={4}>
                  Nema zakazanih časova.
                </Text>
              </Table.Cell>
            </Table.Row>
          )}

          {requests?.map((req, i) => {
            const timeStart = req.timeStart.split(":").slice(0, 2).join(":");
            const timeEnd = calculateEndTime(req.timeStart, req.duration);

            function acceptClass(id: number) {
              throw new Error("Function not implemented.");
            }

            return (
              <React.Fragment key={req.id}>
                <Table.Row key={i}>
                  <Table.Cell>{i + 1}.</Table.Cell>
                  <Table.Cell fontWeight="bold">
                    {req.studentFirstName} {req.studentLastName}
                  </Table.Cell>
                  <Table.Cell>{req.date}</Table.Cell>
                  <Table.Cell>
                    {timeStart}–{timeEnd}
                  </Table.Cell>
                  <Table.Cell>{req.description}</Table.Cell>
                  <Table.Cell>
                    <StatusIcon status={req.classStatus} />
                  </Table.Cell>
                  <Table.Cell>
                    {req.classStatus != "REJECTED" && (
                      <DeleteClassDialogButton
                        classId={req.id}
                        onStatusChange={() => {
                          setRequests((prev) =>
                            prev?.filter((r) => r.id !== req.id)
                          );
                        }}
                      />
                    )}
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="row_with_border">
                  <Table.Cell colSpan={7}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      {is_student !== req.requestedByStudent &&
                        req.classStatus == "PENDING" && (
                          <Button
                            className="action-button"
                            onClick={async () => {
                              try {
                                await acceptRequest(req.id);
                                setRequests((prev) =>
                                  prev?.map((r) =>
                                    r.id === req.id
                                      ? { ...r, classStatus: "APPROVED" }
                                      : r
                                  )
                                );
                              } catch (err) {
                                console.error(
                                  "Greška prilikom prihvatanja časa:",
                                  err
                                );
                              }
                            }}
                          >
                            <IoIosCheckmarkCircle color="green" /> Prihvati
                          </Button>
                        )}
                      {is_student !== req.requestedByStudent &&
                        req.classStatus == "PENDING" && (
                          <Button
                            className="action-button"
                            onClick={async () => {
                              try {
                                await rejectRequest(req.id);
                                setRequests((prev) =>
                                  prev?.map((r) =>
                                    r.id === req.id
                                      ? { ...r, classStatus: "REJECTED" }
                                      : r
                                  )
                                );
                              } catch (err) {
                                console.error(
                                  "Greška prilikom brisanja časa:",
                                  err
                                );
                              }
                            }}
                          >
                            <IoIosCloseCircle color="red" /> Odbij
                          </Button>
                        )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default RequestsSection;
