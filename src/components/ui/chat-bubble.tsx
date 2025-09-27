import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ChatBubbleProps {
  children?: ReactNode;
  type: 'bot' | 'user';
  className?: string;
  isTyping?: boolean;
}

export const ChatBubble = ({ children, type, className, isTyping = false }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex mb-4",
      type === 'user' ? "justify-end" : "justify-start",
      className
    )}>
      <div className={cn(
        "max-w-[80%] px-4 py-3 rounded-2xl shadow-soft chat-bubble-enter",
        type === 'bot' 
          ? "bg-chat-bot text-chat-bot-foreground rounded-bl-md" 
          : "bg-chat-user text-chat-user-foreground rounded-br-md",
        isTyping && "chat-typing"
      )}>
        {isTyping ? (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};