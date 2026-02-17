import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'himnario-favoritos';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    // Notificar cambio (solo si no viene de una sincronización entrante)
    window.dispatchEvent(new CustomEvent('hymn-data-changed', { detail: { type: 'favorites', data: favorites } }));
  }, [favorites]);

  useEffect(() => {
    const handleExternalChange = (e: any) => {
      if (e.detail.type === 'favorites') {
        setFavorites(e.detail.data);
      }
    };
    window.addEventListener('hymn-data-changed', handleExternalChange);
    return () => window.removeEventListener('hymn-data-changed', handleExternalChange);
  }, []);

  const toggleFavorite = useCallback((numero: number) => {
    setFavorites(prev =>
      prev.includes(numero)
        ? prev.filter(n => n !== numero)
        : [...prev, numero]
    );
  }, []);

  const isFavorite = useCallback(
    (numero: number) => favorites.includes(numero),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
