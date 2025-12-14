import React, { useEffect, useState } from 'react';
import { Question, Team } from '../types';
import { Clock, CheckCircle, Star } from 'lucide-react';
import { TIME_LIMIT_SECONDS } from '../constants';

interface GameScreenProps {
  question: Question;
  teams: Team[];
  questionIndex: number;
  totalQuestions: number;
  onTimeUp: () => void;
  onAnswersSubmitted: (results: { teamId: string; correct: boolean }[]) => void;
  onPlayTick: () => void;
  onPlayCorrect: () => void;
  onPlayIncorrect: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  question,
  teams,
  questionIndex,
  totalQuestions,
  onTimeUp,
  onAnswersSubmitted,
  onPlayTick,
  onPlayCorrect,
  onPlayIncorrect
}) => {
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);
  const [isRevealed, setIsRevealed] = useState(false);
  const [teamAnswers, setTeamAnswers] = useState<Record<string, number | null>>({});

  useEffect(() => {
    setTimeLeft(TIME_LIMIT_SECONDS);
    setIsRevealed(false);
    setTeamAnswers({});
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleReveal();
          return 0;
        }
        if (prev <= 6) {
             onPlayTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question.id]);

  const handleReveal = () => {
    setIsRevealed(true);
    onTimeUp();
  };

  const selectAnswer = (teamId: string, optionIndex: number) => {
    if (isRevealed) return;
    setTeamAnswers(prev => ({ ...prev, [teamId]: optionIndex }));
  };

  const submitResults = () => {
    const results = teams.map(team => {
      const selectedIdx = teamAnswers[team.id];
      const correct = selectedIdx === question.correctAnswerIndex;
      return { teamId: team.id, correct };
    });
    
    const anyCorrect = results.some(r => r.correct);
    if (anyCorrect) onPlayCorrect();
    else onPlayIncorrect();

    onAnswersSubmitted(results);
  };

  const progressPercentage = (timeLeft / TIME_LIMIT_SECONDS) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Top HUD */}
      <div className="flex justify-between items-end mb-4 px-2">
        <div className="flex flex-col">
           <span className="text-morocco-gold font-heading text-lg">Quest</span>
           <span className="text-4xl font-heading font-bold text-white drop-shadow-md">{questionIndex + 1} <span className="text-xl text-white/70">/ {totalQuestions}</span></span>
        </div>
        <div className="bg-morocco-gold/20 px-4 py-1 rounded-t-lg border-t-2 border-l-2 border-r-2 border-morocco-gold/50 backdrop-blur-sm">
           <span className="text-white font-bold tracking-widest uppercase text-sm drop-shadow-sm">{question.category}</span>
        </div>
      </div>

      {/* Decorative Timer */}
      <div className="relative w-full h-6 bg-morocco-blue/30 rounded-full mb-8 border-2 border-morocco-gold shadow-[0_0_15px_rgba(212,175,55,0.3)] overflow-hidden">
        <div 
          className={`absolute h-full transition-all duration-1000 ease-linear ${timeLeft < 10 ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-morocco-green to-emerald-400'}`}
          style={{ width: `${progressPercentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
             <div className="bg-morocco-blue px-3 rounded-full text-xs font-bold text-morocco-gold border border-morocco-gold">
                <Clock size={12} className="inline mr-1" /> {timeLeft}s
             </div>
        </div>
      </div>

      {/* Main Question Card - Arch Shape */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 border-4 border-morocco-gold relative">
        {/* Decorative corner patterns */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-morocco-blue rounded-tl-xl opacity-20"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-morocco-blue rounded-tr-xl opacity-20"></div>

        <div className="pt-10 pb-8 px-8 text-center bg-gradient-to-b from-morocco-cream to-white">
          <h2 className="text-3xl md:text-4xl font-bold text-morocco-blue leading-tight mb-8 font-heading px-4">
            {question.text}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, idx) => {
              const isCorrect = idx === question.correctAnswerIndex;
              let btnClass = "bg-white border-2 border-morocco-sand text-gray-700 hover:border-morocco-blue hover:bg-blue-50";
              
              if (isRevealed) {
                if (isCorrect) btnClass = "bg-green-50 border-2 border-morocco-green text-green-900 shadow-[0_0_10px_rgba(15,81,50,0.2)]";
                else btnClass = "opacity-40 border-gray-200 bg-gray-50";
              }

              return (
                <div 
                  key={idx}
                  className={`p-5 rounded-xl font-semibold text-xl transition-all relative flex items-center shadow-sm ${btnClass}`}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 text-sm font-bold flex-shrink-0
                     ${isRevealed && isCorrect ? 'border-morocco-green bg-morocco-green text-white' : 'border-current opacity-50'}`}>
                      {['A','B','C','D'][idx]}
                  </div>
                  <span className="text-left font-body">{option}</span>
                  {isRevealed && isCorrect && (
                    <CheckCircle className="absolute top-1/2 right-4 transform -translate-y-1/2 text-morocco-green" size={24} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {isRevealed && (
          <div className="bg-morocco-blue p-6 border-t-4 border-morocco-gold text-white relative overflow-hidden">
            <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-8 h-8 bg-morocco-gold rotate-45"></div>
            <p className="text-center italic font-medium text-lg relative z-10 mt-2">
              <span className="font-heading text-morocco-gold text-xl block mb-1">Did you know?</span>
              {question.fact}
            </p>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl border-2 border-morocco-sand/50">
        <h3 className="text-center font-bold text-morocco-red mb-6 uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2">
             <div className="h-px w-8 bg-morocco-red/30"></div>
             Classroom Control Panel
             <div className="h-px w-8 bg-morocco-red/30"></div>
        </h3>
        
        {!isRevealed ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map(team => (
              <div key={team.id} className="p-3 border border-morocco-sand rounded-lg bg-morocco-cream/30 flex flex-col items-center">
                <div className="font-heading font-bold text-morocco-blue text-lg mb-2">{team.name}</div>
                <div className="flex gap-2">
                  {question.options.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectAnswer(team.id, idx)}
                      className={`h-10 w-10 rounded-lg flex items-center justify-center text-lg font-bold transition-all transform hover:scale-110 ${
                        teamAnswers[team.id] === idx 
                          ? 'bg-morocco-gold text-white shadow-lg rotate-3 border-2 border-white' 
                          : 'bg-white border-2 border-morocco-sand text-morocco-sand hover:border-morocco-blue hover:text-morocco-blue'
                      }`}
                    >
                      {['A','B','C','D'][idx]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
             <button 
                onClick={submitResults}
                className="bg-morocco-blue text-white px-10 py-4 rounded-full font-bold font-heading text-xl shadow-tile hover:bg-blue-800 transition-all active:scale-95 flex items-center gap-3 mx-auto border-2 border-morocco-gold"
             >
                Confirm Scores & Next
             </button>
          </div>
        )}
        
        {!isRevealed && (
           <div className="mt-8 text-center">
             <button 
               onClick={handleReveal}
               className="text-morocco-red/70 hover:text-morocco-red font-bold text-sm underline decoration-2 underline-offset-4"
             >
               Stop Timer & Reveal Answer
             </button>
           </div>
        )}
      </div>
    </div>
  );
};