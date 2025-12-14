import React, { useState } from 'react';
import { GameState, Team, Question } from './types';
import { INITIAL_TEAMS } from './constants';
import { generateQuestions } from './services/geminiService';
import { useSoundEffects } from './components/SoundManager';
import { ZelligePattern } from './components/ZelligePattern';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { TutorialModal } from './components/TutorialModal';
import { HelpCircle, Volume2 } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState['phase']>('setup');
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { playCorrect, playIncorrect, playTick, playFanfare, initAudio } = useSoundEffects();

  const handleStartGame = async () => {
    initAudio(); 
    setIsLoading(true);
    const generatedQuestions = await generateQuestions(5);
    setQuestions(generatedQuestions);
    setGameState('playing');
    setCurrentQuestionIdx(0);
    setIsLoading(false);
    setTeams(teams.map(t => ({ ...t, score: 0 })));
  };

  const handleTurnComplete = (results: { teamId: string; correct: boolean }[]) => {
    setTeams(prevTeams => prevTeams.map(team => {
        const result = results.find(r => r.teamId === team.id);
        if (result && result.correct) {
            return { ...team, score: team.score + 100 };
        }
        return team;
    }));

    setTimeout(() => {
        if (currentQuestionIdx >= questions.length - 1) {
            playFanfare();
            setGameState('game-over');
        } else {
           setCurrentQuestionIdx(prev => prev + 1);
        }
    }, 1500);
  };

  const restartGame = () => {
    setGameState('setup');
    setQuestions([]);
    setCurrentQuestionIdx(0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 bg-morocco-sand/20">
      {/* Complex Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-morocco-cream via-orange-50 to-amber-100 z-0"></div>
      <ZelligePattern className="z-0 opacity-10" />
      
      {/* Decorative Border Frame for the whole page */}
      <div className="absolute inset-2 md:inset-4 border-2 border-morocco-gold/30 rounded-3xl pointer-events-none z-10"></div>
      <div className="absolute inset-3 md:inset-6 border border-morocco-gold/20 rounded-[20px] pointer-events-none z-10"></div>

      {/* Navbar */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 star-8-icon bg-morocco-red text-white shadow-md">
                <span className="font-heading font-bold text-xs">MA</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-morocco-blue text-xl leading-none">Knowledge Race</span>
              <span className="text-xs text-morocco-gold font-bold tracking-widest uppercase">Morocco Edition</span>
            </div>
        </div>
        <div className="flex gap-3">
             <button 
                onClick={() => { initAudio(); }}
                className="p-3 bg-white/80 backdrop-blur rounded-full hover:bg-white transition shadow-sm text-morocco-blue hover:text-morocco-gold border border-morocco-sand"
                title="Enable Sound"
             >
                 <Volume2 size={20} />
             </button>
             <button 
                onClick={() => setShowTutorial(true)}
                className="p-3 bg-white/80 backdrop-blur rounded-full hover:bg-white transition shadow-sm text-morocco-blue hover:text-morocco-gold border border-morocco-sand"
             >
                 <HelpCircle size={20} />
             </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full flex-1 flex flex-col justify-center py-16 md:py-12">
        {gameState === 'setup' && (
            <SetupScreen 
                teams={teams} 
                onUpdateTeams={setTeams} 
                onStart={handleStartGame}
                isLoading={isLoading}
            />
        )}

        {gameState === 'playing' && questions.length > 0 && (
            <GameScreen 
                question={questions[currentQuestionIdx]}
                teams={teams}
                questionIndex={currentQuestionIdx}
                totalQuestions={questions.length}
                onTimeUp={() => {}}
                onAnswersSubmitted={handleTurnComplete}
                onPlayTick={playTick}
                onPlayCorrect={playCorrect}
                onPlayIncorrect={playIncorrect}
            />
        )}

        {gameState === 'game-over' && (
            <ResultsScreen 
                teams={teams} 
                onRestart={restartGame} 
            />
        )}
      </main>
      
      {/* Footer Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-6 z-20 opacity-100 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]" 
           style={{ 
             background: `repeating-linear-gradient(90deg, #A8201A 0px, #A8201A 20px, #D4AF37 20px, #D4AF37 24px, #0F5132 24px, #0F5132 44px, #D4AF37 44px, #D4AF37 48px, #1C39BB 48px, #1C39BB 68px, #D4AF37 68px, #D4AF37 72px)` 
           }}>
      </div>

      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
    </div>
  );
};

export default App;