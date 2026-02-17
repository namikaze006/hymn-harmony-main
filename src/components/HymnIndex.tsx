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
    <div className="flex flex-col">
      <div className="px-5 pb-4 pt-8">
        <h1 className="font-ui text-2xl font-extrabold text-foreground">Índice</h1>
        <p className="mt-1 text-sm text-muted-foreground font-ui">{himnos.length} himnos</p>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-24 scrollbar-thin">
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
