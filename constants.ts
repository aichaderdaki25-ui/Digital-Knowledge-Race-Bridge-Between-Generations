import { Question } from './types';

export const QUESTIONS_PER_GAME = 5;
export const TIME_LIMIT_SECONDS = 30;

export const FALLBACK_QUESTIONS: Question[] = [
  {
    id: 'f1',
    text: "Which city is known as the 'Red City' of Morocco?",
    options: ["Casablanca", "Marrakech", "Fes", "Tangier"],
    correctAnswerIndex: 1,
    category: "Geography",
    fact: "Marrakech is called the Red City because of its red sandstone walls and buildings."
  },
  {
    id: 'f2',
    text: "What is the traditional Moroccan mint tea often affectionately called?",
    options: ["Berber Whiskey", "Desert Water", "Atlas Nectar", "Sultan's Drink"],
    correctAnswerIndex: 0,
    category: "Food",
    fact: "Mint tea is central to social life and is jokingly referred to as 'Berber Whiskey'."
  },
  {
    id: 'f3',
    text: "Which musical instrument is essential to Gnawa music?",
    options: ["Oud", "Guembri", "Qanun", "Violin"],
    correctAnswerIndex: 1,
    category: "Music",
    fact: "The Guembri is a three-stringed bass lute used by the Maalem (master) in Gnawa music."
  },
  {
    id: 'f4',
    text: "What is the name of the traditional Moroccan pointed slipper?",
    options: ["Jellaba", "Caftan", "Babouche", "Tarboush"],
    correctAnswerIndex: 2,
    category: "Traditions",
    fact: "Babouches are traditional leather slippers, often yellow for men and embroidered for women."
  },
  {
    id: 'f5',
    text: "In which year did Morocco gain independence from France?",
    options: ["1944", "1956", "1962", "1975"],
    correctAnswerIndex: 1,
    category: "History",
    fact: "Morocco officially gained independence on March 2, 1956, ending the French protectorate."
  }
];

export const INITIAL_TEAMS = [
  { id: '1', name: 'Atlas Lions', score: 0, members: 'Mixed' },
  { id: '2', name: 'Sahara Stars', score: 0, members: 'Mixed' },
];