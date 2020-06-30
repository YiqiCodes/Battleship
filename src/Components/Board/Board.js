import React, { useState } from "react";

// Styles
import {
  Square,
  BoardContainer,
  BoardTitleContainer,
  BoardOutterContainer,
  ButtonsContainer,
  StartGameButton,
  RestartGameButton,
  ShootButton,
} from "./Board.styles";

const Board = () => {
  const [started, gameStarted] = useState(false);
  const [humanBoat, setHumanBoat] = useState();
  const [enemyBoat, setEnemyBoat] = useState();
  const [enemyBoatRevealed, setEnemyBoatRevealed] = useState();
  const [attackPosition, setAttackPosition] = useState();
  const [squaresHumanAttacked, setSquaresHumanAttacked] = useState([]);
  const [squaresComputerAttacked, setSquaresComputerAttacked] = useState([]);
  const [humanWin, setHumanWin] = useState(false);
  const [computerWin, setComputerWin] = useState(false);

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
      setHumanWin(true);
      setEnemyBoatRevealed(enemyBoat);
    } else {
      console.log("HUMAN MISS");
    }

    // Check if Computer hit/win function
    if (computerAttack === humanBoat) {
      console.log("COMPUTER WINS!!");
      setComputerWin(true);
    } else {
      console.log("COMPUTER MISS");
    }

    // Reset Attack Position
    setAttackPosition(null);
  };

  const restartGame = () => {
    setHumanBoat(null);
    setEnemyBoat(null);
    setAttackPosition(null);
    setSquaresHumanAttacked([null]);
    setSquaresComputerAttacked([null]);
    gameStarted(false);
  };

  console.log("is game started??", started);
  console.log("computer boat position", enemyBoat);
  console.log("human boat position", humanBoat);

  return (
    <>
      <BoardOutterContainer>
        {/* Human Board */}
        <BoardTitleContainer>
          {humanWin ? (
            <p>Human Wins!</p>
          ) : computerWin ? (
            <p>Human Loses!</p>
          ) : (
            <p>Your Board</p>
          )}
          <BoardContainer>
            {board.map((boatPosition) => {
              return (
                <Square
                  style={{
                    background:
                      humanBoat === boatPosition
                        ? "green"
                        : squaresComputerAttacked.includes(boatPosition)
                        ? "#FF9387"
                        : computerWin === true
                        ? "#EBDD2F"
                        : "",
                  }}
                  value={boatPosition}
                  // Cannot click on human board if game is started
                  onClick={
                    !started && !humanWin && !computerWin
                      ? () => positionHumanBoat(boatPosition)
                      : null
                  }
                ></Square>
              );
            })}
          </BoardContainer>
        </BoardTitleContainer>

        {/* Computer Board */}
        <BoardTitleContainer>
          {computerWin ? (
            <p>Computer Wins!</p>
          ) : humanWin ? (
            <p>Computer Loses!</p>
          ) : (
            <p>Computer's Board</p>
          )}
          <BoardContainer>
            {board.map((computerBoatPosition) => {
              return (
                <Square
                  style={{
                    background:
                      attackPosition === computerBoatPosition
                        ? "red"
                        : enemyBoatRevealed === computerBoatPosition
                        ? "green"
                        : squaresHumanAttacked.includes(computerBoatPosition)
                        ? "#FF9387"
                        : humanWin === true
                        ? "#EBDD2F"
                        : "",
                  }}
                  value={computerBoatPosition}
                  // Can click on computer board if game is started
                  onClick={
                    started && !humanWin && !computerWin
                      ? () => attackComputer(computerBoatPosition)
                      : null
                  }
                ></Square>
              );
            })}
          </BoardContainer>
        </BoardTitleContainer>

        {/* Game Buttons */}
        <ButtonsContainer>
          {!started ? (
            <StartGameButton onClick={() => startGame()}>Start</StartGameButton>
          ) : null}
          {started ? (
            <ShootButton onClick={() => finalizeAttack(attackPosition)}>
              Fire!
            </ShootButton>
          ) : null}
          {started ? (
            <RestartGameButton onClick={() => restartGame()}>
              Play Again
            </RestartGameButton>
          ) : null}
        </ButtonsContainer>
      </BoardOutterContainer>
    </>
  );
};

export default Board;
