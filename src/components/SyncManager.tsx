import { useEffect } from 'react';
import { useSync } from '@/hooks/useSync';

export const SyncManager = () => {
    const { user, syncData, fetchUserData } = useSync();

    useEffect(() => {
        if (!user) return;

        const performFullSync = async () => {
            // 1. PULL: Descargar lo que hay en la nube e integrarlo
            const cloudFavorites = await fetchUserData('favorites');
            const cloudHistory = await fetchUserData('history');
            const cloudCollections = await fetchUserData('collections');

            const localFavorites = JSON.parse(localStorage.getItem('himnario-favoritos') || '[]');
            const localHistory = JSON.parse(localStorage.getItem('hymn_history') || '{}');
            const localCollections = JSON.parse(localStorage.getItem('hymn_collections') || '[]');

            // Lógica de Mezcla (Merge) simple
            if (cloudFavorites) {
                const merged = Array.from(new Set([...localFavorites, ...cloudFavorites]));
                localStorage.setItem('himnario-favoritos', JSON.stringify(merged));
                // Notificar a los hooks locales que carguen la nueva data
                window.dispatchEvent(new CustomEvent('hymn-data-changed', { detail: { type: 'favorites', data: merged, skipSync: true } }));
            }

            if (cloudCollections) {
                localStorage.setItem('hymn_collections', JSON.stringify(cloudCollections));
                window.dispatchEvent(new CustomEvent('hymn-data-changed', { detail: { type: 'collections', data: cloudCollections, skipSync: true } }));
            }

            if (cloudHistory) {
                localStorage.setItem('hymn_history', JSON.stringify(cloudHistory));
                window.dispatchEvent(new CustomEvent('hymn-data-changed', { detail: { type: 'history', data: cloudHistory, skipSync: true } }));
            }

            // 2. PUSH: Una vez mezclado, asegurar que la nube tenga la versión más reciente
            // (Esto se dispara solo si hubo cambios significativos, pero por simplicidad
            // lo dejaremos al event listener para evitar bucles)
        };

        performFullSync();

        // 3. Escuchar cambios futuros para subirlos
        const handleDataChange = (event: any) => {
            // Evitar bucle infinito si el cambio vino de la propia nube (skipSync)
            if (event.detail?.skipSync) return;

            const { type, data } = event.detail;
            syncData(type, data);
        };

        window.addEventListener('hymn-data-changed', handleDataChange);
        return () => window.removeEventListener('hymn-data-changed', handleDataChange);
    }, [user]);

    return null;
};
