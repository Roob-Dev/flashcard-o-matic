import React from "react";

const Card = ({ card, handleDone, handleSubmit, handleChange, typeTitle }) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="shadow p-3 mb-5 bg-body rounded border border-dark"
      >
        <h2>{typeTitle}</h2>
        <div className="form-group">
          <label>Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            onChange={handleChange}
            type="text"
            value={card.front}
            required
          />
        </div>
        <div className="form-group">
          <label>Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            onChange={handleChange}
            type="text"
            value={card.back}
            required
          />
        </div>
        <button className="btn btn-secondary mx-1" onClick={() => handleDone()}>
          {typeTitle === "Edit Card" ? "Cancel" : "Done"}
        </button>
        <button className="btn btn-info mx-1" type="submit">
          {typeTitle === "Edit Card" ? "Submit" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default Card;
