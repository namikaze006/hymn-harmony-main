import { useMemo } from 'react';
import type { Himno } from '@/types/himno';
import HymnCard from './HymnCard';

interface HymnIndexProps {
  himnos: Himno[];
  isFavorite: (n: number) => boolean;
  onToggleFavorite: (n: number) => void;
  onSelectHymn: (h: Himno) => void;
}

export default function HymnIndex({ himnos, isFavorite, onToggleFavorite, onSelectHymn }: HymnIndexProps) {
  const sorted = useMemo(() => [...himnos].sort((a, b) => a.numero - b.numero), [himnos]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header - Modernized */}
      <div className="bg-header-gradient px-6 pb-8 rounded-b-[3rem] safe-top relative overflow-hidden">
        {/* Abstract background circles */}
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-32 h-32 bg-accent/20 rounded-full blur-2xl" />

        <div className="relative z-10 pt-2">
          <h1 className="font-ui text-3xl font-extrabold text-primary-foreground tracking-tight">Índice</h1>
          <p className="mt-1 text-sm font-medium text-primary-foreground/70 font-ui">{himnos.length} canciones disponibles</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-28 scrollbar-thin">
        <div className="space-y-3">
          {sorted.map(h => (
            <HymnCard
              key={h.numero}
              himno={h}
              isFavorite={isFavorite(h.numero)}
              onToggleFavorite={onToggleFavorite}
              onClick={() => onSelectHymn(h)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
