import { useMemo } from 'react';
import { ArrowLeft, Trash2, Library } from 'lucide-react';
import { Collection } from '@/hooks/useCollections';
import type { Himno } from '@/types/himno';
import HymnCard from './HymnCard';

interface CollectionDetailPanelProps {
    collection: Collection;
    himnos: Himno[];
    isFavorite: (n: number) => boolean;
    onToggleFavorite: (n: number) => void;
    onSelectHymn: (h: Himno) => void;
    onBack: () => void;
    onRemoveFromCollection: (collectionId: string, hymnNumber: number) => void;
}

export default function CollectionDetailPanel({
    collection,
    himnos,
    isFavorite,
    onToggleFavorite,
    onSelectHymn,
    onBack,
    onRemoveFromCollection
}: CollectionDetailPanelProps) {
    const collectionHymns = useMemo(() => {
        return himnos.filter(h => collection.hymnNumbers.includes(h.numero));
    }, [himnos, collection.hymnNumbers]);

    return (
        <div className="flex flex-col min-h-screen bg-background pb-32">
            {/* Header */}
            <div className="bg-header-gradient px-6 pb-8 rounded-b-[3rem] safe-top relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex items-center gap-3 pt-2">
                    <button
                        onClick={onBack}
                        className="rounded-2xl bg-white/15 p-3 text-primary-foreground backdrop-blur-md transition-all hover:bg-white/20 border border-white/10"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="font-ui text-2xl font-black text-white leading-tight truncate max-w-[200px]">{collection.name}</h1>
                        <p className="text-sm text-white/70 font-ui font-medium">Colección personal</p>
                    </div>
                    <div className="ml-auto bg-amber-100/20 p-3 rounded-2xl border border-white/10">
                        <Library size={24} className="text-white" />
                    </div>
                </div>
            </div>

            <div className="px-6 mt-8">
                {collectionHymns.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center glass-card rounded-[3rem]">
                        <p className="text-sm font-bold text-muted-foreground font-ui">Esta colección está vacía</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {collectionHymns.map(h => (
                            <div key={h.numero} className="relative group">
                                <HymnCard
                                    himno={h}
                                    isFavorite={isFavorite(h.numero)}
                                    onToggleFavorite={onToggleFavorite}
                                    onClick={() => onSelectHymn(h)}
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveFromCollection(collection.id, h.numero);
                                    }}
                                    className="absolute -right-2 top-1/2 -translate-y-1/2 p-3 bg-red-100 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110 active:scale-95 z-20"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
