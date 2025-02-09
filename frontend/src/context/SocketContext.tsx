import { useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useRef,
} from "react";
import io, { Socket } from "socket.io-client";
import { useGetUser } from "src/services";

interface ISocketContext {
  socket: Socket | null;
  onlineUsers: string[] | null;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocketContext = (): ISocketContext => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

const socketURL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = React.useState<string[]>([]);
  const queryClient = useQueryClient();
  const { data: authUser, isLoading } = useGetUser();
  useEffect(() => {
    if (authUser && !isLoading) {
      const socket = io(socketURL, {
        query: {
          userId: authUser.id,
        },
      });
      socketRef.current = socket;
      socket?.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      });
      socket?.on("newMessageNotification", () => {
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      });

      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (!authUser && !isLoading) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [authUser, isLoading]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
