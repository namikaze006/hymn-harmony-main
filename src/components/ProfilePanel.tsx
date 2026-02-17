import { User, Heart, Calendar, ChevronRight } from 'lucide-react';

interface ProfilePanelProps {
    onViewFavorites: () => void;
    onViewHistory: () => void;
}

export default function ProfilePanel({ onViewFavorites, onViewHistory }: ProfilePanelProps) {
    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="bg-header-gradient px-5 pb-8 rounded-b-[2rem] safe-top">
                <div className="flex items-center gap-4 pt-4">
                    <div className="rounded-full bg-primary-foreground/20 p-4 backdrop-blur-md">
                        <User size={32} className="text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="font-ui text-2xl font-extrabold text-primary-foreground">Mi Perfil</h1>
                        <p className="text-sm text-primary-foreground/80 font-ui">Gestiona tu actividad</p>
                    </div>
                </div>
            </div>

            {/* Bento Menu Options */}
            <div className="mt-10 px-6 grid grid-cols-2 gap-4">
                <button
                    onClick={onViewFavorites}
                    className="flex flex-col gap-4 rounded-[2.5rem] bg-card p-6 transition-all hover:scale-[1.05] active:scale-[0.95] card-shadow border border-white/5"
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
                    className="flex flex-col gap-4 rounded-[2.5rem] bg-card p-6 transition-all hover:scale-[1.05] active:scale-[0.95] card-shadow border border-white/5"
                >
                    <div className="rounded-2xl bg-blue-100 p-4 w-fit dark:bg-blue-900/40">
                        <Calendar size={28} className="text-blue-500" />
                    </div>
                    <div className="text-left mt-2">
                        <p className="font-ui font-extrabold text-lg text-foreground leading-tight">Día<br />a Día</p>
                        <p className="text-[10px] text-muted-foreground font-ui mt-1 font-bold uppercase tracking-wider">Historial</p>
                    </div>
                </button>
            </div>

            <div className="mt-12 px-8 text-center">
                <p className="text-xs text-muted-foreground/40 font-ui italic">
                    "Alabadle con salterio y arpa. Alabadle con pandero y danza..."
                </p>
            </div>
        </div>
    );
}
