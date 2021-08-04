import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import Card from "./Card";

const AddCard = () => {
  const { deckId } = useParams();
  const history = useHistory();
  const initialState = {
    front: "",
    back: "",
  };

  const [newCard, setNewCard] = useState(initialState);
  const [deck, setDeck] = useState({ name: "" });

  useEffect(() => {
    const fetchData = async () => {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    };
    fetchData();
  }, [deckId]);

  function handleChange({ target }) {
    setNewCard({
      ...newCard,
      [target.name]: target.value,
    });
  }
  const typeTitle = `${deck.name}: Add Card`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createCard(
      deckId,
      { ...newCard },
      abortController.signal
    );
    setNewCard(initialState);
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
          <Link to={`/decks/${deckId}`}>{deck.name || ""}</Link>
        </li>
        <li className="breadcrumb-item active">Add Card</li>
      </ol>
      <Card
        card={newCard}
        handleDone={handleDone}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        typeTitle={typeTitle}
      />
    </div>
  );
};

export default AddCard;
