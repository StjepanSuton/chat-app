import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { io } from "socket.io-client";
import { useGetUser } from "src/services";

const socketURL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useSubscribeToNotifications = () => {
  const queryClient = useQueryClient();
  const { data: authUser } = useGetUser();
  const [isSubscribbed, setIsSubscribbed] = React.useState(false);
  React.useEffect(() => {
    if (authUser && !isSubscribbed) {
      const socket = io(socketURL, {
        query: {
          userId: authUser.id,
        },
      });
      socket.on("newMessageNotification", () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      });
      setIsSubscribbed(true);
    }
  }, [authUser]);
};
