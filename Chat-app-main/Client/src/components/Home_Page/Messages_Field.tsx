import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronLeft, ChevronRight } from "lucide-react";
import socket from "../Socket_connection";

interface ChildComponentProps {
  userMessages: any[];
  clientId: string;
}

const Messages_Field = ({ userMessages, clientId }: ChildComponentProps) => {
  return (
    <>
      {userMessages
        .filter((msg) => msg.message !== "")
        .map((msg, index) => (
          <>
            {clientId === msg.id ? (
              <>
                <Alert key={index} className="px-6">
                  <AlertTitle className="">{socket.id}</AlertTitle>
                  <AlertDescription className="mt-2 flex justify-start items-center">
                    <ChevronRight size={20} strokeWidth={3} className="" />
                    <p>{`${msg.message}`}</p>
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <>
                <Alert key={index} className="px-6 grid justify-items-end ">
                  <AlertTitle className="">{socket.id}</AlertTitle>
                  <AlertDescription className="mt-2 flex justify-start items-center">
                    <p>{`${msg.message}`}</p>
                    <ChevronLeft size={20} strokeWidth={3} className="" />
                  </AlertDescription>
                </Alert>
              </>
            )}
          </>
        ))}
    </>
  );
};

export default Messages_Field;
