"use client";

import ChatMessageContainer from "@/components/custom/ChatMessageContainer";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/lib/toast";
import { ChatSchema, schema } from "@/types/ChatSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CornerRightUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { F_LOGIN } from "../../../../../routes/appRoutes";

const ChatPage = () => {
  const router = useRouter();
  const params = useParams();
  console.log("params", params.id);

  const { reset, handleSubmit, control } = useForm<ChatSchema>({
    resolver: zodResolver(schema),
  });

  const [disabled, setDisabled] = useState(true);
  const [chats, setChats] = useState<ChatSchema[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const [conversationId, setConversationId] = useState<string | null>(
    params.id as string
  );

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats]);

  const fetchChats = async (convId: string) => {
    console.log("convId", convId);
    const chatResponse = await axios.get(`/api/get-chat/${convId}`);
    console.log("fc", chatResponse);
  };

  useEffect(() => {
    console.log("conversation id", conversationId);
    fetchChats(conversationId as string);
  }, []);

  const sendChats = async (d: ChatSchema) => {
    const id = crypto.randomUUID();
    console.log("data", d);

    setChats((prev) => [
      ...prev,
      { id: id, prompt: d.prompt, response: "Thinking..." },
    ]);

    reset({ prompt: "" });

    try {
      const response = await axios.post("/api/get-chat", { prompt: d.prompt });
      console.log("res", response);
      if (response.data.status === 500) {
        showToast("error", response.data.message);
        return;
      }

      setChats((prev) => prev.filter((d) => d.id !== id));
      setChats((prev) => [
        ...prev,
        { id: id, prompt: d.prompt, response: response.data.data },
      ]);

      let chatsData = JSON.parse(localStorage.getItem("chatsData") as string);
      chatsData = [
        ...chatsData,
        { id: id, prompt: d.prompt, response: response.data.data },
      ];
      localStorage.setItem("chatsData", JSON.stringify(chatsData));

      let data = {
        conversationId: conversationId,
        id: id,
        prompt: d.prompt,
        response: response.data.data,
      };
      const chatResponse = await axios.post("/api/add-chat", data);
      console.log("cr", chatResponse);

      if (chatResponse.data.status === 401) {
        router.push(F_LOGIN);
      }

      if (chatResponse.data.status === 500) {
        showToast("error", response.data.message);
        return;
      }

      setConversationId(chatResponse.data.data);
    } catch (error) {
      console.log("F_HOME_PAGE ERROR", error);
      showToast("error", "Something went wrong!");
    }
  };

  // useEffect(() => {
  //   const storedChats = JSON.parse(localStorage.getItem("chatsData") as string);
  //   console.log("sc", storedChats);
  //   setChats(storedChats);
  // }, []);

  // console.log("chats", chats);

  return (
    <div className="flex flex-col items-center justify-between gap-10 pb-10 rounded-lg shadow-2xl">
      <div
        className="w-full flex items-center justify-center py-4"
        ref={chatRef}
      >
        <div className="w-11/12 min-h-screen overflow-auto flex flex-col gap-6 py-4">
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
            <div className="w-full flex items-center justify-center text-2xl font-bold">
              How I Can Help You Today ?
            </div>
          )}
        </div>
      </div>

      <div className="w-full sticky bottom-0 bg-background flex items-end justify-center py-4">
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

export default ChatPage;
