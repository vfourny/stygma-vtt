import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firestore } from '../../config/firebase';
import { useSession } from '../../contexts/SessionContext';

type PartiesType = {
  id: string;
  name: string;
};

const Parties: React.FC = () => {
  const [parties, setParties] = useState<PartiesType[]>([]);
  const partiesCollectionRef = collection(firestore, 'parties');
  const navigate = useNavigate();
  const { logOut } = useSession();

  const handleClick = () => {
    logOut().then(() => navigate('/sign-in'));
  };

  //intégrer le code de fetching db dans /services
  const getParties = async () => {
    const data = await getDocs(partiesCollectionRef);
    setParties(data.docs.map((doc) => ({ ...(doc.data() as PartiesType), id: doc.id })));
  };

  useEffect(() => {
    getParties();
  });

  return (
    <div>
      <button onClick={handleClick}>Déconnexion</button>
      <ul>
        {parties.map((party) => (
          <li key={party.id}>
            <Link to={party.id}> {party.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Parties;
