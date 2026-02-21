import { useState, useMemo } from 'react';
import { Search, Hash, Type, FileText, Moon, Sun, User, Music, Sparkles } from 'lucide-react';
import type { Himno } from '@/types/himno';
import { useHymnSearch } from '@/hooks/useHymnSearch';
import { getHymnOfTheDay } from '@/utils/hymnUtils';
import HymnCard from './HymnCard';

interface SearchPanelProps {
  himnos: Himno[];
  isFavorite: (numero: number) => boolean;
  onToggleFavorite: (numero: number) => void;
  onSelectHymn: (h: Himno) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const modes = [
  { id: 'titulo' as const, label: 'Título', icon: Type, placeholder: 'Buscar por título...' },
  { id: 'numero' as const, label: 'Número', icon: Hash, placeholder: 'Ingresa el número...' },
  { id: 'contenido' as const, label: 'Letra', icon: FileText, placeholder: 'Buscar en la letra...' },
];

export default function SearchPanel({ himnos, isFavorite, onToggleFavorite, onSelectHymn, theme, onToggleTheme }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<typeof modes[number]['id']>('titulo');

  const results = useHymnSearch(himnos, query, mode);
  const hymnOfTheDay = useMemo(() => getHymnOfTheDay(himnos), [himnos]);
  const inputType = mode === 'numero' ? 'number' : 'text';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header with modern greeting */}
      <div className="bg-header-gradient px-6 pb-12 rounded-b-[4rem] safe-top relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-accent/20 rounded-full blur-2xl opacity-20" />

        <div className="relative z-10 flex items-center justify-between pt-4 mb-10">
          <div className="flex flex-col">
            <h1 className="font-ui text-4xl font-black text-white tracking-tight">
              ¡Hola!
            </h1>
            <p className="text-sm font-medium text-white/60 font-ui mt-1">
              {himnos.length} himnos disponibles
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="rounded-2xl bg-white/10 p-3.5 text-white backdrop-blur-md hover:bg-white/20 border border-white/10 transition-all active:scale-95"
              aria-label="Cambiar tema"
            >
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            </button>
            <div className="h-14 w-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-xl transition-transform hover:scale-105 active:scale-95">
              <User size={26} className="text-white" />
            </div>
          </div>
        </div>

        {/* Start Phrase */}
        <div className="relative z-10 mb-5 px-1 text-center">
          <p className="text-lg font-black text-white/90 font-ui tracking-wide">
            ¿Por donde quieres empezar?
          </p>
        </div>

        {/* 1. Mode Buttons Container (Pill Style) */}
        <div className="relative z-10 bg-black/10 backdrop-blur-3xl rounded-[2.2rem] p-1.5 border border-white/10 mb-6 flex">
          {modes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setMode(id); setQuery(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${mode === id
                  ? 'bg-white text-primary shadow-xl scale-[1.02]'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
            >
              <Icon size={14} className={mode === id ? 'text-primary' : 'text-white/40'} />
              {label}
            </button>
          ))}
        </div>

        {/* 2. Disconnected Search Input Area - Highly Attractive */}
        <div className="relative z-10 group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search size={22} className="text-zinc-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type={inputType}
            inputMode={mode === 'numero' ? 'numeric' : 'text'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={modes.find(m => m.id === mode)?.placeholder}
            className="w-full rounded-[2.5rem] bg-white text-zinc-900 py-5 pl-16 pr-6 text-[15px] font-bold placeholder:text-zinc-400 focus:outline-none focus:ring-8 focus:ring-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all border-none"
          />
        </div>
      </div>

      {/* Results - Modern List */}
      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-28 scrollbar-hide">
        {query.trim() === '' ? (
          <div className="flex flex-col gap-10">
            {/* Bento Card: Himno del Día */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-3">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 font-ui">Inspiración del día</span>
              </div>
              <button
                onClick={() => onSelectHymn(hymnOfTheDay)}
                className="relative w-full overflow-hidden rounded-[3rem] bg-primary p-9 text-left transition-all shadow-[0_25px_45px_-12px_hsl(var(--primary)/0.45)] group active:scale-95"
              >
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-black text-white font-ui leading-tight mb-8">
                    {hymnOfTheDay.titulo}
                  </h2>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Elegido para ti</span>
                      <span className="text-sm font-black text-white font-ui">Himno {hymnOfTheDay.numero}</span>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-white text-primary flex items-center justify-center shadow-xl">
                      <Music size={26} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-muted/20 rounded-[3rem] border border-dashed border-muted-foreground/20">
            <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <FileText size={24} className="text-muted-foreground/30" />
            </div>
            <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">Sin coincidencias</p>
            <p className="text-xs text-muted-foreground/50 font-ui mt-2">Intenta simplificar tu búsqueda</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-3 mb-4">
              <span className="text-[11px] font-bold text-muted-foreground/60 tracking-wider">Mostrando {results.length} resultados</span>
            </div>
            {results.map(r => (
              <HymnCard
                key={r.himno.numero}
                himno={r.himno}
                isFavorite={isFavorite(r.himno.numero)}
                onToggleFavorite={onToggleFavorite}
                onClick={() => onSelectHymn(r.himno)}
                snippet={r.snippet}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
