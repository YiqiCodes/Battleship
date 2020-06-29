import React from "react";

// Styles
import { Square, BoardRow, BoardColumn } from "./Board.styles";

const Board = () => {
  // Board Logic
  const board = [];
  for (let row = 0; row < 10; row++) {
    board[row] = [];
  }

  const onClick = (value) => {
    console.log(value);
  };

  return (
    <>
      <BoardColumn>
        <BoardRow>
          {board.map((value, index) => {
            return (
              <Square value={index} onClick={() => onClick(index)}></Square>
            );
          })}
        </BoardRow>
        <BoardRow>
          {board.map((value, index) => {
            return (
              <Square
                value={10 + index}
                onClick={() => onClick(10 + index)}
              ></Square>
            );
          })}
        </BoardRow>
        <BoardRow>
          {board.map((value, index) => {
            return (
              <Square
                value={20 + index}
                onClick={() => onClick(20 + index)}
              ></Square>
            );
          })}
        </BoardRow>
        <BoardRow>
          {board.map((value, index) => {
            return (
              <Square
                value={30 + index}
                onClick={() => onClick(30 + index)}
              ></Square>
            );
          })}
        </BoardRow>
        <BoardRow>
          {board.map((value, index) => {
            return (
              <Square
                value={40 + index}
                onClick={() => onClick(40 + index)}
              ></Square>
            );
          })}
        </BoardRow>
        <BoardRow>
          {board.map((value, index) => {
            return (
              <Square
                value={50 + index}
                onClick={() => onClick(50 + index)}
              ></Square>
            );
          })}
        </BoardRow>
        <BoardRow>
          {board.map((value, index) => {
            return (
              <Square
                value={60 + index}
                onClick={() => onClick(60 + index)}
              ></Square>
            );
          })}
        </BoardRow>
        <BoardRow>
          {board.map((value, index) => {
            return (
              <Square
                value={70 + index}
                onClick={() => onClick(70 + index)}
              ></Square>
            );
          })}
        </BoardRow>
        <BoardRow>
          {board.map((value, index) => {
            return (
              <Square
                value={80 + index}
                onClick={() => onClick(80 + index)}
              ></Square>
            );
          })}
        </BoardRow>
        <BoardRow>
          {board.map((value, index) => {
            return (
              <Square
                value={90 + index}
                onClick={() => onClick(90 + index)}
              ></Square>
            );
          })}
        </BoardRow>
      </BoardColumn>
    </>
  );
};

export default Board;
