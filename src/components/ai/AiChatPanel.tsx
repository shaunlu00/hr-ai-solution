'use client';

import { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { ChatMessage } from '@/lib/types';

interface AiChatPanelProps {
  title?: string;
  initialMessages?: ChatMessage[];
  placeholder?: string;
  onSend?: (message: string) => void;
}

export default function AiChatPanel({ title = 'AI 助手', initialMessages = [], placeholder = '输入你的问题...', onSend }: AiChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: `msg-${Date.now()}`, role: 'user', content: input, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    onSend?.(input);

    // 模拟 AI 回复
    setIsTyping(true);
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'ai',
        content: '感谢您的提问。根据系统分析，我已为您整理了相关信息。如需进一步了解，请继续提问。',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl border border-border flex flex-col h-[400px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="ml-auto px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-medium">在线</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'ai' && (
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-accent" />
              </div>
            )}
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
              msg.role === 'user'
                ? 'bg-accent text-white rounded-br-sm'
                : 'bg-slate-50 text-foreground rounded-bl-sm'
            }`}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3 h-3 text-slate-600" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Bot className="w-3 h-3 text-accent" />
            </div>
            <div className="bg-slate-50 px-4 py-3 rounded-xl rounded-bl-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full ai-typing-dot" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full ai-typing-dot" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full ai-typing-dot" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={placeholder}
            className="flex-1 h-9 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          <button
            onClick={handleSend}
            className="w-9 h-9 rounded-lg bg-accent text-white flex items-center justify-center hover:bg-accent/90 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
