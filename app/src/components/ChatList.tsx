import {
  Avatar,
  Box,
  Flex,
  HStack,
  Stack,
  StackDivider,
  Text,
  chakra,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useStore from "../useStore";

interface ChatProps {
  author: string;
  activeChatName: string;
  message: string;
  time: string;
  onClick: () => void;
}

export const ChatCard: React.FC<ChatProps> = ({
  author,
  activeChatName,
  message,
  time,
  onClick,
  ...rest
}) => {
  return (
    <HStack
      _hover={{
        cursor: "pointer",
        backgroundColor: "#2e3f49",
      }}
      bg="#111b21"
      py="3"
      onClick={onClick}
      {...rest}
    >
      <Avatar mx="3" name={author} src={""} />
      <Box flex="1" pr="4">
        <Flex justify="space-between" align="baseline">
          <Box>
            <Text fontWeight="medium">{author}</Text>
            <HStack>
              <Text color="#667781" fontSize="sm">
                {message}
              </Text>
            </HStack>
          </Box>
          <chakra.time fontSize="xs" color="#667781">
            {time}
          </chakra.time>
        </Flex>
      </Box>
    </HStack>
  );
};

export const ChatList = () => {
  const { userName, fetchAndSetChatData, chatData, setActiveChat } = useStore();
  useEffect(() => {
    fetchAndSetChatData(userName);
  }, [userName, chatData]);

  const handleChatDataUpdate = async () => {
    fetchAndSetChatData(userName);
  };
  const handleChatClick = (chat: ChatProps) => {
    setActiveChat(chat);
  };

  return (
    <Stack
      spacing="0"
      divider={<StackDivider w="82%" alignSelf="flex-end" />}
      flex="1"
      overflowY="auto"
      className="ChatList"
    >
      {chatData.map((item, index) => (
        <ChatCard
          key={index}
          time={item.time}
          message={item.message}
          author={item.author}
          activeChatName=""
          onClick={() => {
            handleChatClick(item);
            handleChatDataUpdate();
          }}
        />
      ))}
    </Stack>
  );
};
