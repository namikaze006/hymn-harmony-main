import { User, Heart, Calendar, ChevronRight, Library, LogOut, Cloud } from 'lucide-react';
import { useSync } from '@/hooks/useSync';

interface ProfilePanelProps {
    onViewFavorites: () => void;
    onViewHistory: () => void;
    onViewCollections: () => void;
}

export default function ProfilePanel({ onViewFavorites, onViewHistory, onViewCollections }: ProfilePanelProps) {
    const { user, login, logout } = useSync();

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header */}
            <div className="bg-header-gradient px-6 pb-12 rounded-b-[3.5rem] safe-top relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />

                <div className="relative z-10 flex items-center justify-between pt-4">
                    <div className="flex items-center gap-5">
                        <div className="h-20 w-20 rounded-[2.2rem] bg-white/20 border-2 border-white/30 overflow-hidden flex items-center justify-center backdrop-blur-md shadow-2xl transition-transform hover:scale-105">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || 'Usuario'} className="h-full w-full object-cover" />
                            ) : (
                                <User size={40} className="text-white" />
                            )}
                        </div>
                        <div>
                            <h1 className="font-ui text-2xl font-black text-white leading-tight">
                                {user ? `¡Hola, ${user.displayName?.split(' ')[0]}!` : 'Mi Perfil'}
                            </h1>
                            <p className="text-sm text-white/70 font-ui font-medium">
                                {user ? user.email : 'Sincroniza tu progreso'}
                            </p>
                        </div>
                    </div>
                    {user && (
                        <button
                            onClick={logout}
                            className="rounded-2xl bg-white/15 p-3 text-white backdrop-blur-md transition-all hover:bg-red-500/20 border border-white/10"
                            title="Cerrar sesión"
                        >
                            <LogOut size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Cloud Sync Status / Login */}
            <div className="px-6 -mt-6 relative z-20">
                {!user ? (
                    <button
                        onClick={login}
                        className="w-full flex items-center justify-center gap-3 bg-white text-primary rounded-[2rem] p-5 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/10"
                    >
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <Cloud size={20} className="text-primary" />
                        </div>
                        <span className="font-ui font-black text-sm uppercase tracking-widest">Sincronizar con Google</span>
                    </button>
                ) : (
                    <div className="w-full flex items-center justify-between bg-white/90 dark:bg-card/90 backdrop-blur-md rounded-[2rem] p-5 shadow-xl border border-white/20 dark:border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground font-ui">Estado: Sincronizado</span>
                        </div>
                        <Cloud size={16} className="text-primary" />
                    </div>
                )}
            </div>

            {/* Bento Menu Options */}
            <div className="mt-8 px-6 grid grid-cols-2 gap-4">
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

                <button
                    onClick={onViewCollections}
                    className="col-span-2 flex items-center gap-6 rounded-[2.5rem] bg-card p-6 transition-all hover:scale-[1.02] active:scale-[0.98] card-shadow border border-white/5"
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
