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
  const [squaresHumanAttacked, setSquaresHumanAttacked] = useState([]);
  const [squaresComputerAttacked, setSquaresComputerAttacked] = useState([]);

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
    // Add to squares Human attacked
    setSquaresHumanAttacked([...squaresHumanAttacked, finalAttack]);
    console.log("squares human attacked:", squaresHumanAttacked);

    // AI guess function
    const computerAttack = Math.floor(Math.random() * 100) + 1;
    console.log("computer attacked", computerAttack);

    // Add to squares Computer attacked
    setSquaresComputerAttacked([...squaresComputerAttacked, computerAttack]);
    console.log("squares computer attacked:", squaresComputerAttacked);

    // Check if Human hit/win function
    if (finalAttack === enemyBoat) {
      console.log("YOU WIN!!");
    } else {
      console.log("HUMAN MISS");
    }

    // Check if Computer hit/win function
    if (computerAttack === humanBoat) {
      console.log("COMPUTER WINS!!");
    } else {
      console.log("COMPUTER MISS");
    }

    // Reset Attack Position
    setAttackPosition(null);
  };

  console.log("is game started??", started);
  console.log("computer boat position", enemyBoat);
  console.log("human boat position", humanBoat);

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
                  background:
                    humanBoat === boatPosition
                      ? "black"
                      : squaresComputerAttacked.includes(boatPosition)
                      ? "#dda91b"
                      : "",
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
                    attackPosition === computerBoatPosition
                      ? "red"
                      : squaresHumanAttacked.includes(computerBoatPosition)
                      ? "#dda91b"
                      : "",
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
