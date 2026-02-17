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
      className="group relative flex w-full flex-col gap-2 rounded-[2rem] bg-card p-5 text-left transition-all card-shadow hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] border border-white/5 dark:bg-muted/30"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1 pr-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 font-ui">
            Himno {himno.numero}
          </span>
          <h3 className="font-ui text-base font-extrabold leading-snug text-foreground group-hover:text-primary transition-colors">
            {himno.titulo}
          </h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(himno.numero);
          }}
          className={`shrink-0 rounded-2xl p-2.5 transition-all ${isFavorite ? 'bg-favorite-active/10' : 'bg-muted hover:bg-muted/80'}`}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart
            size={18}
            className={`transition-all ${isFavorite ? 'fill-current text-favorite-active scale-110' : 'text-muted-foreground'}`}
          />
        </button>
      </div>

      {snippet && (
        <div className="mt-1 relative">
          <p className="line-clamp-2 text-xs italic text-muted-foreground/80 font-body leading-relaxed pl-3 border-l-2 border-primary/20">
            {snippet}
          </p>
        </div>
      )}
    </button>
  );
}
