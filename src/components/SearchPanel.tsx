import { useState } from 'react';
import { Search, Hash, Type, FileText, Moon, Sun, User } from 'lucide-react';
import type { Himno } from '@/types/himno';
import { useHymnSearch } from '@/hooks/useHymnSearch';
import HymnCard from './HymnCard';

type SearchMode = 'titulo' | 'numero' | 'contenido';

interface SearchPanelProps {
  himnos: Himno[];
  isFavorite: (n: number) => boolean;
  onToggleFavorite: (n: number) => void;
  onSelectHymn: (h: Himno) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const modes: { id: SearchMode; label: string; icon: typeof Search; placeholder: string }[] = [
  { id: 'titulo', label: 'Título', icon: Type, placeholder: 'Buscar por título...' },
  { id: 'numero', label: 'Número', icon: Hash, placeholder: 'Número del himno...' },
  { id: 'contenido', label: 'Letra', icon: FileText, placeholder: 'Buscar en la letra...' },
];

export default function SearchPanel({ himnos, isFavorite, onToggleFavorite, onSelectHymn, theme, onToggleTheme }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<SearchMode>('titulo');

  const results = useHymnSearch(himnos, query, mode);
  const inputType = mode === 'numero' ? 'number' : 'text';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header with modern greeting */}
      <div className="bg-header-gradient px-6 pb-8 rounded-b-[3rem] safe-top relative overflow-hidden">
        {/* Abstract background circles */}
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-32 h-32 bg-accent/20 rounded-full blur-2xl" />

        <div className="relative z-10 flex items-center justify-between pt-2">
          <div className="flex flex-col gap-0.5">
            <h1 className="font-ui text-3xl font-extrabold text-primary-foreground tracking-tight">
              ¡Hola!
            </h1>
            <p className="text-sm font-medium text-primary-foreground/70 font-ui">
              {himnos.length} himnos para alabar hoy
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="rounded-2xl bg-white/15 p-3 text-primary-foreground backdrop-blur-md transition-all hover:bg-white/20 border border-white/10"
              aria-label="Cambiar tema"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="h-12 w-12 rounded-2xl bg-accent/20 border border-white/20 flex items-center justify-center backdrop-blur-md">
              <User size={24} className="text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Search input - Bento Style */}
        <div className="relative mt-8 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type={inputType}
            inputMode={mode === 'numero' ? 'numeric' : 'text'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={modes.find(m => m.id === mode)?.placeholder}
            className="w-full rounded-[2rem] bg-card/95 py-4 pl-12 pr-5 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-4 focus:ring-primary/20 font-ui shadow-2xl transition-all border border-transparent"
          />
        </div>
      </div>

      {/* Mode tabs - Modern Pills */}
      <div className="flex gap-3 px-6 py-6 overflow-x-auto scrollbar-hide">
        {modes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setMode(id); setQuery(''); }}
            className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all font-ui whitespace-nowrap shadow-sm ${mode === id
                ? 'bg-primary text-primary-foreground card-shadow scale-105'
                : 'bg-card text-muted-foreground hover:bg-muted border border-white/5'
              }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Results - Modern List */}
      <div className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-thin">
        {query.trim() === '' ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-[2.5rem] bg-primary/5 p-8 mb-6 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-xl animate-pulse" />
              <Search size={40} className="text-primary/40 relative z-10" />
            </div>
            <h2 className="text-lg font-extrabold text-foreground font-ui">Encuentra tu himno</h2>
            <p className="text-sm text-muted-foreground font-ui mt-1 max-w-[200px]">Ingresa un título, número o parte de la letra</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-[3rem]">
            <p className="text-sm font-bold text-muted-foreground font-ui">Sin resultados</p>
            <p className="text-xs text-muted-foreground/60 font-ui mt-1">Prueba con otras palabras clave</p>
          </div>
        ) : (
          <div className="space-y-4">
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
