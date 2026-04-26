import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { logout, setUser } from '@/entities/user';
import { auth, db } from '@/shared/lib/firebase';

function AuthListener({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Юзер залогінений
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                const userData = userDoc.exists() ? userDoc.data() : {};

                dispatch(setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: userData.displayName || user.displayName || user.email?.split('@')[0],
                }));
            } else {
                // Юзер вийшов
                dispatch(logout());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return children;
}

export default AuthListener;