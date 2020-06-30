import React, { useState } from "react";

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
  const [humanBoat, setHumanBoat] = useState();
  const [enemyBoat, setEnemyBoat] = useState();
  const [attackPosition, setAttackPosition] = useState();
  // const squaresHumanAttacked = [];
  // const squaresComputerAttacked = [];

  // Board Logic
  let board = [];
  for (let i = 1; i <= 100; i++) board.push(i);

  // Start the game && position Computer boat
  const startGame = () => {
    positionEnemyBoat();
    gameStarted(true);
  };

  const positionHumanBoat = (value) => {
    setHumanBoat(value);
  };

  const positionEnemyBoat = () => {
    const positionComputerBoat = Math.floor(Math.random() * 100) + 1;
    setEnemyBoat(positionComputerBoat);
  };

  const attackComputer = (computerBoatPosition) => {
    console.log("attack computer?", computerBoatPosition);
    setAttackPosition(computerBoatPosition);
  };

  const finalizeAttack = (finalAttack) => {
    console.log("attacked computer!", finalAttack);

    // Add to squares human attacked

    // Check if hit/win function
    if (finalAttack === enemyBoat) console.log("YOU WIN!!");

    // AI guess function

    // setAttackPosition(finalAttack);
  };

  console.log("is game started??", started);
  console.log("computer boat position", enemyBoat);
  console.log("human boat position", humanBoat);
  // console.log("squares human attacked", squaresHumanAttacked);
  // console.log("squares computer attacked", squaresComputerAttacked)

  return (
    <>
      {/* Human Board */}
      <BoardOutterContainer>
        <p>Your Board</p>
        <BoardContainer>
          {board.map((boatPosition) => {
            return (
              <Square
                style={{
                  background: humanBoat === boatPosition ? "black" : "",
                }}
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
                  started ? () => attackComputer(computerBoatPosition) : null
                }
              ></Square>
            );
          })}
        </BoardContainer>
        <ShootButton onClick={() => finalizeAttack(attackPosition)}>
          Fire!
        </ShootButton>
      </BoardOutterContainer>
    </>
  );
};

export default Board;
