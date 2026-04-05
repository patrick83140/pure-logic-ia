import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export default function Auth({ onConfirm }: { onConfirm: () => void }) {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;

    if (password.length < 6) {
      setError("Le mot de passe doit faire au moins 6 caractères.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 1500);
  };

  if (isEmailSent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0d0d0d] p-8 rounded-2xl border border-slate-800 text-center space-y-6">
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto animate-bounce" />
          <h2 className="text-2xl font-bold text-white">Vérifiez vos emails</h2>
          <p className="text-slate-400">Un lien de confirmation a été envoyé.</p>
          <button onClick={onConfirm} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold">
            Simuler la validation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0d0d0d] p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Pure Logic IA</h1>
          <p className="text-slate-400 mt-2">Inscription sécurisée</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-slate-500 w-5 h-5" />
              <input name="username" type="text" placeholder="Prénom" required className="w-full bg-[#1a1a1a] border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none" />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-500 w-5 h-5" />
              <input name="email" type="email" placeholder="Email" required className="w-full bg-[#1a1a1a] border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-500 w-5 h-5" />
              <input name="password" type="password" placeholder="Mot de passe (min 6 car.)" required className="w-full bg-[#1a1a1a] border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none" />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all">
            {isLoading ? <Loader2 className="animate-spin" /> : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}
