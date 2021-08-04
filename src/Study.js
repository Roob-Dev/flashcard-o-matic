import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "./utils/api/index";

const Study = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [cardNumber, setCardNumber] = useState(1);
  const [front, isFront] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const abortController = new AbortController();
      const response = await readDeck(deckId, abortController.signal);

      setDeck(response);
      setCards(response.cards);
      return () => {
        abortController.abort();
      };
    };
    fetchData();
  }, [deckId]);

  const nextCard = (index, total) => {
    console.log(index);
    if (index < total) {
      setCardNumber(cardNumber + 1);
      isFront(true);
    } else {
      if (
        window.confirm(
          `Restart cards? Click 'cancel' to return to the home page`
        )
      ) {
        setCardNumber(1);
        isFront(true);
      } else {
        history.push("/");
      }
    }
  };

  const flipCard = () => {
    if (front) {
      isFront(false);
    } else {
      isFront(true);
    }
  };

  const showNextButton = (cards, index) => {
    if (front) {
      return null;
    } else {
      return (
        <button
          onClick={() => nextCard(index + 1, cards.length)}
          className="btn btn-primary mx-1"
        >
          Next
        </button>
      );
    }
  };

  const enoughCards = () => {
    return (
      <div className="card">
        {/* map through the cards array */}
        {cards.map((card, index) => {
          if (index === cardNumber - 1) {
            return (
              <div className="card-body" key={card.id}>
                <div className="card-title">
                  {`Card ${index + 1} of ${cards.length}`}
                </div>
                <div className="card-text">
                  {front ? card.front : card.back}
                </div>
                <button onClick={flipCard} className="btn btn-secondary mx-1">
                  Flip
                </button>
                {showNextButton(cards, index)}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  };

  const notEnoughCards = () => {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link
          to={`/decks/${deck.id}/cards/new`}
          className="btn btn-primary mx-1"
        >
          Add Cards
        </Link>
      </div>
    );
  };

  return (
    <div className="col-mb-7">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Study</li>
      </ol>
      <div>
        <h2>{`${deck.name}: Study`}</h2>
        <div className="shadow p-3 mb-5 bg-body rounded border border-dark">
          {cards.length === 0
            ? notEnoughCards()
            : cards.length > 2
            ? enoughCards()
            : notEnoughCards()}
        </div>
      </div>
    </div>
  );
};

export default Study;
