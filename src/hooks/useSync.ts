import { useState, useEffect } from 'react';
import { auth, db, googleProvider, signInWithPopup, signOut, doc, setDoc, getDoc, onSnapshot } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export const useSync = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in", error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    const fetchUserData = async (collectionName: string) => {
        if (!user) return null;
        try {
            const docSnap = await getDoc(doc(db, "users", user.uid, collectionName, "data"));
            if (docSnap.exists()) {
                return docSnap.data().content;
            }
        } catch (error) {
            console.error(`Error fetching ${collectionName}`, error);
        }
        return null;
    };

    const syncData = async (collectionName: string, data: any) => {
        if (!user) return;
        try {
            await setDoc(doc(db, "users", user.uid, collectionName, "data"), {
                content: data,
                updatedAt: Date.now()
            });
        } catch (error) {
            console.error(`Error syncing ${collectionName}`, error);
        }
    };

    return { user, loading, login, logout, syncData, fetchUserData };
};
