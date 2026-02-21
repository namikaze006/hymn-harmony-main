import { useState, useMemo } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Music, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHymnHistory, HistoryEntry } from '@/hooks/useHymnHistory';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday, startOfWeek, endOfWeek, addDays, subDays } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Himno } from '@/types/himno';

interface HistoryPanelProps {
    himnos: Himno[];
    onSelectHymn: (h: Himno) => void;
    onBack: () => void;
}

type ViewMode = 'day' | 'week' | 'month';

export default function HistoryPanel({ himnos, onSelectHymn, onBack }: HistoryPanelProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('month');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const { getHistoryDates, getEntriesForDate } = useHymnHistory();

    const historyDates = getHistoryDates();

    // Calendar Calculations
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
    const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const entries = getEntriesForDate(selectedDate);

    const handleHymnClick = (hymnNumber: number) => {
        const hymn = himnos.find(h => h.numero === hymnNumber);
        if (hymn) {
            onSelectHymn(hymn);
        }
    };

    const nextPeriod = () => {
        if (viewMode === 'month') setCurrentDate(addMonths(currentDate, 1));
        else if (viewMode === 'week') setCurrentDate(addDays(currentDate, 7));
        else setCurrentDate(addDays(currentDate, 1));
    };

    const prevPeriod = () => {
        if (viewMode === 'month') setCurrentDate(subMonths(currentDate, 1));
        else if (viewMode === 'week') setCurrentDate(subDays(currentDate, 7));
        else setCurrentDate(subDays(currentDate, 1));
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            {/* New Modern Header (Inspired by Image 2) */}
            <div className="px-6 pt-8 pb-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
                            <ArrowLeft size={24} className="text-foreground" />
                        </button>
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                            <Music size={24} className="text-primary" />
                        </div>
                    </div>
                </div>

                <div className="mb-6 px-1">
                    <p className="text-muted-foreground font-ui text-base font-medium capitalize">
                        {format(new Date(), 'EEEE', { locale: es })}
                    </p>
                    <h1 className="text-2xl font-black text-foreground font-ui tracking-tight capitalize">
                        {format(currentDate, 'MMMM yyyy', { locale: es })}
                    </h1>
                </div>

                {/* View Mode Switcher */}
                <div className="bg-muted/30 p-1 rounded-2xl flex items-center mb-8">
                    {(['day', 'week', 'month'] as ViewMode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === mode
                                ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {mode === 'day' ? 'Día' : mode === 'week' ? 'Semana' : 'Mes'}
                        </button>
                    ))}
                </div>

                {/* Horizontal Week View / Calendar Strip (Based on Image 2) */}
                {viewMode === 'week' && (
                    <div className="flex justify-between items-center mb-6 overflow-x-auto pb-4 scrollbar-hide">
                        {daysInWeek.map((day, i) => {
                            const dateStr = format(day, 'yyyy-MM-dd');
                            const isSelected = selectedDate === dateStr;
                            const hasActivity = historyDates.includes(dateStr);

                            return (
                                <button
                                    key={dateStr}
                                    onClick={() => setSelectedDate(dateStr)}
                                    className="flex flex-col items-center gap-2 min-w-[50px]"
                                >
                                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                                        {format(day, 'EEE', { locale: es }).slice(0, 3)}
                                    </span>
                                    <div className={`
                                       h-12 w-12 rounded-full flex items-center justify-center text-sm font-black transition-all relative
                                       ${isSelected
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                                            : 'bg-muted/40 text-muted-foreground hover:bg-muted'
                                        }
                                   `}>
                                        {format(day, 'd')}
                                        {hasActivity && !isSelected && (
                                            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400 border-2 border-background" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Month Grid View (Current Style, Integrated) */}
                {viewMode === 'month' && (
                    <div className="bg-card/40 rounded-[2rem] p-4 mb-6 border border-white/5">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-[11px] font-black uppercase tracking-wider text-muted-foreground/40">Vista Mensual</span>
                            <div className="flex gap-1">
                                <button onClick={prevPeriod} className="p-1.5 hover:bg-muted rounded-lg transition-colors"><ChevronLeft size={16} /></button>
                                <button onClick={nextPeriod} className="p-1.5 hover:bg-muted rounded-lg transition-colors"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => (
                                <span key={d} className="text-[9px] font-black text-muted-foreground/30">{d}</span>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: monthStart.getDay() }).map((_, i) => <div key={i} />)}
                            {daysInMonth.map(day => {
                                const dateStr = format(day, 'yyyy-MM-dd');
                                const isSelected = selectedDate === dateStr;
                                const hasActivity = historyDates.includes(dateStr);
                                return (
                                    <button
                                        key={dateStr}
                                        onClick={() => setSelectedDate(dateStr)}
                                        className={`
                                            aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all
                                            ${isSelected ? 'bg-primary text-white scale-105' : 'hover:bg-muted'}
                                            ${hasActivity && !isSelected ? 'text-primary' : ''}
                                        `}
                                    >
                                        {format(day, 'd')}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* List Header */}
            <div className="px-6 flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-foreground font-ui capitalize">
                    {format(new Date(selectedDate + 'T12:00:00'), "EEEE, d", { locale: es })}
                </h3>
                <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-widest">
                    {entries.length} Registros
                </span>
            </div>

            {/* Entries List (Clickable now) */}
            <div className="px-6 flex flex-col gap-4">
                {entries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/20 rounded-[2.5rem] border border-dashed border-muted-foreground/20">
                        <CalendarIcon size={40} className="text-muted-foreground/20 mb-3" />
                        <p className="text-sm font-bold text-muted-foreground/40 font-ui">Sin registros para este día</p>
                    </div>
                ) : (
                    entries.map((entry, i) => (
                        <button
                            key={i}
                            onClick={() => handleHymnClick(entry.hymnNumber)}
                            className="group relative flex items-center gap-5 bg-card p-5 rounded-[2rem] shadow-sm border border-white/5 active:scale-[0.98] transition-all text-left"
                        >
                            <div className={`
                                h-14 w-14 rounded-2xl flex items-center justify-center relative z-10
                                ${entry.action === 'sang' ? 'bg-primary/10 text-primary' : 'bg-red-50 text-red-500'}
                            `}>
                                {entry.action === 'sang' ? <Music size={24} /> : <Heart size={24} className="fill-current" />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 truncate">
                                        {entry.action === 'sang' ? 'Himno Cantado' : 'Nuevo Favorito'}
                                    </p>
                                    <span className="text-[10px] font-bold text-muted-foreground/30">
                                        {format(entry.timestamp, 'HH:mm')}
                                    </span>
                                </div>
                                <h4 className="text-base font-black text-foreground font-ui truncate group-hover:text-primary transition-colors">
                                    {entry.hymnNumber}. {entry.hymnTitle}
                                </h4>
                            </div>

                            <ChevronRight size={20} className="text-muted-foreground/20 group-hover:text-primary transition-colors" />
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
