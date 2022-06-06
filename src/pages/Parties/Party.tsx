import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PartyContext, PartyProvider } from '../../contexts/PartyContext';

export default function Party() {

  const { partyId } = useParams();
  const {fetchParty} = useContext(PartyContext)

  useEffect(() => {
    if (partyId) fetchParty(partyId)
	})
  
  return (
    <PartyProvider >
    <div>Party</div></PartyProvider>
  )
}
