import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, functions } from '../config/firebase';

type SessionContextType = {
  user: User | null;
  isLoadingUser: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential | void>;
  signIn: (email: string, password: string) => Promise<UserCredential | void>;
  signInWithGoogle: () => Promise<UserCredential | void>;
  logOut: () => Promise<void>;
};

type SessionProviderProps = {
  children: JSX.Element;
};

const noOp = async () => {};

const SessionContext = createContext<SessionContextType>({
  user: null,
  isLoadingUser: false,
  signUp: noOp,
  signIn: noOp,
  signInWithGoogle: noOp,
  logOut: noOp,
});

export const useSession = () => {
  return useContext(SessionContext);
};

export function SessionProvider(props: SessionProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoadingUser(true);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const createFirestoreUser = httpsCallable(functions, 'createFirestoreUser');
      createFirestoreUser({ email });
      return user;
    } catch (error: any) {
      setIsLoadingUser(false);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoadingUser(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setIsLoadingUser(false);
      throw error;
    }
  };

  const signInWithGoogle = () => {
    try {
      setIsLoadingUser(true);
      const googleAuthProvider = new GoogleAuthProvider();
      return signInWithPopup(auth, googleAuthProvider);
    } catch (error: any) {
      setIsLoadingUser(false);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      setIsLoadingUser(true);
      await signOut(auth);
    } catch (error: any) {
      setIsLoadingUser(false);
      throw error;
    }
  };

  useEffect(() => {
    // Listen  changes to the user's sign-in state.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoadingUser(false);
    });
    // Remove listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        user,
        isLoadingUser,
        signIn,
        signInWithGoogle,
        signUp,
        logOut,
      }}
    >
      {!isLoadingUser && props.children}
    </SessionContext.Provider>
  );
}
