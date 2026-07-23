import { useState, useRef, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  Ship,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Send,
} from "lucide-react";

const suggestedPrompts = [
  {
    icon: MapPin,
    text: "Find a ship recycling facility in Gujarat",
  },
  {
    icon: Ship,
    text: "Which institutes offer ETO courses?",
  },
  {
    icon: BookOpen,
    text: "Download the latest maritime handbook",
  },
  {
    icon: ShieldCheck,
    text: "Explain STCW certification requirements",
  },
  {
    icon: MapPin,
    text: "Show maritime regulations for ship recycling",
  },
];

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! I'm the Maritime India AI Assistant — your guide to India's maritime ecosystem. I can help you find ship recycling facilities, training institutes, publications, regulations, and more. Try asking me one of the example questions below, or type your own.",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // Simulated bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Thank you for your question about "${userMsg}". This is a concept demonstration. In the live platform, the AI Assistant will provide real-time answers from India's official maritime knowledge base, DG Shipping circulars, facility directories, and STCW regulations.`,
        },
      ]);
    }, 1200);
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
  };

  return (
    <main className="flex w-full flex-col bg-[#F0E9DE] font-sans" style={{ minHeight: "calc(100vh - 180px)" }}>
      {/* ═══════════ CHAT AREA ═══════════ */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 py-10 md:px-10">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1A1A1A] text-white shadow-sm">
              <Briefcase size={22} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
                  Maritime India AI Assistant
                </h1>
                <span className="rounded-md border border-gray-300 px-2.5 py-0.5 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  Proposed Enhancement
                </span>
              </div>
              <p className="mt-0.5 flex items-center gap-2 text-sm text-gray-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Online · Powered by Maritime India Knowledge Base
              </p>
            </div>
          </div>

          {/* Enhancement Notice */}
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#D6AF36]/30 bg-[#D6AF36]/5 p-5">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-[#D6AF36]" />
            <p className="text-sm leading-relaxed text-gray-700">
              <span className="font-bold text-[#C5A028]">
                Proposed Enhancement:
              </span>{" "}
              This AI assistant is a concept demonstration. In the live
              platform, it will provide real-time answers from India&apos;s
              official maritime knowledge base, DG Shipping circulars, facility
              directories, and STCW regulations.
            </p>
          </div>

          {/* Suggested Prompts */}
          <div className="mt-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              TRY ASKING
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt.text}
                  type="button"
                  onClick={() => handlePromptClick(prompt.text)}
                  className="flex items-center gap-2 rounded-full border border-gray-300/70 bg-transparent px-4 py-2.5 text-sm text-gray-600 transition-all duration-200 hover:bg-white hover:border-gray-400 hover:text-gray-900 hover:shadow-sm"
                >
                  <prompt.icon size={14} className="text-gray-400" />
                  {prompt.text}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="mt-8 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className="flex items-start gap-3">
                {msg.role === "bot" && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-white">
                    <Briefcase size={16} />
                  </div>
                )}
                <div
                  className={`max-w-xl rounded-xl px-5 py-4 text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-white text-gray-700 shadow-sm border border-gray-100"
                      : "ml-auto bg-[#0A284D] text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>

      {/* ═══════════ CHAT INPUT (sticky bottom) ═══════════ */}
      <div className="sticky bottom-0 border-t border-gray-200/60 bg-[#F0E9DE] py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-6 md:px-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about India's maritime ecosystem..."
            className="flex-1 rounded-xl border border-gray-300/60 bg-white px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-shadow focus:shadow-md focus:border-gray-400"
            aria-label="Chat input"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2A2A2A] text-white transition-colors hover:bg-[#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default AiAssistant;
