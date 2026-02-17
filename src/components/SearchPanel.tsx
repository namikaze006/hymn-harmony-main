import { useState } from 'react';
import { Search, Hash, Type, FileText, Moon, Sun } from 'lucide-react';
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
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-header-gradient px-5 pb-6 pt-8 rounded-b-[2rem]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70 font-ui">Himnario</p>
            <h1 className="font-ui text-2xl font-extrabold text-primary-foreground mt-0.5">Bautista</h1>
          </div>
          <button
            onClick={onToggleTheme}
            className="rounded-full bg-primary-foreground/15 p-2.5 text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary-foreground/25"
            aria-label="Cambiar tema"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
        <p className="mt-2 text-sm text-primary-foreground/80 font-ui">{himnos.length} himnos disponibles</p>

        {/* Search input inside header */}
        <div className="relative mt-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type={inputType}
            inputMode={mode === 'numero' ? 'numeric' : 'text'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={modes.find(m => m.id === mode)?.placeholder}
            className="w-full rounded-2xl bg-card py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-ui card-shadow"
          />
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2 px-5 py-4">
        {modes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setMode(id); setQuery(''); }}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all font-ui ${
              mode === id
                ? 'bg-primary text-primary-foreground card-shadow'
                : 'bg-card text-muted-foreground hover:text-foreground card-shadow'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-5 pb-24 scrollbar-thin">
        {query.trim() === '' ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-primary/10 p-5 mb-4">
              <Search size={32} className="text-primary/50" />
            </div>
            <p className="text-sm font-semibold text-muted-foreground font-ui">Escribe para buscar un himno</p>
            <p className="text-xs text-muted-foreground/60 font-ui mt-1">Por título, número o contenido</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm font-semibold text-muted-foreground font-ui">No se encontraron resultados</p>
          </div>
        ) : (
          <div className="space-y-3">
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
