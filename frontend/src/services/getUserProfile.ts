import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserProfileType } from "src/types";

export const getUserProfile = async (): Promise<UserProfileType> => {
  try {
    const { data } = await axios.get("/api/auth/profile");
    return data;
  } catch (error: any) {
    console.error("Error fetching auth user:", error);
    throw error.response?.data?.error || "Failed to fetch user";
  }
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => await getUserProfile(),
    retry: false,
  });
};

export const useMarkConversationSeen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: { conversationId?: string }) => {
      const { conversationId } = ids;
      await axios.patch("/api/messages/mark-seen", {
        conversationId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};
