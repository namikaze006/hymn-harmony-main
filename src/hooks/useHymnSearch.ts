import { useMemo } from 'react';
import type { Himno, SearchResult } from '@/types/himno';

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getSnippet(text: string, query: string, contextLen = 60): string {
  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);
  const idx = normalizedText.indexOf(normalizedQuery);
  if (idx === -1) return '';
  
  const start = Math.max(0, idx - contextLen);
  const end = Math.min(text.length, idx + query.length + contextLen);
  
  let snippet = '';
  if (start > 0) snippet += '...';
  snippet += text.slice(start, end).trim();
  if (end < text.length) snippet += '...';
  
  return snippet;
}

export function useHymnSearch(himnos: Himno[], query: string, searchType: 'titulo' | 'contenido' | 'numero'): SearchResult[] {
  return useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    if (searchType === 'numero') {
      const num = parseInt(trimmed, 10);
      if (isNaN(num)) return [];
      const found = himnos.filter(h => h.numero === num);
      return found.map(h => ({ himno: h, matchType: 'numero' as const }));
    }

    if (searchType === 'titulo') {
      const normalized = normalizeText(trimmed);
      return himnos
        .filter(h => normalizeText(h.titulo).includes(normalized))
        .map(h => ({ himno: h, matchType: 'titulo' as const }));
    }

    // Content search
    const normalized = normalizeText(trimmed);
    const results: SearchResult[] = [];
    
    for (const h of himnos) {
      // Search in estrofas first
      for (const estrofa of h.estrofas) {
        if (normalizeText(estrofa).includes(normalized)) {
          results.push({
            himno: h,
            snippet: getSnippet(estrofa, trimmed),
            matchType: 'contenido',
          });
          break;
        }
      }
      // If not found in estrofas, check contenido
      if (!results.find(r => r.himno.numero === h.numero)) {
        if (normalizeText(h.contenido).includes(normalized)) {
          results.push({
            himno: h,
            snippet: getSnippet(h.contenido, trimmed),
            matchType: 'contenido',
          });
        }
      }
    }
    
    return results;
  }, [himnos, query, searchType]);
}
