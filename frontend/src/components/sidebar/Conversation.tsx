import { ConversationType } from "src/types";
import { useGetUserProfile, useMarkConversationSeen } from "src/services";
import { useConversation } from "src/zustand";

export const Conversation = ({
  conversation,
  onlineUsers,
}: {
  conversation: ConversationType;
  onlineUsers: string[] | null;
}) => {
  const { data: userProfile } = useGetUserProfile();
  const { setSelectedConversation, selectedConversation } = useConversation();
  const isSelected = selectedConversation?.id === conversation.id;
  const isOnline = onlineUsers?.includes(conversation.id);
  const isSeen = userProfile?.unSeenConversationsIds.includes(conversation.id);
  const { mutateAsync: markConversationSeen } = useMarkConversationSeen();
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2
				 py-2 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => {
          setSelectedConversation(conversation);
          markConversationSeen({
            conversationId: conversation?.id,
          });
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          {isSeen && (
            <span className="min-w-2 min-h-2 rounded absolute top-0 left-0 z-50 bg-red-500"></span>
          )}
          <div className="w-8 md:w-12 relative rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 text-sm md:text-md">
              {conversation.fullName}
            </p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};
