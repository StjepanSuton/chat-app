import { useEffect, useState } from "react";
import { useGetUser } from "src/services"; // Assuming you still want to use the `useGetUser` hook
import { useQueryClient } from "@tanstack/react-query";
import { useSocketContext } from "src/context/SocketContext";

export const useSeeUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { data: authUser, isLoading } = useGetUser();
  const queryClient = useQueryClient();
  const { socket } = useSocketContext();

  useEffect(() => {
    if (authUser && !isLoading) {
      console.log("subscribed", authUser);
      socket?.on("getOnlineUsers", (users: string[]) => {
        console.log({ users });
        setOnlineUsers(users);
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      });
      return () => {
        socket?.off("getOnlineUsers");
      };
    }
  }, [socket, authUser]);

  return { onlineUsers };
};
