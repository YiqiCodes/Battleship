import React, { useEffect, useState } from "react";

// Styles
import { Square, BoardRow } from "./Board.styles";

const Board = () => {
  const [boat, setBoat] = useState();

  useEffect(() => {
    checkBoat();
  });

  // Check boat
  const checkBoat = () => {};

  // Board Logic
  let board = [];
  for (let i = 1; i <= 100; i++) board.push(i);

  const onClick = (value) => {
    setBoat(value);
  };

  return (
    <>
      <BoardRow>
        {board.map((squareposition) => {
          return (
            <Square
              style={{ background: boat === squareposition ? "black" : "" }}
              value={squareposition}
              onClick={() => onClick(squareposition)}
            ></Square>
          );
        })}
      </BoardRow>
    </>
  );
};

export default Board;
