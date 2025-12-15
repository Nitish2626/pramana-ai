import { BotMessageSquare, User } from "lucide-react";

interface ChatProps {
  isUser: boolean;
  message: string;
}

const ChatMessageContainer = (props: ChatProps) => {
  return (
    <div
      className={`flex items-start ${
        props.isUser ? "justify-end" : "justify-start"
      } gap-2`}
    >
      {props.isUser ? (
        <>
          <h3 className="max-w-8/12 rounded-lg px-2 py-2 shadow-lg">{props.message}</h3>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full shadow-lg bg-gray-200`}
          >
            {props.isUser ? (
              <User />
            ) : (
              <BotMessageSquare className="text-2xl shadow" />
            )}
          </div>
        </>
      ) : (
        <>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full shadow-lg bg-gray-200`}
          >
            {props.isUser ? (
              <User />
            ) : (
              <BotMessageSquare className="text-2xl shadow" />
            )}
          </div>
          <h3 className="max-w-8/12 rounded-lg px-2 py-2 shadow-lg">
            {props.message || ""}
          </h3>
        </>
      )}
    </div>
  );
};

export default ChatMessageContainer;
