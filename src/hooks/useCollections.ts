import { useState, useEffect } from 'react';

export interface Collection {
    id: string;
    name: string;
    hymnNumbers: number[];
}

export const useCollections = () => {
    const [collections, setCollections] = useState<Collection[]>(() => {
        const saved = localStorage.getItem('hymn_collections');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('hymn_collections', JSON.stringify(collections));
        window.dispatchEvent(new CustomEvent('hymn-data-changed', { detail: { type: 'collections', data: collections } }));
    }, [collections]);

    useEffect(() => {
        const handleExternalChange = (e: any) => {
            if (e.detail.type === 'collections') {
                setCollections(e.detail.data);
            }
        };
        window.addEventListener('hymn-data-changed', handleExternalChange);
        return () => window.removeEventListener('hymn-data-changed', handleExternalChange);
    }, []);

    const createCollection = (name: string) => {
        const newCollection: Collection = {
            id: Date.now().toString(),
            name,
            hymnNumbers: []
        };
        setCollections(prev => [...prev, newCollection]);
    };

    const deleteCollection = (id: string) => {
        setCollections(prev => prev.filter(c => c.id !== id));
    };

    const addToCollection = (collectionId: string, hymnNumber: number) => {
        setCollections(prev => prev.map(c => {
            if (c.id === collectionId && !c.hymnNumbers.includes(hymnNumber)) {
                return { ...c, hymnNumbers: [...c.hymnNumbers, hymnNumber] };
            }
            return c;
        }));
    };

    const removeFromCollection = (collectionId: string, hymnNumber: number) => {
        setCollections(prev => prev.map(c => {
            if (c.id === collectionId) {
                return { ...c, hymnNumbers: c.hymnNumbers.filter(n => n !== hymnNumber) };
            }
            return c;
        }));
    };

    const isHymnInCollection = (collectionId: string, hymnNumber: number) => {
        return collections.find(c => c.id === collectionId)?.hymnNumbers.includes(hymnNumber) ?? false;
    };

    return {
        collections,
        createCollection,
        deleteCollection,
        addToCollection,
        removeFromCollection,
        isHymnInCollection
    };
};
