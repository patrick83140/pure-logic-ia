import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import axios from 'axios';

export default function Chat({ show, onClose, messages, setMessages }: any) {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((p: any) => [...p, userMsg]);
    setInput("");

    const isLocal = window.location.hostname === "localhost";
    const apiUrl = isLocal ? 'https://api.openai.com/v1/chat/completions' : '/api/chat';
    const headers = isLocal ? { 'Authorization': `Bearer ${import.meta.env.VITE_LOCAL_API_KEY}` } : {};

    try {
      const res = await axios.post(apiUrl, {
        model: "gpt-4o-mini",
        messages: [{role: "system", content: "Coach fitness expert, bref et motivant."}, ...messages, userMsg]
      }, { headers });
      
      setMessages((p: any) => [...p, { role: "ai", content: res.data.choices[0].message.content }]);
    } catch (e: any) {
      const errorMsg = e.response?.data?.error?.message || "Erreur de connexion avec l'IA.";
      setMessages((p: any) => [...p, { role: "ai", content: errorMsg }]);
    }
  };

  if (!show) return null;
  return (
    <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="p-6 flex justify-between items-center border-b border-zinc-800 bg-zinc-950">
        <span className="font-black italic text-emerald-500 uppercase tracking-tighter">PureLogic Chat</span>
        <button onClick={onClose} className="bg-zinc-800 p-2 rounded-full"><X size={20}/></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m:any, i:number) => (
          <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role==='user'?'bg-emerald-500 text-black font-bold':'bg-zinc-900 text-white'}`}>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-6 bg-zinc-950 border-t border-zinc-800 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyPress={e=>e.key==='Enter'&&sendMessage()} className="flex-1 p-4 rounded-xl outline-none bg-zinc-900 text-sm" placeholder="Questionne le coach..." />
        <button onClick={sendMessage} className="bg-emerald-500 text-black p-4 rounded-xl"><Send size={20}/></button>
      </div>
    </motion.div>
  );
}
