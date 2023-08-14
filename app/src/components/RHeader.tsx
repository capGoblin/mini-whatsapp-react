import { Avatar, Flex, HStack } from "@chakra-ui/react";
import { SearchIcon, MenuIcon } from "../assets/icons";
import { CustomTooltip } from "./Header";
import useStore from "../useStore";

const iconDatay = [
  { icon: <SearchIcon />, label: "Search" },
  { icon: <MenuIcon />, label: "Menu" },
];

const RHeader = () => {
  const { activeChat } = useStore();

  return (
    <Flex bg="#202c33" py="2" px="4" justifyContent={"space-between"}>
      <Avatar boxSize="38px" name={activeChat?.author} src={""} />
      <h1>{activeChat?.activeChatName}</h1>
      <HStack spacing="5">
        {iconDatay.map((item, index) => (
          <CustomTooltip key={index} label={item.label} icon={item.icon} />
        ))}
      </HStack>
    </Flex>
  );
};

export default RHeader;
