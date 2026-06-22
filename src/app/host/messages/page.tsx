'use client'

import { Send } from 'lucide-react'

export default function Messages() {
  const conversations = [
    { guest: 'Sarah Mitchell', lastMessage: 'Thank you! Will arrive around 3pm', time: 'Just now', unread: 2 },
    { guest: 'James Cooper', lastMessage: 'Amazing stay, will definitely book again!', time: '2 hours ago', unread: 0 },
    { guest: 'Emma Johnson', lastMessage: 'Do you have WiFi available?', time: 'Yesterday', unread: 1 },
  ]

  return (
    <div className="space-y-8">
      <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-2xl p-8">
        <h1 className="text-4xl font-black text-brand-primary mb-2">Messages 💬</h1>
        <p className="text-brand-earth">Chat with your guests</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-brand-primary/10">
            <h3 className="font-bold text-brand-primary">Conversations</h3>
          </div>
          <div className="divide-y divide-brand-primary/10">
            {conversations.map((conv, i) => (
              <div key={i} className="p-4 hover:bg-brand-primary/5 cursor-pointer transition">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-brand-primary">{conv.guest}</p>
                  {conv.unread > 0 && <span className="w-5 h-5 bg-brand-primary text-white text-xs rounded-full flex items-center justify-center font-bold">{conv.unread}</span>}
                </div>
                <p className="text-sm text-brand-earth truncate">{conv.lastMessage}</p>
                <p className="text-xs text-brand-earth/60 mt-1">{conv.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="lg:col-span-2 backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-xl flex flex-col">
          <div className="p-4 border-b border-brand-primary/10">
            <p className="font-bold text-brand-primary">Sarah Mitchell</p>
            <p className="text-xs text-brand-earth">Active now</p>
          </div>

          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="flex justify-start">
              <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-lg px-4 py-2 max-w-xs">
                <p className="text-sm text-brand-primary">Hi! Do you have any spots available for next week?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-brand-primary text-white rounded-lg px-4 py-2 max-w-xs">
                <p className="text-sm">Yes! I have availability from June 21-28. Would that work?</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-lg px-4 py-2 max-w-xs">
                <p className="text-sm text-brand-primary">Perfect! Will arrive around 3pm on the 21st</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-brand-primary/10 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-white border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-primary focus:outline-none focus:border-brand-primary"
            />
            <button className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:shadow-lg transition">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
