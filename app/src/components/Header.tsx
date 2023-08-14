import { Avatar, Flex, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import {
  CommunityIcon,
  MenuIcon,
  NewChatIcon,
  StatusIcon,
} from "../assets/icons";

interface IconData {
  icon: JSX.Element;
  label: string;
}

const iconData = [
  { icon: <CommunityIcon />, label: "Community chat" },
  { icon: <StatusIcon />, label: "Status" },
  { icon: <NewChatIcon />, label: "New Chat" },
  { icon: <MenuIcon />, label: "Menu" },
];

export function CustomTooltip({ label, icon, ...rest }: IconData) {
  return (
    <Tooltip
      shouldWrapChildren
      label={label}
      bg="#0d161c"
      color="white"
      fontSize="xs"
      {...rest}
    >
      <IconButton variant="ghost" color="#aebac1" aria-label={""} size="xs">
        {icon}
      </IconButton>
    </Tooltip>
  );
}

interface HeaderProps {
  // Add any props that the Header component might receive
}

export function Header(props: HeaderProps) {
  return (
    <Flex
      bg="#202c33"
      justify="space-between"
      py="2"
      px="4"
      color="#54656f"
      {...props}
    >
      <Avatar boxSize="38px" name="" src="" />
      <HStack spacing="5">
        {iconData.map((item, index) => (
          <CustomTooltip key={index} label={item.label} icon={item.icon} />
        ))}
      </HStack>
    </Flex>
  );
}
