import {create} from 'zustand';



interface Message {
  author: string;
  activeChatName: string | undefined;
  message: string;
  time: string;
  delivered: boolean;
}

interface MessageStoreState {
  currentMessage: string;
  messageList: Message[];
}

interface MessageStoreActions extends MessageStoreState {
  setCurrentMessage: (currentMessage: string) => void;
  addMessage: (message: Message) => void;
}

const useMStore = create<MessageStoreActions>((set) => ({
  currentMessage: '',
  messageList: [],
  setCurrentMessage: (currentMessage) => set({ currentMessage }),
  addMessage: (message) => set((state) => { 
    const exsistingMessageIndex = state.messageList.findIndex(
      (m) =>
        m.author === message.author &&
        m.activeChatName === message.activeChatName &&
        m.message === message.message &&
        m.time === message.time
    );
  
    if (exsistingMessageIndex !== -1) {
      return state;
    } else {
      return { ...state, messageList: [...state.messageList, message] };
    }
  })
}));

export default useMStore;
