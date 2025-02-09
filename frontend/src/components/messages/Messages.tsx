import { useChatScroll, useGetMessages, useSubscribeToChat } from "src/hooks";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { Message } from "./Message";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;
  useSubscribeToChat();
  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading &&
        messages &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      {!loading && messages && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
