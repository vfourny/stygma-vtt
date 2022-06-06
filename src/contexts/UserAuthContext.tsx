import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';

type UserAuthContextType={
  user:User|null,
  isLoading:boolean,
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
  const [isLoading,setIsLoading] = useState(true)

  // refaire les fcts firebase avec un retour promise et un throw error
  const signUp=(email:string,password:string)=> createUserWithEmailAndPassword(auth, email, password)
  const signIn=(email:string,password:string)=> signInWithEmailAndPassword(auth, email, password)
  const  signInWithGoogle=()=>{
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
  }
  const logOut = ()=>signOut(auth)

  const value:UserAuthContextType= {
    user,
    isLoading,
    signIn,
    signInWithGoogle,
    signUp,
    logOut
  }

  useEffect(()=>{
    // Listen  changes to the user's sign-in state.
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      console.log(currentUser)
      setUser(currentUser)
      setIsLoading(false)
    })
    // Remove listener on unmount
    return ()=> unsubscribe()
  },[])
  return <UserAuthContext.Provider value={value}>{props.children}</UserAuthContext.Provider>
}
