import { Box, Flex, Text } from "@chakra-ui/react";
import bgImg from "../assets/bg-chat-lightC.png";
import { DeliveredIcon } from "../assets/icons";
import useStore from "../useStore";
import useMStore from "./../useMStore";

const Chat = () => {
  const { userName, activeChat } = useStore();
  const { messageList } = useMStore();

  return (
    <Flex
      direction="column"
      flex="1"
      overflowY="auto"
      p="4"
      bgImage={bgImg}
      backgroundRepeat="repeat"
    >
      {messageList.map((message, index) => {
        const isCurrentUser = message.author === userName;
        if (
          activeChat?.author === message.activeChatName ||
          activeChat?.author === message.author
        ) {
          return (
            <Flex
              key={index}
              justify={isCurrentUser ? "flex-end" : "flex-start"}
            >
              <Box
                className={`chat-bubble ${
                  isCurrentUser ? "sender" : "receiver"
                }`}
                bg={isCurrentUser ? "green.300" : "gray.200"}
                color="white"
                borderRadius="lg"
                p="2"
                mt="1"
                maxW="70%"
                position="relative"
              >
                <Text fontSize="sm" color="white">
                  {message.message}
                </Text>
                <Flex justifyContent="space-between" alignItems="center" mt="1">
                  <Text fontSize="10px" color="#aebac1" paddingRight={1}>
                    {message.time}
                  </Text>
                  {message.author !== activeChat?.author ? (
                    <DeliveredIcon color="#53bdeb" />
                  ) : null}
                </Flex>
              </Box>
            </Flex>
          );
        }
      })}
    </Flex>
  );
};

export default Chat;
