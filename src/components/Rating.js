import React from "react";
import "./Rating.css";

const defaultEmptyIcon = "/icons/stars/empty.svg";
const defaultHalfFilledIcon = "/icons/stars/half.svg";
const defaultFilledIcon = "/icons/stars/filled.svg";

const Rating = ({
  value = undefined,
  emptyIcon = defaultEmptyIcon,
  halfFilledIcon = defaultHalfFilledIcon,
  filledIcon = defaultFilledIcon,
  steps = 1,
}) => {
  // Utility function to calculate if the mouse event happened on the left side of the target or the right side.
  const isLessThanHalf = (event) => {
    const { target } = event;
    const boundingClientRect = target.getBoundingClientRect();
    let mouseAt = event.clientX - boundingClientRect.left;
    mouseAt = Math.round(Math.abs(mouseAt));
    return mouseAt <= boundingClientRect.width / 2;
  };

  const renderIcon = (icon) => {
    return (
      <img
        src={icon}
        className="rating-image"
        data-testid="rating-icon"
        alt="Rate"
      />
    );
  };

  const renderSymbol = () => {
    const symbols = [];
    const filled = value || 0;

    if (filled === 0) {
      for (let i = 1; i <= 5; i++) {
        symbols.push(renderIcon(emptyIcon));
      }
    } else {
      const filledFloor = Math.floor(filled);

      for (let i = 1; i <= filledFloor; i++) {
        symbols.push(renderIcon(filledIcon));
      }

      const rest = (filled * 10) % 10;

      if (rest !== 0) {
        symbols.push(renderIcon(halfFilledIcon));
      }

      if (filled <= 4) {
        for (let i = 1; i <= 5 - filledFloor; i++) {
          symbols.push(renderIcon(emptyIcon));
        }
      }
    }

    return symbols;
  };

  return (
    <div
      tabIndex="0"
      className="star-rating"
      data-testid="star-rating-container"
    >
      {renderSymbol()}
    </div>
  );
};

export default Rating;
