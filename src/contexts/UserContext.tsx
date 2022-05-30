import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';

type UserAuthContextType={
  user:User|null,
  signUp: (email:string,password:string) => Promise<UserCredential>
	signIn: (email:string,password:string) => Promise<UserCredential>
	signInWithGoogle: () => Promise<UserCredential>
	logOut: () => Promise<void>
}

type UserAuthProviderProps={
  children:JSX.Element
}

export const UserAuthContext = createContext<UserAuthContextType>({} as UserAuthContextType)

export function UserAuthProvider(props:UserAuthProviderProps){
  const [user,setUser] = useState<User|null>(null)
  const signUp=(email:string,password:string)=> createUserWithEmailAndPassword(auth, email, password)
  const signIn=(email:string,password:string)=> signInWithEmailAndPassword(auth, email, password)
  const  signInWithGoogle=()=>{
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
  }
  const logOut = ()=>signOut(auth)

  const value:UserAuthContextType= {
    user,
    signIn,
    signInWithGoogle,
    signUp,
    logOut
  }

  useEffect(()=>{
    // Listen  changes to the user's sign-in state.
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
    })
    // Remove listener on unmount
    return ()=> unsubscribe()
  },[])
  return <UserAuthContext.Provider value={value}>{props.children}</UserAuthContext.Provider>
}
