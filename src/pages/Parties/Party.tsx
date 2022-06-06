import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PartyContext } from '../../contexts/PartyContext';

const Party:React.FC = ()=> {
  const { partyId } = useParams();
  const {fetchParty} = useContext(PartyContext)

  useEffect(() => {
    if (partyId) fetchParty(partyId)
	})
  
  return (
    <div>Party</div>
  )
}

export default Party