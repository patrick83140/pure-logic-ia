import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, ArrowRight, Activity, MessageSquare, Trophy, RotateCcw } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import { EXERCISE_DB } from './data/exercises';

export default function App() {
  const [step, setStep] = useState(() => Number(localStorage.getItem('step')) || 1);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('workout_history') || '[]'));
  const [program, setProgram] = useState<any>(() => JSON.parse(localStorage.getItem('program') || 'null'));
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('chat') || '[]'));
  const [showChat, setShowChat] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [currentExo, setCurrentExo] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);

  useEffect(() => {
    localStorage.setItem('step', step.toString());
    localStorage.setItem('workout_history', JSON.stringify(history));
    localStorage.setItem('chat', JSON.stringify(messages));
    if (program) localStorage.setItem('program', JSON.stringify(program));
  }, [step, history, messages, program]);

  useEffect(() => {
    if (restTimer > 0) {
      const t = setTimeout(() => setRestTimer(restTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [restTimer]);

  const generateWorkout = () => {
    const types = ["Push", "Pull", "Legs"];
    const type = types[Math.floor(Math.random() * 3)];
    setProgram({ type, exercises: EXERCISE_DB[type] });
    setStep(8);
  };

  const validerSerie = () => {
    if ('vibrate' in navigator) navigator.vibrate(60);
    if (currentSet < program.exercises[currentExo].sets) { 
      setCurrentSet(s => s + 1); setRestTimer(60); 
    } else if (currentExo < program.exercises.length - 1) { 
      setCurrentExo(e => e + 1); setCurrentSet(1); setRestTimer(90); 
    } else { 
      const totalSets = program.exercises.reduce((acc: number, exo: any) => acc + exo.sets, 0);
      const volume = (program.exercises.length * 100) + (totalSets * 10);
      setHistory((p: any) => [...p, { date: new Date().toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit'}), volume }].slice(-10));
      setStep(9); 
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 font-sans select-none">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-[85vh] flex flex-col items-center justify-center text-center">
            <Dumbbell className="text-emerald-500 w-24 h-24 mb-8 animate-bounce" />
            <h1 className="text-7xl font-black italic uppercase leading-[0.8] mb-6 tracking-tighter">PURE<br/><span className="text-emerald-500">LOGIC</span></h1>
            <button onClick={() => setStep(2)} className="bg-white text-black font-black px-12 py-5 rounded-2xl flex items-center gap-3 text-xl uppercase italic hover:scale-105 transition-transform">
              Initialiser <ArrowRight />
            </button>
          </motion.div>
        )}

        {step >= 2 && step <= 7 && (
          <motion.div key="dash" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="pt-6">
            <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Tableau de Bord</h2>
              <Activity className="text-emerald-500" />
            </div>
            <Dashboard history={history} />
            <button onClick={generateWorkout} className="w-full py-8 bg-emerald-500 text-black font-black rounded-[2.5rem] text-2xl italic uppercase shadow-[0_20px_50px_rgba(16,185,129,0.3)] active:scale-95 transition-all">
              Session IA
            </button>
          </motion.div>
        )}

        {step === 8 && program && (
          <motion.div key="work" initial={{opacity:0}} animate={{opacity:1}} className="relative pt-4">
            <div className="flex justify-between items-center mb-10">
              <span className="bg-emerald-500 text-black px-4 py-2 rounded-full text-xs font-black uppercase italic tracking-widest">{program.type} PRO</span>
              <button onClick={() => setShowChat(true)} className="bg-zinc-900 p-4 rounded-full border border-zinc-800"><MessageSquare size={20}/></button>
            </div>
            {restTimer > 0 ? (
              <div className="bg-emerald-500 text-black p-12 rounded-[3.5rem] text-center mb-10 shadow-2xl">
                <p className="text-xs font-black uppercase mb-2">Récupération</p>
                <span className="text-8xl font-black italic tracking-tighter">{restTimer}s</span>
              </div>
            ) : (
              <div className="bg-zinc-900 p-8 rounded-[3.5rem] border-t-4 border-emerald-500 mb-10 shadow-xl">
                <h3 className="text-4xl font-black uppercase italic leading-none mb-6 text-white">{program.exercises[currentExo].name}</h3>
                <div className="flex justify-between items-end mb-10">
                  <p className="text-emerald-500 font-black italic text-3xl">SET {currentSet}/{program.exercises[currentExo].sets}</p>
                  <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">{program.exercises[currentExo].reps} REPS</p>
                </div>
                <button onClick={validerSerie} className="w-full py-6 bg-emerald-500 text-black font-black rounded-2xl text-xl italic uppercase shadow-lg active:scale-95 transition-all">Valider Série</button>
              </div>
            )}
          </motion.div>
        )}

        {step === 9 && (
          <motion.div key="s9" initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="h-[80vh] flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(16,185,129,0.5)]">
              <Trophy size={48} className="text-black" />
            </div>
            <h2 className="text-6xl font-black italic uppercase leading-none mb-4">MISSION<br/><span className="text-emerald-500">ACCOMPLIE</span></h2>
            <button onClick={() => { setStep(2); setCurrentExo(0); setCurrentSet(1); }} className="mt-12 bg-white text-black font-black px-10 py-5 rounded-2xl text-xl uppercase italic flex items-center gap-2 hover:bg-emerald-500 transition-colors">
              <RotateCcw size={20}/> Retour Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <Chat show={showChat} onClose={() => setShowChat(false)} messages={messages} setMessages={setMessages} />
    </div>
  );
}