import { auth, db } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const authService = {
    login: (email, password) => signInWithEmailAndPassword(auth, email, password),

    register: async (email, password, displayName) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            email,
            displayName: displayName || null,
            createdAt: new Date().toISOString(),
        });
        return userCredential;
    },

    loginWithGoogle: async (isLogin) => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);

        if (!isLogin) {
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                createdAt: new Date().toISOString(),
            });
        }

        return userCredential;
    }
};