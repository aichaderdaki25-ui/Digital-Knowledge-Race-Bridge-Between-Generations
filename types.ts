export interface Team {
  id: string;
  name: string;
  score: number;
  members: string; // "Students + Elders"
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  category: 'History' | 'Food' | 'Music' | 'Traditions' | 'Geography';
  fact: string; // Short educational fact shown after answering
}

export type GamePhase = 'setup' | 'tutorial' | 'loading' | 'playing' | 'round-result' | 'game-over';

export interface GameState {
  phase: GamePhase;
  teams: Team[];
  questions: Question[];
  currentQuestionIndex: number;
  timeLeft: number;
  winnerId: string | null;
  selectedAnswers: Record<string, number>; // teamId -> optionIndex
}
