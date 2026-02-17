import { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Music, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHymnHistory, HistoryEntry } from '@/hooks/useHymnHistory';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

interface HistoryPanelProps {
    onBack: () => void;
}

export default function HistoryPanel({ onBack }: HistoryPanelProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const { getHistoryDates, getEntriesForDate } = useHymnHistory();

    const historyDates = getHistoryDates();

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const entries = selectedDate ? getEntriesForDate(selectedDate) : [];

    return (
        <div className="flex flex-col min-h-screen bg-background pb-24">
            {/* Header */}
            <div className="bg-header-gradient px-5 pb-6 rounded-b-[2rem] safe-top">
                <div className="flex items-center gap-3 pt-4">
                    <button onClick={onBack} className="rounded-full bg-primary-foreground/15 p-2 transition-colors hover:bg-primary-foreground/25">
                        <ArrowLeft size={20} className="text-primary-foreground" />
                    </button>
                    <div>
                        <h1 className="font-ui text-2xl font-extrabold text-primary-foreground">Día a Día</h1>
                        <p className="text-sm text-primary-foreground/80 font-ui">Tu historial espiritual</p>
                    </div>
                </div>
            </div>

            <div className="px-6 mt-6">
                {/* Calendar Card - Modernized */}
                <div className="bg-card/70 backdrop-blur-xl rounded-[2.5rem] p-6 card-shadow border border-white/20 dark:border-white/5 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-ui text-xl font-extrabold text-foreground capitalize tracking-tight">
                            {format(currentDate, 'MMMM yyyy', { locale: es })}
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={prevMonth} className="p-3 rounded-2xl bg-muted/50 hover:bg-muted transition-all">
                                <ChevronLeft size={18} className="text-foreground" />
                            </button>
                            <button onClick={nextMonth} className="p-3 rounded-2xl bg-muted/50 hover:bg-muted transition-all">
                                <ChevronRight size={18} className="text-foreground" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => (
                            <div key={day} className="text-center text-[10px] font-black text-muted-foreground/40 py-2 uppercase tracking-widest">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                            <div key={`empty-${i}`} />
                        ))}

                        {daysInMonth.map(day => {
                            const dateStr = format(day, 'yyyy-MM-dd');
                            const hasActivity = historyDates.includes(dateStr);
                            const isSelected = selectedDate === dateStr;

                            return (
                                <button
                                    key={dateStr}
                                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                                    className={`
                    relative flex aspect-square items-center justify-center rounded-2xl text-sm font-bold transition-all duration-300
                    ${isSelected ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110 z-10' : 'hover:bg-muted'}
                    ${hasActivity && !isSelected ? 'text-primary font-black' : ''}
                    ${isToday(day) && !isSelected ? 'text-accent font-black' : ''}
                  `}
                                >
                                    {format(day, 'd')}
                                    {hasActivity && !isSelected && (
                                        <span className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Selected Day Details - Bento Style Cards */}
                <div className="mt-10 pb-20">
                    <div className="flex items-center justify-between px-2 mb-6">
                        <h3 className="font-ui text-xl font-extrabold text-foreground tracking-tight">
                            {selectedDate
                                ? format(new Date(selectedDate + 'T12:00:00'), "EEEE, d", { locale: es })
                                : 'Actividad'}
                        </h3>
                        {selectedDate && (
                            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-widest">
                                {entries.length} registros
                            </span>
                        )}
                    </div>

                    <div className="space-y-4">
                        {!selectedDate ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-[3rem]">
                                <div className="bg-primary/5 p-6 rounded-full mb-4">
                                    <CalendarIcon size={32} className="text-primary/30" />
                                </div>
                                <p className="text-sm font-bold text-muted-foreground/70 font-ui max-w-[180px]">Selecciona un día con actividad para ver detalles</p>
                            </div>
                        ) : entries.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-[3rem]">
                                <p className="text-sm font-bold text-muted-foreground font-ui">Sin actividad este día</p>
                            </div>
                        ) : (
                            entries.map((entry, i) => (
                                <div key={i} className="group flex items-center gap-5 bg-card p-5 rounded-[2rem] card-shadow border border-white/5 transition-all hover:scale-[1.02]">
                                    <div className={`p-4 rounded-2xl ${entry.action === 'sang' ? 'bg-primary text-primary-foreground' : 'bg-favorite-active text-primary-foreground'} shadow-lg`}>
                                        {entry.action === 'sang' ? <Music size={24} /> : <Heart size={24} className="fill-current" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                                {entry.action === 'sang' ? 'Himno Cantado' : 'Nuevo Favorito'}
                                            </p>
                                            <p className="text-[10px] font-bold text-muted-foreground/40">
                                                {format(entry.timestamp, 'HH:mm')}
                                            </p>
                                        </div>
                                        <p className="text-[15px] font-extrabold text-foreground font-ui leading-snug group-hover:text-primary transition-colors">
                                            {entry.hymnNumber}. {entry.hymnTitle}
                                        </p>
                                    </div>
                                    <ChevronRight size={18} className="text-muted-foreground/30" />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
