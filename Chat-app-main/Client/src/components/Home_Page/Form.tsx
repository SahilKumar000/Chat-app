import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import socket from "../Socket_connection";
import Messages_Field from "./Messages_Field";

let currentdate = new Date();
let datetime =
  "Last Sync: " +
  currentdate.getDate() +
  "/" +
  (currentdate.getMonth() + 1) +
  "/" +
  currentdate.getFullYear() +
  " @ " +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds();

export interface MessageItem {
  id: string;
  message: string;
}

const Form = () => {
  const [message, setMessage] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [userMessages, setuserMessages] = useState<MessageItem[]>([]);
  const [clientId, setClientId] = useState("");

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const handleRoomChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRoom(e.target.value);

  useEffect(() => {
    socket.on("sending_to_client", (res: any) => {
      const { data, socket_id } = res;
      console.log(socket_id, " -> ", data);
      setClientId(socket_id);
      setuserMessages((prevMessages) => [
        ...prevMessages,
        { id: socket_id, message: data },
      ]);
    });

    return () => {
      socket.off("sending_to_client");
    };
  }, []);

  const joinRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit("join_room", room);
    toast("Joined Room " + room, {
      description: datetime,
    });
  };

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setuserMessages((prevMessages) => [
      ...prevMessages,
      { id: socket.id || "", message: message },
    ]);
    socket.emit("chat", message, room);
    setMessage("");
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(e as unknown as React.MouseEvent<HTMLButtonElement>);
  };

  return (
      <div className="basis-3/4 relative">
        <form onSubmit={handleFormSubmit}>
          <Messages_Field userMessages={userMessages} clientId={clientId} />
          <div className="flex gap-2 absolute bottom-0 left-0 right-0 p-2">
            <Input
              type="text"
              className="basis-1/4"
              placeholder="Room id"
              value={room}
              onChange={handleRoomChange}
            />
            <Button type="button" onClick={joinRoom}>
              Join
            </Button>
            <Input
              type="text"
              className="basis-3/4"
              placeholder="Type your message here"
              value={message}
              onChange={handleMessageChange}
            />
            <Button type="submit">Send</Button>
            <Toaster />
          </div>
        </form>
      </div>
  );
};

export default Form;
