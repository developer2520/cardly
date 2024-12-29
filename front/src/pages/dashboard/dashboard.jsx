import React, { useContext } from 'react';
import Layout from '../../components/layout/layout';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { OwnCardsContext } from '../../context/ownCardsContext';
import CardList from '../../components/cardsList/cardsList';

export default function Dashboard() {
  const { user, loading: userLoading, error: userError } = useContext(UserContext);
  const { ownCards, loading: cardsLoading, error: cardsError } = useContext(OwnCardsContext);

  if (userLoading || cardsLoading) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  if (userError) {
    return (
      <Layout>
        <h1>Error: {userError}</h1>
      </Layout>
    );
  }

  if (cardsError) {
    return (
      <Layout>
        <h1>Error: {cardsError}</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* <h1>Welcome, {user ? user.name : 'Guest'}</h1>
      <h2>Your Cards</h2>
      <div>
        {ownCards && ownCards.length > 0 ? ( // Safeguard against `ownCards` being null
          ownCards.map(card => (
            <div key={card._id}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <a href={card.link}>{card.link}</a>
            </div>
          ))
        ) : (
          <p>No cards found.</p>
        )}
      </div> */}

      <CardList />
    </Layout>
  );
}
