import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import useMStore from "../useMStore";
import Chat from "./Chat";
import RHeader from "./RHeader";
import useStore from "../useStore";
import { EncryptedIcon, GeneralIcon } from "../assets/icons";

interface RightPanelProps {
  sendMessage: () => void;
}

export function RightPanel({ sendMessage }: RightPanelProps) {
  const { setCurrentMessage, currentMessage } = useMStore();
  const { activeChat } = useStore();
  if (!activeChat) {
    return (
      <Center
        bg="#222e35"
        borderBottom="6px solid #008069"
        position="relative"
        w="70%"
      >
        <Flex
          direction="column"
          textAlign="center"
          color="#41525d"
          align="center"
        >
          <GeneralIcon />
          <Box pt="8">
            <Heading fontWeight="light" color="#d1d6d8">
              Whatsapp Web
            </Heading>
            <Text fontSize="sm" mt="4" color="#8696a0">
              Send and receive messages without keeping your phone online.{" "}
              <br /> Use WhatsApp on up to 4 linked devices and 1 phone at the
              same time.
            </Text>
          </Box>
          <AbsoluteCenter axis="horizontal" bottom="7" flex="1" mt="10">
            <HStack justifyItems="baseline" color="#667777">
              <EncryptedIcon />
              <Text fontSize="sm" fontWeight="medium">
                End-to-end encrypted
              </Text>
            </HStack>
          </AbsoluteCenter>
        </Flex>
      </Center>
    );
  } else {
    return (
      <Flex direction="column" w="70%">
        <RHeader />
        <Chat />
        <Flex align="center" p="4">
          <Input
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            placeholder="Type a message..."
          />
          <Button ml="2" colorScheme="teal" onClick={sendMessage}>
            Send
          </Button>
        </Flex>
      </Flex>
    );
  }
}
