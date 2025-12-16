"use client";

import ChatMessageContainer from "@/components/custom/ChatMessageContainer";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CornerRightUp } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { ChatSchema, schema } from "../../types/ChatSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const HomePage = () => {
  const { reset, handleSubmit, control } = useForm<ChatSchema>({
    resolver: zodResolver(schema),
  });

  const [disabled, setDisabled] = useState(true);
  const [chats, setChats] = useState<ChatSchema[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats]);

  const sendChats = async (d: ChatSchema) => {
    const id = crypto.randomUUID();
    console.log("data", d);
    setChats((prev) => [
      ...prev,
      { id: id, prompt: d.prompt, response: "Thinking..." },
    ]);
    reset({ prompt: "" });

    const response = await axios.post("/api/chat", { prompt: d.prompt });
    console.log("res", response);
    if (response.data.status === 500) {
      alert(response.data.message);
      return;
    }

    setChats((prev) => prev.filter((d) => d.id !== id));
    setChats((prev) => [
      ...prev,
      { id: id, prompt: d.prompt, response: response.data.data },
    ]);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-10 pb-10 rounded-lg shadow-2xl">
      <div className="w-full h-fit flex items-center justify-center py-4">
        <div
          className="w-11/12 h-96 overflow-auto flex flex-col gap-6 py-4"
          ref={chatRef}
        >
          {chats?.length > 0 ? (
            chats?.map((d, i) => (
              <div className="flex flex-col gap-6" key={i}>
                <ChatMessageContainer message={d.prompt} isUser={true} />
                <ChatMessageContainer
                  message={d.response === undefined ? "" : d.response}
                  isUser={false}
                />
              </div>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
              How I Can Help You Today ?
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex items-end justify-center py-4">
        <form
          onSubmit={handleSubmit(sendChats)}
          className="w-11/12 flex items-center justify-between gap-4 rounded-2xl"
        >
          <Controller
            name="prompt"
            control={control}
            render={({ field }) => (
              <Textarea
                className="min-h-20 max-h-40"
                placeholder="Ask me anything..."
                draggable={false}
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (!e.target.value.trim()) {
                    setDisabled(true);
                  } else {
                    setDisabled(false);
                  }
                }}
              />
            )}
          />

          <button
            type="submit"
            className={`bg-accent rounded-full p-2 text-white hover:bg-black ${
              disabled
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            disabled={disabled}
            title="Send"
          >
            <CornerRightUp size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
