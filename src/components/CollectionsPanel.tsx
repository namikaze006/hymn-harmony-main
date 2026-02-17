import { useState } from 'react';
import { ArrowLeft, Plus, Library, ChevronRight, Trash2, FolderPlus } from 'lucide-react';
import { useCollections, Collection } from '@/hooks/useCollections';

interface CollectionsPanelProps {
    onBack: () => void;
    onSelectCollection: (collection: Collection) => void;
}

export default function CollectionsPanel({ onBack, onSelectCollection }: CollectionsPanelProps) {
    const { collections, createCollection, deleteCollection } = useCollections();
    const [isCreating, setIsCreating] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');

    const handleCreate = () => {
        if (newCollectionName.trim()) {
            createCollection(newCollectionName.trim());
            setNewCollectionName('');
            setIsCreating(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-32">
            {/* Header */}
            <div className="bg-header-gradient px-6 pb-8 rounded-b-[3rem] safe-top relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="rounded-2xl bg-white/15 p-3 text-primary-foreground backdrop-blur-md transition-all hover:bg-white/20 border border-white/10"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="font-ui text-2xl font-black text-white leading-tight">Colecciones</h1>
                            <p className="text-sm text-white/70 font-ui font-medium">Tus listas personalizadas</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="rounded-2xl bg-white/15 p-3 text-primary-foreground backdrop-blur-md transition-all hover:bg-white/20 border border-white/10"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <div className="px-6 mt-8 flex-1">
                {isCreating && (
                    <div className="mb-6 animate-in slide-in-from-top duration-300">
                        <div className="bg-card p-6 rounded-[2.5rem] card-shadow border border-primary/20 bg-primary/5">
                            <h3 className="font-ui font-bold text-foreground mb-4">Nueva Colección</h3>
                            <input
                                autoFocus
                                type="text"
                                value={newCollectionName}
                                onChange={(e) => setNewCollectionName(e.target.value)}
                                placeholder="Nombre de la colección..."
                                className="w-full bg-background/50 rounded-2xl p-4 text-sm font-bold border-none ring-1 ring-white/10 focus:ring-2 focus:ring-primary/50 outline-none mb-4"
                                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCreate}
                                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/30"
                                >
                                    Crear
                                </button>
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="flex-1 bg-muted/50 text-muted-foreground py-3 rounded-2xl font-black text-xs uppercase tracking-widest"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {collections.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center glass-card rounded-[3rem]">
                        <div className="bg-amber-100/50 p-6 rounded-full mb-4 dark:bg-amber-900/20">
                            <FolderPlus size={32} className="text-amber-500" />
                        </div>
                        <p className="text-sm font-bold text-muted-foreground/70 font-ui max-w-[200px]">No tienes colecciones aún. Crea una para organizar tus himnos.</p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="mt-6 flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-primary/20"
                        >
                            <Plus size={14} /> Crear Primera
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {collections.map((c) => (
                            <div
                                key={c.id}
                                className="group relative flex items-center gap-5 bg-card p-5 rounded-[2.5rem] card-shadow border border-white/5 transition-all hover:scale-[1.02]"
                                onClick={() => onSelectCollection(c)}
                            >
                                <div className="rounded-2xl bg-amber-100 p-4 dark:bg-amber-900/40">
                                    <Library size={24} className="text-amber-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-ui font-black text-lg text-foreground truncate">{c.name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                                        {c.hymnNumbers.length} himnos{c.hymnNumbers.length === 1 ? '' : 's'}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm('¿Eliminar esta colección?')) deleteCollection(c.id);
                                    }}
                                    className="p-3 rounded-xl hover:bg-red-100 text-muted-foreground/30 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <ChevronRight size={20} className="text-muted-foreground/20" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
