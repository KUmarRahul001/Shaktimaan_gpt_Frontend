import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Message } from '../store/messages';

type MessageBubbleProps = {
  message: Message;
  formatDate: (date: string) => string;
};

export function MessageBubble({ message, formatDate }: MessageBubbleProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        "flex items-start gap-3 max-w-3xl mx-auto",
        isAssistant ? "justify-start" : "justify-end flex-row-reverse"
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
            isAssistant 
              ? "bg-primary text-white" 
              : "bg-secondary text-white"
          )}
        >
          {isAssistant ? (
            <Bot className="h-5 w-5" />
          ) : (
            <User className="h-5 w-5" />
          )}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(message.created_at)}
        </span>
      </div>
      
      <div
        className={cn(
          "rounded-2xl px-4 py-2 max-w-[80%] shadow-lg",
          isAssistant
            ? "glass-morphism gradient-border"
            : "bg-primary text-white"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}