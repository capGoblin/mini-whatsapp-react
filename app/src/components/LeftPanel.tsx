import { Box, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { ChatList } from "./ChatList";
import { Header } from "./Header";
import { SearchPanel } from "./SearchPanel";

export function LeftPanel(): ReactElement {
  return (
    <Flex direction="column" w="30%">
      <Box>
        <Header />
        <SearchPanel />
      </Box>
      <ChatList />
    </Flex>
  );
}
