import {
  Dialog,
  Portal,
  Button,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogBackdrop,
  Text,
} from "@chakra-ui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDisclosure } from "@chakra-ui/react";
import { deleteClass } from "../api/class";

interface DeleteClassDialogButtonProps {
  classId: number;
  onStatusChange: () => void;
}

const DeleteClassDialogButton = ({
  classId,
  onStatusChange,
}: DeleteClassDialogButtonProps) => {
  const { open, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    try {
      await deleteClass(classId); // poziv tvoje API funkcije
      onStatusChange(); // ažuriranje statusa u tabeli
    } catch (error) {
      console.error("Greška pri brisanju časa:", error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <RiDeleteBin5Line
        size="30px"
        style={{ cursor: "pointer" }}
        onClick={onOpen}
      />

      <Dialog.Root
        open={open}
        onOpenChange={(open: boolean) => (open ? onOpen() : onClose())}
      >
        <Portal>
          <DialogBackdrop />
          <DialogPositioner zIndex={2000}>
            <DialogContent>
              <DialogHeader></DialogHeader>
              <DialogBody>
                <Text fontSize="20px">
                  Da li ste sigurni da želite da obrišete ovaj čas?
                </Text>
              </DialogBody>
              <DialogFooter display="flex" gap="1rem">
                <Button
                  variant="outline"
                  onClick={onClose}
                  borderColor="#877358"
                >
                  Otkaži
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleDelete}
                  backgroundColor="#877358"
                  color="white"
                >
                  Obriši
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogPositioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default DeleteClassDialogButton;
