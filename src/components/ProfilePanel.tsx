import { User, Heart, Calendar, ChevronRight, Library } from 'lucide-react';

interface ProfilePanelProps {
    onViewFavorites: () => void;
    onViewHistory: () => void;
    onViewCollections: () => void;
}

export default function ProfilePanel({ onViewFavorites, onViewHistory, onViewCollections }: ProfilePanelProps) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header */}
            <div className="bg-header-gradient px-6 pb-12 rounded-b-[3.5rem] safe-top relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex items-center justify-between pt-4">
                    <div className="flex items-center gap-5">
                        <div className="h-20 w-20 rounded-[2.2rem] bg-white/20 border-2 border-white/30 overflow-hidden flex items-center justify-center backdrop-blur-md shadow-2xl transition-transform hover:scale-105">
                            <User size={40} className="text-white" />
                        </div>
                        <div>
                            <h1 className="font-ui text-2xl font-black text-white leading-tight">
                                Mi Perfil
                            </h1>
                            <p className="text-sm text-white/70 font-ui font-medium">
                                Gestiona tu experiencia
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bento Menu Options */}
            <div className="mt-8 px-6 grid grid-cols-2 gap-4">
                <button
                    onClick={onViewFavorites}
                    className="flex flex-col gap-4 rounded-[2.5rem] bg-card p-6 card-shadow border border-white/5 active:scale-95 transition-transform"
                >
                    <div className="rounded-2xl bg-red-100 p-4 w-fit dark:bg-red-900/40">
                        <Heart size={28} className="text-red-500 fill-current" />
                    </div>
                    <div className="text-left mt-2">
                        <p className="font-ui font-extrabold text-lg text-foreground leading-tight">Mis<br />Favoritos</p>
                        <p className="text-[10px] text-muted-foreground font-ui mt-1 font-bold uppercase tracking-wider">Guardados</p>
                    </div>
                </button>

                <button
                    onClick={onViewHistory}
                    className="flex flex-col gap-4 rounded-[2.5rem] bg-card p-6 card-shadow border border-white/5 active:scale-95 transition-transform"
                >
                    <div className="rounded-2xl bg-blue-100 p-4 w-fit dark:bg-blue-900/40">
                        <Calendar size={28} className="text-blue-500" />
                    </div>
                    <div className="text-left mt-2">
                        <p className="font-ui font-extrabold text-lg text-foreground leading-tight">Día<br />a Día</p>
                        <p className="text-[10px] text-muted-foreground font-ui mt-1 font-bold uppercase tracking-wider">Historial</p>
                    </div>
                </button>

                <button
                    onClick={onViewCollections}
                    className="col-span-2 flex items-center gap-6 rounded-[2.5rem] bg-card p-6 card-shadow border border-white/5 active:scale-[0.98] transition-transform"
                >
                    <div className="rounded-2xl bg-amber-100 p-4 w-fit dark:bg-amber-900/40">
                        <Library size={28} className="text-amber-500" />
                    </div>
                    <div className="text-left">
                        <p className="font-ui font-extrabold text-xl text-foreground leading-tight">Colecciones</p>
                        <p className="text-[10px] text-muted-foreground font-ui mt-1 font-bold uppercase tracking-wider">Organiza por temas</p>
                    </div>
                    <ChevronRight size={24} className="ml-auto text-muted-foreground/30" />
                </button>
            </div>

            <div className="mt-12 px-8 text-center pb-24">
                <p className="text-xs text-muted-foreground/40 font-ui italic leading-relaxed">
                    "Alabadle con salterio y arpa. Alabadle con pandero y danza..."
                </p>
            </div>
        </div>
    );
}
