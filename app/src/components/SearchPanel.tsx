import React, { ReactElement } from "react";
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
} from "@chakra-ui/react";
import { FilterIcon, SearchIcon } from "../assets/icons";

interface SearchPanelProps {
  children?: ReactElement;
}

export function SearchPanel(props: SearchPanelProps): ReactElement {
  return (
    <HStack spacing={2} px="4" py="2" bg="#111b21" {...props}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={
            <Box paddingBottom="2">
              <SearchIcon />
            </Box>
          }
        />
        <Input
          _placeholder={{
            opacity: 0.6,
            color: "#d1dae0",
            paddingLeft: "12px",
            fontSize: "13px",
            position: "relative",
            top: "50%",
            transform: "translateY(-80%)",
          }}
          h="30px"
          _hover={{ bg: "#202c33" }}
          bg="#202c33"
          variant="filled"
          placeholder="Search or start new chat"
        />
      </InputGroup>
      <Tooltip
        shouldWrapChildren
        label="Unread chats filter"
        bg="#0d161c"
        color="white"
        fontSize="xs"
      >
        <IconButton
          variant="ghost"
          color="#aebac1"
          aria-label={""}
          size="xs"
          position="relative"
          top="50%"
          transform="translateY(-5%)"
          paddingLeft="4px"
        >
          <FilterIcon />
        </IconButton>
      </Tooltip>
    </HStack>
  );
}
