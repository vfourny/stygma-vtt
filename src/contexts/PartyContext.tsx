import { doc, getDoc } from 'firebase/firestore';
import { createContext, useState } from 'react';
import { firestore } from '../config/firebase';

type Party = {
  id:string,

}

type PartyContextType={
  party:Party|null,
  fetchParty:(documentId:string)=>void
}

type PartyProviderProps={
  children:JSX.Element
}

export const PartyContext = createContext<PartyContextType>({} as PartyContextType)

export function PartyProvider(props:PartyProviderProps){
  const [party,setParty] = useState<any|null>(null)
  // ajouter un isLoading

  const fetchParty = async (documentId:string)=>{
	 let partyDocRef = doc(firestore, 'parties', documentId)
   let party = await getDoc(partyDocRef);
   if(party) setParty(party.data())
  }
 
  const value:PartyContextType= {
    party,
    fetchParty
  }

  return <PartyContext.Provider value={value}>{props.children}</PartyContext.Provider>
}
