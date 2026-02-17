import { useState } from 'react';
import { ArrowLeft, Heart, Minus, Plus, Sun } from 'lucide-react';
import type { Himno } from '@/types/himno';
import { useWakeLock } from '@/hooks/useWakeLock';

interface HymnViewProps {
  himno: Himno;
  isFavorite: boolean;
  onToggleFavorite: (numero: number) => void;
  onBack: () => void;
}

export default function HymnView({ himno, isFavorite, onToggleFavorite, onBack }: HymnViewProps) {
  const [fontSize, setFontSize] = useState(18);
  const { isActive: wakeLockActive, toggle: toggleWakeLock } = useWakeLock();

  const decreaseFontSize = () => setFontSize(s => Math.max(14, s - 2));
  const increaseFontSize = () => setFontSize(s => Math.min(32, s + 2));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-header-gradient rounded-b-[1.5rem]">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3.5">
          <button onClick={onBack} className="rounded-full bg-primary-foreground/15 p-2 transition-colors hover:bg-primary-foreground/25" aria-label="Volver">
            <ArrowLeft size={20} className="text-primary-foreground" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-primary-foreground/70 font-ui">Himno {himno.numero}</p>
            <h1 className="truncate font-ui text-base font-extrabold text-primary-foreground">{himno.titulo}</h1>
          </div>
          <button
            onClick={() => onToggleFavorite(himno.numero)}
            className="rounded-full bg-primary-foreground/15 p-2 transition-colors hover:bg-primary-foreground/25"
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Heart size={20} className={isFavorite ? 'fill-current text-red-300' : 'text-primary-foreground/80'} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 py-8 scrollbar-thin">
        <div className="mx-auto max-w-lg space-y-7">
          {himno.estrofas.map((estrofa, i) => (
            <div key={i}>
              {i > 0 && (
                <div className="mx-auto mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 border-verse border-t" />
                  <span className="text-xs font-bold text-muted-foreground/50 font-ui">{i + 1}</span>
                  <div className="h-px flex-1 border-verse border-t" />
                </div>
              )}
              <p
                className="whitespace-pre-line font-hymn leading-relaxed text-hymn"
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
              >
                {estrofa}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Font size controls */}
      <div className="sticky bottom-0 bg-card/95 backdrop-blur-lg safe-bottom">
        <div className="mx-auto flex max-w-lg items-center justify-between px-5 py-3">
          <div className="flex items-center gap-1">
            <button onClick={decreaseFontSize} className="rounded-full p-2.5 transition-colors hover:bg-muted" aria-label="Reducir tamaño">
              <Minus size={16} className="text-foreground" />
            </button>
            <span className="w-10 text-center text-xs font-bold text-muted-foreground font-ui">{fontSize}</span>
            <button onClick={increaseFontSize} className="rounded-full p-2.5 transition-colors hover:bg-muted" aria-label="Aumentar tamaño">
              <Plus size={16} className="text-foreground" />
            </button>
          </div>

          <input
            type="range"
            min={14}
            max={32}
            step={1}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="mx-4 h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />

          <button
            onClick={toggleWakeLock}
            className={`rounded-full p-2.5 transition-all ${wakeLockActive ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
            aria-label="Modo lectura"
            title="Mantener pantalla encendida"
          >
            <Sun size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
