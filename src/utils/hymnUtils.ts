import type { Himno } from '@/types/himno';

export const getHymnOfTheDay = (himnos: Himno[]): Himno => {
    if (himnos.length === 0) return {} as Himno;

    const today = new Date();
    // Create a seed based on the date (YYYYMMDD)
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    // Deterministic random selection based on seed
    const index = dateSeed % himnos.length;
    return himnos[index];
};
