import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  Input,
} from "@chakra-ui/react";
import useStore from "../useStore";

interface NameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNameSubmit: (name: string) => void;
}

const NameModal: React.FC<NameModalProps> = ({
  isOpen,
  onClose,
  onNameSubmit,
}) => {
  const [name, setName] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    if (name.trim() !== "") {
      onNameSubmit(name);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </ModalContent>
    </Modal>
  );
};

export default NameModal;
