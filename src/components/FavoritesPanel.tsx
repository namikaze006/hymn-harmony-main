import { useMemo } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import type { Himno } from '@/types/himno';
import HymnCard from './HymnCard';

interface FavoritesPanelProps {
  himnos: Himno[];
  favorites: number[];
  isFavorite: (n: number) => boolean;
  onToggleFavorite: (n: number) => void;
  onSelectHymn: (h: Himno) => void;
  onBack: () => void;
}

export default function FavoritesPanel({ himnos, favorites, isFavorite, onToggleFavorite, onSelectHymn, onBack }: FavoritesPanelProps) {
  const favoriteHymns = useMemo(
    () => himnos.filter(h => favorites.includes(h.numero)).sort((a, b) => a.numero - b.numero),
    [himnos, favorites]
  );

  return (
    <div className="flex flex-col">
      <div className="bg-header-gradient px-5 pb-6 rounded-b-[2rem] safe-top">
        <div className="flex items-center gap-3 pt-4">
          <button onClick={onBack} className="rounded-full bg-primary-foreground/15 p-2 transition-colors hover:bg-primary-foreground/25">
            <ArrowLeft size={20} className="text-primary-foreground" />
          </button>
          <div>
            <h1 className="font-ui text-2xl font-extrabold text-primary-foreground">Favoritos</h1>
            <p className="mt-1 text-sm text-primary-foreground/80 font-ui">
              {favoriteHymns.length} {favoriteHymns.length === 1 ? 'himno guardado' : 'himnos guardados'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-24 scrollbar-thin">
        {favoriteHymns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-primary/10 p-5 mb-4">
              <Heart size={32} className="text-primary/50" />
            </div>
            <p className="text-sm font-semibold text-muted-foreground font-ui">Aún no tienes favoritos</p>
            <p className="mt-1 text-xs text-muted-foreground/60 font-ui">Toca el corazón en cualquier himno</p>
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteHymns.map(h => (
              <HymnCard
                key={h.numero}
                himno={h}
                isFavorite={isFavorite(h.numero)}
                onToggleFavorite={onToggleFavorite}
                onClick={() => onSelectHymn(h)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
