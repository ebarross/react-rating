import React, { useState } from "react";
import "./App.css";
import "h8k-components";
import Rating from "./components/Rating";

const title = "Rating Component";

const App = () => {
  const [ratingValue, setRatingValue] = useState(3);

  const handleRate = (value) => {
    if (value === ratingValue) {
      setRatingValue(0);
    } else {
      setRatingValue(value);
    }
  };

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>

      <div className="flex align-items-center justify-content-center container">
        <div className="card pa-16">
          <Rating value={ratingValue} onRate={handleRate} />
        </div>
      </div>
    </div>
  );
};

export default App;
