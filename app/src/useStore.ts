import axios from 'axios';
import { create } from 'zustand';

interface ChatData {
  author: string;
  activeChatName: string;
  message: string;
  time: string;
  onClick: () => void;
}


interface StoreState {
  userName: string;
  chatData: ChatData[];
  activeChat: ChatData | null;
  setActiveChat: (selectedchatdata: ChatData) => void;
  setUserName: (userName: string) => void;
  updateChatData: (name: string) => void;
  fetchAndSetChatData: (userName: string) => void;
}

const useStore = create<StoreState>((set) => ({
  userName: '',
  chatData: [],
  activeChat: null,
  setActiveChat: (selectedchatdata) => set(() => ({activeChat: selectedchatdata})),
  setUserName: (name) => set(() => ({ userName: name.trim() })),
  updateChatData: async (name) => {
    try {
      const updatedData = {
        author: name,
        activeChatName: '',
        message: '',
        time: "",
      };
      const response = await axios.post("http://localhost:3000/api/saveChatData", updatedData);
      console.log('Chat data saved to server:', response.data);
      
    } catch (error) {
      console.error('Error saving chat data:', error);
    }
  },


  fetchAndSetChatData: async (userName) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/${userName}`);
      set(() => ({ chatData: response.data }));
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  },
}));

export default useStore;
