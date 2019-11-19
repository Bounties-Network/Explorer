/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from ".";
import { Button, Text, Flex } from "rebass";
import { useDisclosure } from "@chakra-ui/core";

addDecorator(centered);

storiesOf("Modal", module).add("Mi Fora", () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex>
      <Button variant="primary" onClick={onOpen}>
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>This is the title of a Modal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text variant={"body"} color="gray.500" fontFamily="secondary">
              This is some paragraph text for a modal. It may have a mesage that
              we want to display to the user
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" mr={3} onClick={onClose}>
              Explore
            </Button>
            <Button variant="primary">Accept</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
});
