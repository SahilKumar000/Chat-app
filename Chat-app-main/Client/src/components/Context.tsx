import { Dispatch, SetStateAction, createContext } from "react";
import { MessageItem } from "./Home_Page/Form";

interface MessageContextType {
  userMessages: MessageItem[];
  setuserMessages: Dispatch<SetStateAction<MessageItem[]>>;
}

export const userMessagesContext = createContext<MessageContextType | null>(null);
