import { useState, useEffect } from 'react';
import { Heart, ChevronLeft, Plus, Minus, User, Music } from 'lucide-react';
import type { Himno } from '@/types/himno';
import { useHymnHistory } from '@/hooks/useHymnHistory';
import { useWakeLock } from '@/hooks/useWakeLock';

interface HymnViewProps {
  himno: Himno;
  isFavorite: boolean;
  onToggleFavorite: (numero: number) => void;
  onBack: () => void;
}

export default function HymnView({ himno, isFavorite, onToggleFavorite, onBack }: HymnViewProps) {
  const [fontSize, setFontSize] = useState(18);
  const { addHistoryEntry } = useHymnHistory();
  const { toggle } = useWakeLock();

  useEffect(() => {
    const timer = setTimeout(() => {
      addHistoryEntry({
        hymnNumber: himno.numero,
        hymnTitle: himno.titulo,
        action: 'sang'
      });
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, [himno.numero]);

  const handleToggleFavorite = () => {
    onToggleFavorite(himno.numero);
    if (!isFavorite) {
      addHistoryEntry({
        hymnNumber: himno.numero,
        hymnTitle: himno.titulo,
        action: 'favorite'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Dynamic Header */}
      <div className="bg-header-gradient px-6 pb-12 rounded-b-[3.5rem] safe-top relative overflow-hidden shrink-0">
        {/* Abstract background circles */}
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-32 h-32 bg-accent/20 rounded-full blur-2xl" />

        <div className="relative z-10 flex items-center justify-between pt-2 mb-8">
          <button
            onClick={onBack}
            className="rounded-2xl bg-white/15 p-3 text-primary-foreground backdrop-blur-md transition-all hover:bg-white/20 border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFontSize(prev => Math.min(prev + 2, 40))}
              className="rounded-2xl bg-white/15 p-3 text-primary-foreground backdrop-blur-md transition-all hover:bg-white/20 border border-white/10"
            >
              <Plus size={20} />
            </button>
            <button
              onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
              className="rounded-2xl bg-white/15 p-3 text-primary-foreground backdrop-blur-md transition-all hover:bg-white/20 border border-white/10"
            >
              <Minus size={20} />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`rounded-2xl p-3 backdrop-blur-md transition-all border border-white/10 ${isFavorite ? 'bg-favorite-active text-white border-favorite-active shadow-lg shadow-favorite-active/40' : 'bg-white/15 text-primary-foreground hover:bg-white/20'}`}
            >
              <Heart size={24} className={isFavorite ? 'fill-current' : ''} />
            </button>
          </div>
        </div>

        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-foreground/50 font-ui">
            Himno {himno.numero}
          </span>
          <h1 className="font-ui text-3xl font-black text-primary-foreground mt-2 leading-tight tracking-tight">
            {himno.titulo}
          </h1>
        </div>
      </div>

      {/* Lyrics Content */}
      <div className="flex-1 overflow-y-auto px-8 pt-10 pb-32 scrollbar-thin">
        <div className="space-y-10">
          {himno.estrofas.map((estrofa, index) => {
            return (
              <div key={index} className="relative">
                <div
                  className="whitespace-pre-line font-hymn leading-relaxed text-hymn font-medium"
                  style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
                >
                  {estrofa.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {line.includes('**CORO**') ? (
                        <>
                          {line.split('**CORO**').map((part, j, arr) => (
                            <span key={j}>
                              {part}
                              {j < arr.length - 1 && (
                                <span className="inline-block font-black text-primary uppercase tracking-wider" style={{ fontSize: '1.1em' }}>
                                  CORO
                                </span>
                              )}
                            </span>
                          ))}
                        </>
                      ) : (
                        line
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center mb-10">
          <div className="h-1.5 w-12 bg-primary/20 rounded-full mx-auto" />
          <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 font-ui">
            Amén
          </p>
        </div>
      </div>
    </div>
  );
}
