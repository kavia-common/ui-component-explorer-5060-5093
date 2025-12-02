import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ChatBubbles - simple chat message bubbles layout.
 */
function ChatBubbles({ messages = [] }) {
  return (
    <div className="space-y-2">
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[72%] rounded-2xl px-3 py-2 text-sm shadow ${m.me ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-gray-100 text-slate-800 rounded-bl-sm dark:bg-gray-800 dark:text-slate-100'}`}>
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatBubbles;
