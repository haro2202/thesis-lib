import { Thesis } from "@/types/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Input,
} from "@heroui/react";
import { useState } from "react";

interface AddThesisModelProps {
  isOpenAddModel: boolean;
  onOpenChangeAddModel: () => void;
  thesis?: Thesis;
  onAdd: (thesis: Thesis) => void;
}

export default function AddThesisModel({
  isOpenAddModel,
  onOpenChangeAddModel,
  thesis,
  onAdd,
}: AddThesisModelProps) {
  const [title, setTitle] = useState<string>();
  const [year, setYear] = useState<string>();

  return (
    <>
      <Modal
        isOpen={isOpenAddModel}
        placement="top-center"
        onOpenChange={onOpenChangeAddModel}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new thesis
              </ModalHeader>
              <ModalBody>
                <Textarea
                  label="Title"
                  placeholder="Enter new title"
                  variant="bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxRows={3}
                  minRows={1}
                />
                <Input
                  label="Year"
                  placeholder="Enter new year"
                  variant="bordered"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                {/*File uploader*/}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    onClose();
                    if (thesis) onAdd(thesis);
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
