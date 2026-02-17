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
  }, [favorites]);

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
