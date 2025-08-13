import { useEffect } from "react";

interface SoundEffectsProps {
  trigger: string | null;
  onComplete?: () => void;
}

export const SoundEffects = ({ trigger, onComplete }: SoundEffectsProps) => {
  useEffect(() => {
    if (!trigger) return;

    // Create audio context for better browser support
    let audioContext: AudioContext;
    
    const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
      try {
        if (!audioContext) {
          audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
        
        setTimeout(() => {
          onComplete?.();
        }, duration * 1000);
      } catch (error) {
        console.log('Audio not supported');
        onComplete?.();
      }
    };

    switch (trigger) {
      case 'answer_select':
        playTone(800, 0.2);
        break;
      case 'revelation':
        // Mystical ascending tones
        playTone(440, 0.3);
        setTimeout(() => playTone(554, 0.3), 300);
        setTimeout(() => playTone(659, 0.5), 600);
        break;
      case 'pattern_detected':
        // Dramatic sequence
        playTone(200, 0.1);
        setTimeout(() => playTone(400, 0.1), 100);
        setTimeout(() => playTone(800, 0.3), 200);
        break;
      case 'achievement':
        // Victory sound
        playTone(523, 0.2); // C
        setTimeout(() => playTone(659, 0.2), 200); // E
        setTimeout(() => playTone(784, 0.4), 400); // G
        break;
      case 'email_success':
        // Success chime
        playTone(1047, 0.3);
        setTimeout(() => playTone(1319, 0.5), 300);
        break;
      case 'final_reveal':
        // Epic reveal sequence
        playTone(330, 0.2);
        setTimeout(() => playTone(440, 0.2), 200);
        setTimeout(() => playTone(554, 0.2), 400);
        setTimeout(() => playTone(659, 0.5), 600);
        setTimeout(() => playTone(880, 0.7), 800);
        break;
      default:
        onComplete?.();
    }
  }, [trigger, onComplete]);

  return null;
};

export default SoundEffects;