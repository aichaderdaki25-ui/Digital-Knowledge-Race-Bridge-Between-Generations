import React from 'react';
import { Team } from '../types';
import { Trophy, RefreshCw, Star } from 'lucide-react';

interface ResultsScreenProps {
  teams: Team[];
  onRestart: () => void;
  isMidGame?: boolean;
  onNext?: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ teams, onRestart, isMidGame = false, onNext }) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-3xl mx-auto text-center px-4">
        {/* Plaque Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-t-full shadow-2xl overflow-hidden border-8 border-double border-morocco-gold relative">
            
            {/* Header */}
            <div className="bg-morocco-red pt-20 pb-10 px-8 text-white relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-200 to-transparent"></div>
                
                <h2 className="text-4xl md:text-5xl font-heading font-bold relative z-10 mb-4 text-morocco-gold drop-shadow-sm">
                    {isMidGame ? "Current Standings" : "Grand Victory"}
                </h2>
                
                {!isMidGame && (
                  <div className="relative inline-block">
                     <div className="absolute inset-0 bg-morocco-gold blur-2xl opacity-50 rounded-full"></div>
                     <Trophy className="relative z-10 text-morocco-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" size={80} />
                  </div>
                )}
            </div>

            {/* List */}
            <div className="p-8 bg-morocco-cream/50 min-h-[300px]">
                <div className="space-y-4">
                    {sortedTeams.map((team, index) => {
                        const isFirst = index === 0;
                        return (
                        <div 
                            key={team.id}
                            className={`flex items-center justify-between p-4 rounded-xl transition-transform transform border-2 ${
                                isFirst 
                                    ? 'bg-white border-morocco-gold scale-105 shadow-xl z-10' 
                                    : 'bg-white/60 border-transparent hover:border-morocco-sand'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Rank Icon */}
                                <div className={`w-12 h-12 star-8-icon shadow-sm ${
                                    isFirst ? 'bg-morocco-gold text-white scale-110' : 
                                    index === 1 ? 'bg-gray-400 text-white' :
                                    index === 2 ? 'bg-amber-700 text-white' : 'bg-morocco-sand/50 text-gray-600'
                                }`}>
                                    <span className="font-heading font-bold text-lg">{index + 1}</span>
                                </div>
                                
                                <div className="text-left">
                                    <h3 className={`font-bold text-xl font-heading ${isFirst ? 'text-morocco-red' : 'text-gray-800'}`}>
                                      {team.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{team.members}</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-end">
                                <span className="text-3xl font-heading font-bold text-morocco-blue">{team.score}</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Points</span>
                            </div>
                        </div>
                    )})}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-8 bg-white border-t border-morocco-sand">
                {isMidGame ? (
                     <button 
                     onClick={onNext}
                     className="bg-morocco-green text-white px-10 py-4 rounded-lg font-bold font-heading text-xl hover:bg-green-800 transition-colors shadow-tile border-2 border-morocco-gold"
                 >
                     Continue Journey
                 </button>
                ) : (
                    <button 
                        onClick={onRestart}
                        className="bg-morocco-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg flex items-center gap-2 mx-auto uppercase tracking-wide"
                    >
                        <RefreshCw size={20} /> Play Again
                    </button>
                )}
            </div>
        </div>
    </div>
  );
};