import React, { useState } from 'react';
import { Bot, ArrowRight, ArrowLeft, Activity, Check } from 'lucide-react';

const QUESTIONS = [
  { id: 'goal', question: "Quel est ton objectif principal ?", options: ["Perte de poids", "Prise de masse", "Remise en forme", "Performance"] },
  { id: 'level', question: "Quel est ton niveau actuel ?", options: ["Débutant", "Intermédiaire", "Avancé"] },
  { id: 'days', question: "Combien de jours par semaine ?", options: ["2 jours", "3 jours", "4 jours", "5 jours+"] },
  { id: 'diet', question: "Régime particulier ?", options: ["Aucun", "Végétarien", "Vegan", "Sans gluten"] }
];

export default function Onboarding({ onComplete }: { onComplete: (data: Record<string, string>) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (option: string) => {
    if (isTransitioning) return;

    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: option };
    setAnswers(newAnswers);
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      } else {
        setIsGenerating(true);
        setTimeout(() => onComplete(newAnswers), 3000);
      }
    }, 400);
  };

  if (isGenerating) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-[#0a0a0a]">
        <Activity className="w-20 h-20 text-blue-500 animate-pulse mb-6" />
        <h2 className="text-3xl font-bold text-white mb-2">Analyse de vos données...</h2>
        <p className="text-slate-400">Le Coach IA prépare votre plan personnalisé.</p>
      </div>
    );
  }

  const progress = (currentStep / (QUESTIONS.length - 1)) * 100;

  return (
    <div className="flex min-h-screen flex-col items-center p-4 pt-20 bg-[#0a0a0a]">
      <div className="max-w-xl w-full bg-[#0d0d0d] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="w-full bg-slate-800 h-1.5">
          <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="p-8">
          <div className="flex justify-between mb-8 text-slate-400">
            <button onClick={() => setCurrentStep(prev => prev - 1)} disabled={currentStep === 0 || isTransitioning} className="disabled:opacity-0 hover:text-white transition-colors">
              <ArrowLeft />
            </button>
            <Bot className="text-blue-400 w-10 h-10" />
            <span className="text-sm font-mono">{currentStep + 1} / {QUESTIONS.length}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">{QUESTIONS[currentStep].question}</h3>
          <div className="space-y-3">
            {QUESTIONS[currentStep].options.map((opt) => (
              <button key={opt} onClick={() => handleAnswer(opt)} disabled={isTransitioning} 
                className={`w-full p-4 rounded-xl border text-left transition-all flex justify-between items-center 
                ${answers[QUESTIONS[currentStep].id] === opt ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-slate-700 bg-[#1a1a1a] text-slate-400 hover:border-slate-500'}`}>
                {opt} {answers[QUESTIONS[currentStep].id] === opt && <Check size={18} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
