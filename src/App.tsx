import React, { useState } from 'react';
// Importation des 3 étapes de ton application
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

export default function App() {
  // 1. L'état pour savoir quel écran afficher ('auth', 'onboarding' ou 'dashboard')
  const [currentView, setCurrentView] = useState<'auth' | 'onboarding' | 'dashboard'>('auth');
  
  // 2. L'état pour stocker les réponses que l'utilisateur donnera au Coach IA
  const [userData, setUserData] = useState<Record<string, string>>({});

  // 3. La fonction qui se déclenche quand le questionnaire IA est fini
  const handleOnboardingComplete = (data: Record<string, string>) => {
    setUserData(data); // On enregistre les réponses (objectif, niveau, etc.)
    setCurrentView('dashboard'); // On bascule sur le tableau de bord
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200">
      {/* ÉTAPE 1 : INSCRIPTION */}
      {currentView === 'auth' && (
        <Auth onConfirm={() => setCurrentView('onboarding')} />
      )}
      
      {/* ÉTAPE 2 : LE QUESTIONNAIRE IA */}
      {currentView === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      {/* ÉTAPE 3 : LE TABLEAU DE BORD (DASHBOARD) */}
      {currentView === 'dashboard' && (
        <Dashboard userData={userData} />
      )}
    </div>
  );
}