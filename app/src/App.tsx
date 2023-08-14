import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { LeftPanel } from "./components/LeftPanel";
import NameDialog from "./components/NameDialog";
import { RightPanel } from "./components/RightPanel";
import useMStore from "./useMStore";
import useStore from "./useStore";

const socket = io("http://localhost:3000");

interface Message {
  author: string;
  activeChatName: string | undefined;
  message: string;
  time: string;
  delivered: boolean;
}

const App = () => {
  const { userName, setUserName, updateChatData, activeChat } = useStore();

  const [isNameDialogOpen, setIsNameDialogOpen] = useState(true);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    updateChatData(name);
    setIsNameDialogOpen(false);
  };

  const { currentMessage, setCurrentMessage, addMessage } = useMStore();

  useEffect(() => {
    if (userName !== "") {
      socket.emit("join", userName);
    }
    socket.on("receive_message", (data: Message) => {
      addMessage(data);
    });
  }, [userName]);

  function format_date(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData: Message = {
        author: userName,
        activeChatName: activeChat?.author,
        message: currentMessage,
        time: format_date(new Date()),
        delivered: activeChat?.author === userName,
      };

      await socket.emit("send_message", messageData);
      addMessage(messageData);
      setCurrentMessage("");
    }
  };

  return (
    <>
      {userName ? (
        <>
          <Flex h="100vh">
            <LeftPanel />
            <RightPanel sendMessage={sendMessage} />
          </Flex>
        </>
      ) : (
        <div className="app-background">
          <NameDialog
            isOpen={isNameDialogOpen}
            onClose={() => setIsNameDialogOpen(false)}
            onNameSubmit={handleNameSubmit}
          />
        </div>
      )}
    </>
  );
};

export default App;
