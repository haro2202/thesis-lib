import { Thesis } from "@/pages";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface DeleteThesisModelProps {
  isOpenDeleteModel: boolean;
  onOpenChangeDeleteModel: () => void;
  thesis?: Thesis;
  onDelete: (thesis: Thesis) => void;
}

export default function DeleteThesisModel({
  isOpenDeleteModel,
  onOpenChangeDeleteModel,
  thesis,
  onDelete,
}: DeleteThesisModelProps) {
  return (
    <>
      <Modal
        isOpen={isOpenDeleteModel}
        placement="top-center"
        onOpenChange={onOpenChangeDeleteModel}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to delete this thesis?
              </ModalHeader>
              <ModalBody>{thesis?.title}</ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    onClose();
                    if (thesis) onDelete(thesis);
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
