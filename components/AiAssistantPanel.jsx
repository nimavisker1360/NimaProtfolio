import { useEffect, useRef, useState } from "react";

const initialMessages = [
  {
    role: "assistant",
    content:
      "Hello. I am the AI assistant for this website. Ask anything about services, skills, portfolio work, or experience.",
  },
];

const AiAssistantPanel = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messagesContainerRef = useRef(null);
  const hasAutoScrolled = useRef(false);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: hasAutoScrolled.current ? "smooth" : "auto",
    });

    hasAutoScrolled.current = true;
  }, [messages, isLoading]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const question = input.trim();

    if (!question || isLoading) {
      return;
    }

    const nextUserMessage = { role: "user", content: question };
    const history = [...messages];
    setMessages((prev) => [...prev, nextUserMessage]);
    setInput("");
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          messages: history,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to get a response.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer || "No response received." },
      ]);
    } catch (error) {
      const fallbackText =
        "The assistant is currently unavailable. Please try again in a moment.";
      setErrorMessage(error.message || fallbackText);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fallbackText },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-[56vh] min-h-[390px] max-h-[580px] rounded-3xl border border-cyan-200/30 bg-[#060f28]/45 backdrop-blur-sm shadow-[0_0_50px_rgba(42,190,255,0.12)]">
      <div className="h-full flex flex-col p-4 md:p-5">
        <div className="mb-2 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            AI Assistant
          </h2>
          <p className="text-xs md:text-sm text-white/90">
            Answers are based on data from this website
          </p>
        </div>

        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto rounded-2xl border border-white/25 bg-[#081738]/45 px-3 py-3 md:px-4 space-y-3 scrollbar-thin scrollbar-thumb-cyan-200/40 scrollbar-track-transparent"
        >
          {messages.map((message, index) => {
            const isUser = message.role === "user";

            return (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-2 md:px-5 md:py-3 text-sm md:text-base leading-7 ${
                    isUser
                      ? "bg-gradient-to-r from-sky-600 to-cyan-500 text-white"
                      : "bg-slate-900/75 text-white/95"
                  }`}
                >
                  <p
                    dir="auto"
                    className={isUser ? "text-white" : "text-white/95"}
                  >
                    {message.content}
                  </p>
                </div>
              </div>
            );
          })}

          {isLoading ? (
            <div className="flex justify-start">
              <div className="max-w-[88%] rounded-2xl px-4 py-2 md:px-5 md:py-3 text-sm md:text-base leading-7 bg-slate-900/75 text-white">
                Thinking...
              </div>
            </div>
          ) : null}
        </div>

        <form className="mt-3 flex gap-3" onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type your question..."
            className="h-12 md:h-14 flex-1 rounded-xl border border-white/30 bg-slate-900/65 px-4 text-white placeholder:text-white/75 outline-none focus:border-cyan-300/80"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="h-12 md:h-14 min-w-[96px] rounded-xl bg-gradient-to-r from-sky-500 to-cyan-300 px-4 text-lg font-semibold text-white disabled:opacity-60"
          >
            Send
          </button>
        </form>

        <p className="mt-2 text-center text-xs text-red-300 min-h-[1rem]">
          {errorMessage}
        </p>
      </div>
    </section>
  );
};

export default AiAssistantPanel;
