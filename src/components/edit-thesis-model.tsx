import { Thesis } from "@/pages";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { useEffect, useState } from "react";

interface EditThesisModelProps {
  isOpenEditModel: boolean;
  onOpenChangeEditModel: () => void;
  thesis?: Thesis;
  onSave: (thesis: Thesis) => void;
}

export default function EditThesisModel({
  isOpenEditModel,
  onOpenChangeEditModel,
  thesis,
  onSave,
}: EditThesisModelProps) {
  const [title, setTitle] = useState<string>(thesis?.title || "");
  const [year, setYear] = useState<string>(thesis?.year + "" || "2025");

  useEffect(() => {
    setTitle(thesis?.title || "");
    setYear(thesis?.year + "" || "2025");
  }, [thesis]);

  return (
    <>
      <Modal
        isOpen={isOpenEditModel}
        placement="top-center"
        onOpenChange={onOpenChangeEditModel}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit #{thesis?.key}
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    if (thesis)
                      onSave({
                        ...thesis,
                        title: title,
                        year: parseInt(year),
                      });
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
