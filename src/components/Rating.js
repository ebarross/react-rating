import React, { useCallback, useEffect, useState } from "react";
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
  onRate,
}) => {
  const [hovered, setHovered] = useState(null);
  const valueWithHover = hovered || value;

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        if (value >= steps) {
          onRate(value - steps);
        }
      } else if (event.key === "ArrowRight") {
        if (value <= 5 - steps) {
          onRate(value + steps);
        }
      }
    },
    [value]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Utility function to calculate if the mouse event happened on the left side of the target or the right side.
  const isLessThanHalf = (event) => {
    const { target } = event;
    const boundingClientRect = target.getBoundingClientRect();
    let mouseAt = event.clientX - boundingClientRect.left;
    mouseAt = Math.round(Math.abs(mouseAt));
    return mouseAt <= boundingClientRect.width / 2;
  };

  const handleMouseMove = (event) => {
    let value = parseInt(event.target.id);
    if (isLessThanHalf(event) && steps === 0.5) {
      value -= 0.5;
    }
    setHovered(value);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleSelect = (event) => {
    let value = parseInt(event.target.id);
    if (isLessThanHalf(event) && steps === 0.5) {
      value -= 0.5;
    }
    onRate(value);
  };

  const renderIcon = (index, icon) => {
    return (
      <img
        key={index}
        id={index}
        src={icon}
        className="rating-image"
        data-testid="rating-icon"
        alt="Rate"
        onClick={handleSelect}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    );
  };

  const renderSymbol = () => {
    const symbols = [];
    const filled = valueWithHover || 0;

    if (filled === 0) {
      for (let i = 1; i <= 5; i++) {
        symbols.push(renderIcon(i, emptyIcon));
      }
    } else {
      const filledFloor = Math.floor(filled);

      for (let i = 1; i <= filledFloor; i++) {
        symbols.push(renderIcon(i, filledIcon));
      }

      const rest = (filled * 10) % 10;

      if (rest !== 0) {
        symbols.push(renderIcon(filledFloor + 1, halfFilledIcon));
      }

      if (filled <= 4) {
        const start = rest ? 1 : 0;
        for (let i = filledFloor + start + 1; i <= 5; i++) {
          symbols.push(renderIcon(i, emptyIcon));
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
