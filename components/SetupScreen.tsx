import React, { useState } from 'react';
import { Team } from '../types';
import { Plus, Trash2, Users, Star } from 'lucide-react';

interface SetupScreenProps {
  teams: Team[];
  onUpdateTeams: (teams: Team[]) => void;
  onStart: () => void;
  isLoading: boolean;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ teams, onUpdateTeams, onStart, isLoading }) => {
  const [newTeamName, setNewTeamName] = useState("");

  const addTeam = () => {
    if (!newTeamName.trim()) return;
    const newTeam: Team = {
      id: Math.random().toString(36).substr(2, 9),
      name: newTeamName,
      score: 0,
      members: "Mixed"
    };
    onUpdateTeams([...teams, newTeam]);
    setNewTeamName("");
  };

  const removeTeam = (id: string) => {
    onUpdateTeams(teams.filter(t => t.id !== id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Decorative top lantern hook */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-4 h-12 bg-morocco-gold/50 z-0"></div>
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-morocco-gold z-0"></div>

      <div className="bg-white/95 backdrop-blur-sm shadow-2xl border-4 border-double border-morocco-gold moroccan-arch-t overflow-hidden relative z-10">
        
        {/* Header Section */}
        <div className="bg-morocco-blue pt-16 pb-8 px-6 text-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
             <h1 className="text-5xl font-heading font-bold text-morocco-gold mb-2 drop-shadow-md">Marhaba!</h1>
             <h2 className="text-xl text-white font-semibold tracking-wide">Digital Knowledge Race</h2>
             <div className="w-24 h-1 bg-morocco-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="p-8 space-y-8">
          <p className="text-center text-gray-600 italic">
            "Knowledge is a garden without fences." <br/> Gather your mixed-age teams (Students & Elders).
          </p>

          <div className="bg-morocco-cream p-6 rounded-xl border border-morocco-sand shadow-inner">
            <label className="block text-lg font-bold text-morocco-red mb-3 font-heading">Add Participating Team</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTeam()}
                placeholder="e.g., Atlas Lions"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-morocco-sand focus:border-morocco-gold focus:ring-1 focus:ring-morocco-gold outline-none bg-white text-lg"
              />
              <button 
                onClick={addTeam}
                className="bg-morocco-green hover:bg-green-800 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 border-b-4 border-green-900 active:border-b-0 active:translate-y-1 shadow-lg"
              >
                <Plus size={24} /> <span className="hidden sm:inline">Add</span>
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {teams.length === 0 && (
              <div className="text-center py-8 opacity-50 flex flex-col items-center">
                 <Users size={48} className="text-morocco-sand mb-2" />
                 <p>No teams yet. Start by adding one above!</p>
              </div>
            )}
            {teams.map((team) => (
              <div key={team.id} className="flex items-center justify-between bg-white p-4 rounded-lg border-l-4 border-morocco-gold shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 star-8-icon text-white shadow-sm">
                    <span className="font-heading font-bold text-sm text-morocco-blue">{team.name.charAt(0)}</span>
                  </div>
                  <span className="font-bold text-xl text-gray-800 font-heading">{team.name}</span>
                </div>
                <button 
                  onClick={() => removeTeam(team.id)}
                  className="text-morocco-red hover:bg-red-50 p-2 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button 
              onClick={onStart}
              disabled={teams.length < 1 || isLoading}
              className={`w-full py-4 rounded-xl text-2xl font-bold font-heading uppercase tracking-widest transition-all transform shadow-tile
                ${teams.length < 1 || isLoading 
                  ? 'bg-gray-200 cursor-not-allowed text-gray-400 border-gray-300' 
                  : 'bg-gradient-to-r from-morocco-red to-red-700 text-white hover:scale-[1.01] border-2 border-morocco-gold'}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                   <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                   Consulting Sages...
                </span>
              ) : "Begin Journey"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};