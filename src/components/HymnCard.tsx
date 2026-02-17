import { Heart } from 'lucide-react';
import type { Himno } from '@/types/himno';

interface HymnCardProps {
  himno: Himno;
  isFavorite: boolean;
  onToggleFavorite: (numero: number) => void;
  onClick: () => void;
  snippet?: string;
}

export default function HymnCard({ himno, isFavorite, onToggleFavorite, onClick, snippet }: HymnCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-start gap-3.5 rounded-2xl bg-card p-4 text-left transition-all card-shadow hover:card-shadow-lg active:scale-[0.98]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-ui text-sm font-bold text-hymn-number">
        {himno.numero}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <h3 className="font-ui text-[15px] font-bold leading-tight text-foreground">
          {himno.titulo}
        </h3>
        {snippet && (
          <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground font-ui leading-relaxed">
            {snippet}
          </p>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(himno.numero);
        }}
        className="shrink-0 rounded-full p-1.5 transition-all hover:bg-muted"
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <Heart
          size={18}
          className={`transition-all ${isFavorite ? 'fill-current text-favorite-active scale-110' : 'text-muted-foreground'}`}
        />
      </button>
    </button>
  );
}
