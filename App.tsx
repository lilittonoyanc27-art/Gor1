import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, 
  ArrowRight,
  Gamepad2,
  Wind,
  Trophy
} from 'lucide-react';

// --- Types ---

interface SoundWord {
  word: string;
  sound: 'G' | 'Kh'; // G = Գ, Kh = Խ
}

// --- Data ---

const SOUND_GAME_WORDS: SoundWord[] = [
  { word: "Gato", sound: 'G' },
  { word: "Jirafa", sound: 'Kh' },
  { word: "Guitarra", sound: 'G' },
  { word: "Gente", sound: 'Kh' },
  { word: "Joven", sound: 'Kh' },
  { word: "Goma", sound: 'G' },
  { word: "Guerra", sound: 'G' },
  { word: "Jabón", sound: 'Kh' },
  { word: "Girasol", sound: 'Kh' },
  { word: "Galleta", sound: 'G' },
  { word: "Jamón", sound: 'Kh' },
  { word: "Guante", sound: 'G' },
  { word: "Gimnasio", sound: 'Kh' },
  { word: "Gusano", sound: 'G' },
  { word: "Jefe", sound: 'Kh' },
  { word: "Guía", sound: 'G' },
  { word: "Guiso", sound: 'G' },
  { word: "Joya", sound: 'Kh' },
  { word: "Genio", sound: 'Kh' },
  { word: "Gafas", sound: 'G' },
];

export default function App() {
  const [gameState, setGameState] = useState<'menu' | 'sound-game'>('menu');
  
  // Sound-Game State
  const [soundGameIdx, setSoundGameIdx] = useState(0);
  const [soundGameScore, setSoundGameScore] = useState(0);
  const [soundGameFinished, setSoundGameFinished] = useState(false);
  const [draggedTo, setDraggedTo] = useState<'G' | 'Kh' | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const startSoundGame = () => {
    setSoundGameIdx(0);
    setSoundGameScore(0);
    setSoundGameFinished(false);
    setDraggedTo(null);
    setFeedback(null);
    setGameState('sound-game');
  };

  const handleSoundChoice = (choice: 'G' | 'Kh') => {
    const current = SOUND_GAME_WORDS[soundGameIdx];
    if (choice === current.sound) {
      setSoundGameScore(prev => prev + 1);
      setDraggedTo(choice);
      setFeedback('correct');
      setTimeout(() => {
        if (soundGameIdx < SOUND_GAME_WORDS.length - 1) {
          setSoundGameIdx(prev => prev + 1);
          setDraggedTo(null);
          setFeedback(null);
        } else {
          setSoundGameFinished(true);
        }
      }, 600);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0ea5e9] bg-gradient-to-b from-[#0ea5e9] to-[#1e3a8a] flex flex-col font-sans text-white overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/20 blur-[150px] rounded-full -z-10" />

      {/* Header */}
      <header className="p-6 max-w-2xl mx-auto w-full z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter text-white">Spanish Master</h1>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-yellow-300 font-black text-2xl drop-shadow-md">ԳՈՌԻ ՀԱՄԱՐ</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 z-10 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {gameState === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-12 border border-white/20 shadow-2xl text-center">
                  <h2 className="text-4xl font-black text-white mb-8">Գ թե՞ Խ</h2>
                  <p className="text-blue-100 font-bold mb-10">
                    Տար բառը ճիշտ զամբյուղի մեջ:
                  </p>

                  <button
                    onClick={startSoundGame}
                    className="w-full py-6 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 rounded-3xl font-black text-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    Սկսել Խաղը
                    <ArrowRight className="w-8 h-8" />
                  </button>
                </div>
              </motion.div>
            )}
            {gameState === 'sound-game' && (
              <motion.div
                key="sound-game"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-md mx-auto h-[500px] flex flex-col justify-between relative"
              >
                {!soundGameFinished ? (
                  <>
                    <div className="text-center space-y-2">
                      <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-blue-100">
                        <Wind className="w-3 h-3" />
                        Հնչյունների խաղ
                      </div>
                      <p className="text-white/60 font-bold">Տար բառը ճիշտ զամբյուղի մեջ</p>
                    </div>

                    <div className="flex-1 flex items-center justify-center relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={soundGameIdx}
                          drag
                          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                          dragElastic={0.7}
                          onDragEnd={(_, info) => {
                            if (info.offset.x < -100) handleSoundChoice('Kh');
                            else if (info.offset.x > 100) handleSoundChoice('G');
                          }}
                          animate={
                            draggedTo === 'Kh' ? { x: -300, opacity: 0, scale: 0.5 } :
                            draggedTo === 'G' ? { x: 300, opacity: 0, scale: 0.5 } :
                            feedback === 'wrong' ? { x: [0, -10, 10, -10, 10, 0] } :
                            { x: 0, opacity: 1, scale: 1 }
                          }
                          className={`px-10 py-6 rounded-[30px] text-5xl font-black shadow-2xl cursor-grab active:cursor-grabbing border-4 transition-colors duration-200 ${
                            feedback === 'correct' ? 'bg-green-500 text-white border-green-400' :
                            feedback === 'wrong' ? 'bg-red-500 text-white border-red-400' :
                            'bg-white text-blue-900 border-yellow-400'
                          }`}
                        >
                          {SOUND_GAME_WORDS[soundGameIdx].word}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="flex justify-between items-end gap-4 pb-10">
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-32 h-32 bg-blue-900/40 rounded-t-[40px] border-x-4 border-t-4 flex items-center justify-center relative overflow-hidden transition-colors ${
                          feedback === 'correct' && draggedTo === 'Kh' ? 'border-green-400 bg-green-900/40' : 
                          feedback === 'wrong' ? 'border-red-400 bg-red-900/40' : 
                          'border-white/20'
                        }`}>
                          <div className="absolute inset-0 bg-blue-400/10" />
                          <span className="text-5xl font-black text-white relative z-10">Խ</span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-300">Ձախ</span>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-32 h-32 bg-blue-900/40 rounded-t-[40px] border-x-4 border-t-4 flex items-center justify-center relative overflow-hidden transition-colors ${
                          feedback === 'correct' && draggedTo === 'G' ? 'border-green-400 bg-green-900/40' : 
                          feedback === 'wrong' ? 'border-red-400 bg-red-900/40' : 
                          'border-white/20'
                        }`}>
                          <div className="absolute inset-0 bg-emerald-400/10" />
                          <span className="text-5xl font-black text-white relative z-10">Գ</span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-300">Աջ</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/10 backdrop-blur-xl rounded-[50px] p-12 border border-white/20 shadow-2xl text-center"
                  >
                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-black mb-2">Ապրե՛ս, Գոռ!</h2>
                    <p className="text-blue-200 font-bold mb-8">Դու ավարտեցիր հնչյունների խաղը</p>
                    <button
                      onClick={() => setGameState('menu')}
                      className="w-full py-5 bg-white text-blue-900 rounded-3xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      <RotateCcw className="w-6 h-6" />
                      Վերադառնալ մենյու
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-white/40 text-[10px] font-bold uppercase tracking-widest">
        Spanish Pronunciation Master • 2026
      </footer>
    </div>
  );
}
