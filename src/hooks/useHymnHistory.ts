import { useState, useEffect } from 'react';

export interface HistoryEntry {
    hymnNumber: number;
    hymnTitle: string;
    timestamp: number;
    action: 'sang' | 'favorite';
}

export const useHymnHistory = () => {
    const [history, setHistory] = useState<Record<string, HistoryEntry[]>>(() => {
        const saved = localStorage.getItem('hymn_history');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('hymn_history', JSON.stringify(history));
    }, [history]);

    const addHistoryEntry = (entry: Omit<HistoryEntry, 'timestamp'>) => {
        const today = new Date().toISOString().split('T')[0];
        const newEntry: HistoryEntry = {
            ...entry,
            timestamp: Date.now(),
        };

        setHistory(prev => {
            const dayEntries = prev[today] || [];
            // Check if already exists for this hymn and action today to avoid duplicates
            const exists = dayEntries.some(e => e.hymnNumber === entry.hymnNumber && e.action === entry.action);
            if (exists) return prev;

            return {
                ...prev,
                [today]: [...dayEntries, newEntry],
            };
        });
    };

    const getEntriesForDate = (date: string) => history[date] || [];

    const getHistoryDates = () => Object.keys(history);

    return {
        history,
        addHistoryEntry,
        getEntriesForDate,
        getHistoryDates,
    };
};
