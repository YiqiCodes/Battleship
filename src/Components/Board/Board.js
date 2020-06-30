import React, { useState, useEffect } from "react";

// Styles
import {
  Square,
  BoardContainer,
  BoardOutterContainer,
  StartGameButton,
  ShootButton,
} from "./Board.styles";

const Board = () => {
  const [started, gameStarted] = useState(false);
  const [boat, setBoat] = useState();
  const [enemyboat, setEnemyBoat] = useState();
  const [attackPosition, setAttackPosition] = useState();

  // Board Logic
  let board = [];
  for (let i = 1; i <= 100; i++) board.push(i);

  // Check if hit function

  // AI guess function

  // Start the game && position Computer boat
  const startGame = () => {
    positionEnemyBoat();
    gameStarted(true);
  };

  const positionHumanBoat = (value) => {
    setBoat(value);
  };

  const positionEnemyBoat = () => {
    const positionComputerBoat = Math.floor(Math.random() * 100) + 1;
    setEnemyBoat(positionComputerBoat);
  };

  const attackComputer = (computerBoatPosition) => {
    console.log("attack computer", computerBoatPosition);
    setAttackPosition(computerBoatPosition);
  };

  console.log("is game started??", started);
  console.log("computer boat position", enemyboat);
  console.log("human boat position", boat);

  return (
    <>
      {/* Human Board */}
      <BoardOutterContainer>
        <p>Your Board</p>
        <BoardContainer>
          {board.map((boatPosition) => {
            return (
              <Square
                style={{ background: boat === boatPosition ? "black" : "" }}
                value={boatPosition}
                // Cannot click on human board if game is started
                onClick={started ? null : () => positionHumanBoat(boatPosition)}
              ></Square>
            );
          })}
        </BoardContainer>
        <StartGameButton onClick={() => startGame()}>Start</StartGameButton>
      </BoardOutterContainer>
      {/* Computer Board */}
      <BoardOutterContainer>
        <p>Computer's Board</p>
        <BoardContainer>
          {board.map((computerBoatPosition) => {
            return (
              <Square
                style={{
                  background:
                    attackPosition === computerBoatPosition ? "red" : "",
                }}
                value={computerBoatPosition}
                // Can click on computer board if game is started
                onClick={
                  !started ? null : () => attackComputer(computerBoatPosition)
                }
              ></Square>
            );
          })}
        </BoardContainer>
        <ShootButton>Fire!</ShootButton>
      </BoardOutterContainer>
    </>
  );
};

export default Board;
