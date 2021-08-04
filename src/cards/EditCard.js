import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import Card from "./Card";

const EditCard = () => {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };
  const initialCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [card, setCard] = useState(initialDeckState);
  const [deck, setDeck] = useState(initialCardState);

  useEffect(() => {
    const fetchData = async () => {
      const abortController = new AbortController();
      try {
        const cardResponse = await readCard(cardId, abortController.signal);
        const deckResponse = await readDeck(deckId, abortController.signal);
        setCard(cardResponse);
        setDeck(deckResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    };
    fetchData();
  }, [cardId, deckId]);

  const typeTitle = "Edit Card";

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateCard({ ...card }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  };

  const handleDone = async () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Edit Card {cardId}</li>
      </ol>
      <Card
        card={card}
        handleDone={handleDone}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        typeTitle={typeTitle}
      />
    </div>
  );
};

export default EditCard;