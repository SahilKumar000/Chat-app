import { useEffect, useState } from "react";
import socket from "../Socket_connection";
import { Button } from "../ui/button";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

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

const Groups = () => {
  const [groups, setGroups] = useState<Set<string>>(new Set(["Global"]));
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  
  useEffect(() => {
    socket.on("Updating_client_group", (room: string) => {
      setGroups((prevGroups) => new Set([...prevGroups, room]));
    });

    return () => {
      socket.off("Updating_client_group");
    };
  }, []);

  const joinSpecificRoom = (room: string) => {
    if (currentRoom === "Global") {
      leaveRoom(currentRoom);
      joinRoom("");
      setCurrentRoom("");
    } else if (currentRoom !== room) {
      if (currentRoom) {
        leaveRoom(currentRoom);
      }
      joinRoom(room);
      setCurrentRoom(room);
    }
    toast("Joined Room " + room, {
      description: datetime,
    });
  };

  const joinRoom = (room: string) => {
    console.log(`Joining room: ${room}`);
    socket.emit("join_room", room);
  };

  const leaveRoom = (room: string) => {
    console.log(`Leaving room: ${room}`);
    socket.emit("leave", room);
  };

  return (
    <div className="basis-1/4 border-r border-#1E293B p-4">
      <div className="mx-auto text-center ">Groups</div>
      <br />
      {[...groups].map((grp, index) => (
        <Button
          key={index}
          className="w-full mb-4"
          variant={currentRoom === grp ? "default" : "outline"}
          onClick={() => joinSpecificRoom(grp)}
        >
          {grp}
        </Button>
      ))}
      <Toaster />
    </div>
  );
};

export default Groups;
