import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de Bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cartes de statistiques rapides */}
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">Conversations</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">Tokens utilisés</p>
          <p className="text-2xl font-bold">1,240</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">Statut API</p>
          <p className="text-2xl font-bold text-green-500">Actif</p>
        </div>
      </div>
      
      <div className="mt-8 bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
        <p className="text-slate-400 text-center py-10">Aucune activité récente à afficher.</p>
      </div>
    </div>
  );
};

export default Dashboard;