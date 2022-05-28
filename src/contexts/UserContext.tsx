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

type UserAuthContextProviderProps={
  children:JSX.Element
}

export const UserAuthContext = createContext<UserAuthContextType>()

export function UserAuthContextProvider(props:UserAuthContextProviderProps){
  const [user,setUser] = useState<User|null>(null)
  const signUp=(email:string,password:string)=>{
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn=(email:string,password:string)=>{
    return signInWithEmailAndPassword(auth, email, password)
  }

  const  signInWithGoogle=()=>{
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
  }

  const logOut = ()=>{
    return signOut(auth)
  }

  useEffect(()=>{
    // Listen  changes to the user's sign-in state.
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
    })
    // Remove listener on unmount
    return ()=> unsubscribe()
  },[])
  return <UserAuthContext.Provider value={{user,signUp,signIn,signInWithGoogle,logOut}}>{props.children}</UserAuthContext.Provider>
}
