import { useCallback, useRef } from 'react';

// Using Web Audio API to avoid external asset dependencies
export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

  const playTone = (freq: number, type: OscillatorType, duration: number, delay = 0) => {
    initAudio();
    const ctx = audioContextRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  };

  const playCorrect = () => {
    playTone(600, 'sine', 0.1);
    playTone(800, 'sine', 0.3, 0.1);
  };

  const playIncorrect = () => {
    playTone(300, 'sawtooth', 0.3);
    playTone(200, 'sawtooth', 0.4, 0.2);
  };

  const playTick = () => {
    playTone(800, 'square', 0.05);
  };

  const playFanfare = () => {
    playTone(400, 'sine', 0.2, 0);
    playTone(500, 'sine', 0.2, 0.2);
    playTone(600, 'sine', 0.2, 0.4);
    playTone(800, 'sine', 0.6, 0.6);
  };

  return { playCorrect, playIncorrect, playTick, playFanfare, initAudio };
};
