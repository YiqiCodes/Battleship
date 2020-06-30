import React, { useState, useEffect } from "react";

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
  BoatSelectorButton,
} from "./Board.styles";

const Board = () => {
  const [started, gameStarted] = useState(false);

  // Human Boat States
  const [humanBoat, setHumanBoat] = useState();
  const [humanBoatTwo, setHumanBoatTwo] = useState();
  const [humanBoatThree, setHumanBoatThree] = useState();
  const [humanBoatFour, setHumanBoatFour] = useState();
  const [humanBoatFive, setHumanBoatFive] = useState();
  const [humanBoatActive, setHumanBoatActive] = useState(false);
  const [humanBoatTwoActive, setHumanBoatTwoActive] = useState(false);
  const [humanBoatThreeActive, setHumanBoatThreeActive] = useState(false);
  const [humanBoatFourActive, setHumanBoatFourActive] = useState(false);
  const [humanBoatFiveActive, setHumanBoatFiveActive] = useState(false);
  const [humanBoatsHit, setHumanBoatsHit] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  // Enemy Boat States
  const [enemyBoat, setEnemyBoat] = useState();
  const [enemyBoatTwo, setEnemyBoatTwo] = useState();
  const [enemyBoatThree, setEnemyBoatThree] = useState();
  const [enemyBoatFour, setEnemyBoatFour] = useState();
  const [enemyBoatFive, setEnemyBoatFive] = useState();
  const [enemyBoatRevealed, setEnemyBoatRevealed] = useState();
  const [enemyBoatRevealedTwo, setEnemyBoatRevealedTwo] = useState();
  const [enemyBoatRevealedThree, setEnemyBoatRevealedThree] = useState();
  const [enemyBoatRevealedFour, setEnemyBoatRevealedFour] = useState();
  const [enemyBoatRevealedFive, setEnemyBoatRevealedFive] = useState();
  const [enemyBoatsHit, setEnemyBoatsHit] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [attackPosition, setAttackPosition] = useState();
  const [squaresHumanAttacked, setSquaresHumanAttacked] = useState([]);
  const [squaresComputerAttacked, setSquaresComputerAttacked] = useState([]);
  const [humanWin, setHumanWin] = useState(false);
  const [computerWin, setComputerWin] = useState(false);

  useEffect(() => {
    checkHumanWin();
    checkComputerWin();
  });
  // Board Logic
  let board = [];
  for (let i = 1; i <= 100; i++) board.push(i);

  // NEED TO CHECK ALL BOATS ARE PLACED
  // Start the game && position Computer boat
  const startGame = () => {
    positionEnemyBoat();
    gameStarted(true);
  };

  // Human sets boat position
  const positionHumanBoat = (value) => {
    console.log("human 1:", value);
    setHumanBoatActive(true);
    setHumanBoatTwoActive(false);
    setHumanBoatThreeActive(false);
    setHumanBoatFourActive(false);
    setHumanBoatFiveActive(false);
    setHumanBoat(value);
  };

  const positionHumanBoatTwo = (value) => {
    console.log("human 2:", value);
    setHumanBoatActive(false);
    setHumanBoatTwoActive(true);
    setHumanBoatThreeActive(false);
    setHumanBoatFourActive(false);
    setHumanBoatFiveActive(false);
    setHumanBoatTwo(value);
  };
  const positionHumanBoatThree = (value) => {
    console.log("human 3:", value);
    setHumanBoatActive(false);
    setHumanBoatTwoActive(false);
    setHumanBoatThreeActive(true);
    setHumanBoatFourActive(false);
    setHumanBoatFiveActive(false);
    setHumanBoatThree(value);
  };
  const positionHumanBoatFour = (value) => {
    console.log("human 4:", value);
    setHumanBoatActive(false);
    setHumanBoatTwoActive(false);
    setHumanBoatThreeActive(false);
    setHumanBoatFourActive(true);
    setHumanBoatFiveActive(false);
    setHumanBoatFour(value);
  };
  const positionHumanBoatFive = (value) => {
    console.log("human 5:", value);
    setHumanBoatActive(false);
    setHumanBoatTwoActive(false);
    setHumanBoatThreeActive(false);
    setHumanBoatFourActive(false);
    setHumanBoatFiveActive(true);
    setHumanBoatFive(value);
  };

  // Randomly places enemy boat
  const positionEnemyBoat = () => {
    // NEED TO ENSURE CANNOT BE PLACED ONTO EACH OTHER

    const positionComputerBoat = Math.floor(Math.random() * 100) + 1;
    const positionComputerBoatTwo = Math.floor(Math.random() * 100) + 1;
    const positionComputerBoatThree = Math.floor(Math.random() * 100) + 1;
    const positionComputerBoatFour = Math.floor(Math.random() * 100) + 1;
    const positionComputerBoatFive = Math.floor(Math.random() * 100) + 1;
    setEnemyBoat(positionComputerBoat);
    setEnemyBoatTwo(positionComputerBoatTwo);
    setEnemyBoatThree(positionComputerBoatThree);
    setEnemyBoatFour(positionComputerBoatFour);
    setEnemyBoatFive(positionComputerBoatFive);
  };

  // Sets attack position & turns square red
  const attackComputer = (attackComputerBoat) => {
    // console.log("attack computer?", attackComputerBoat);
    if (squaresHumanAttacked.includes(attackComputerBoat)) {
      setAttackPosition(null);
    } else {
      setAttackPosition(attackComputerBoat);
    }
  };

  const finalizeAttack = (finalAttack) => {
    const humanTurn = () => {
      // Add to squares Human attacked
      setSquaresHumanAttacked([...squaresHumanAttacked, finalAttack]);
      console.log("squares human attacked:", squaresHumanAttacked);
      // Check if Human hit/win function
      if (finalAttack === enemyBoat) {
        console.log("HUMAN HIT!!");
        setEnemyBoatRevealed(enemyBoat);
        let updatedEnemyBoatsHit = [...enemyBoatsHit];
        updatedEnemyBoatsHit[0] = true;
        setEnemyBoatsHit(updatedEnemyBoatsHit);
      } else {
        console.log("HUMAN MISS");
      }

      if (finalAttack === enemyBoatTwo) {
        console.log("HUMAN HIT!!");
        setEnemyBoatRevealedTwo(enemyBoatTwo);
        let updatedEnemyBoatsHit = [...enemyBoatsHit];
        updatedEnemyBoatsHit[1] = true;
        setEnemyBoatsHit(updatedEnemyBoatsHit);
      } else {
        console.log("HUMAN MISS");
      }

      if (finalAttack === enemyBoatThree) {
        console.log("HUMAN HIT!!");
        setEnemyBoatRevealedThree(enemyBoatThree);
        let updatedEnemyBoatsHit = [...enemyBoatsHit];
        updatedEnemyBoatsHit[2] = true;
        setEnemyBoatsHit(updatedEnemyBoatsHit);
      } else {
        console.log("HUMAN MISS");
      }

      if (finalAttack === enemyBoatFour) {
        console.log("HUMAN HIT!!");
        setEnemyBoatRevealedFour(enemyBoatFour);
        let updatedEnemyBoatsHit = [...enemyBoatsHit];
        updatedEnemyBoatsHit[3] = true;
        setEnemyBoatsHit(updatedEnemyBoatsHit);
      } else {
        console.log("HUMAN MISS");
      }

      if (finalAttack === enemyBoatFive) {
        console.log("HUMAN HIT!!");
        setEnemyBoatRevealedFive(enemyBoatFive);
        let updatedEnemyBoatsHit = [...enemyBoatsHit];
        updatedEnemyBoatsHit[4] = true;
        setEnemyBoatsHit(updatedEnemyBoatsHit);
      } else {
        console.log("HUMAN MISS");
      }
    };

    const computerTurn = () => {
      // AI guess function
      const computerAttack = Math.floor(Math.random() * 100) + 1;
      // Cannot guess the same square
      if (squaresComputerAttacked.includes(computerAttack)) {
        computerTurn();
      } else {
        // Add to squares Computer attacked
        setSquaresComputerAttacked([
          ...squaresComputerAttacked,
          computerAttack,
        ]);
        console.log("squares computer attacked:", squaresComputerAttacked);
        // Check if Computer hit/win function
        if (computerAttack === humanBoat) {
          console.log("COMPUTER HIT!!");
          let updatedHumanBoatsHit = [...humanBoatsHit];
          updatedHumanBoatsHit[0] = true;
          setHumanBoatsHit(updatedHumanBoatsHit);
        } else {
          console.log("COMPUTER MISS");
        }
        if (computerAttack === humanBoatTwo) {
          console.log("COMPUTER HIT!!");
          let updatedHumanBoatsHit = [...humanBoatsHit];
          updatedHumanBoatsHit[1] = true;
          setHumanBoatsHit(updatedHumanBoatsHit);
        } else {
          console.log("COMPUTER MISS");
        }
        if (computerAttack === humanBoatThree) {
          console.log("COMPUTER HIT!!");
          let updatedHumanBoatsHit = [...humanBoatsHit];
          updatedHumanBoatsHit[2] = true;
          setHumanBoatsHit(updatedHumanBoatsHit);
        } else {
          console.log("COMPUTER MISS");
        }
        if (computerAttack === humanBoatFour) {
          console.log("COMPUTER HIT!!");
          let updatedHumanBoatsHit = [...humanBoatsHit];
          updatedHumanBoatsHit[3] = true;
          setHumanBoatsHit(updatedHumanBoatsHit);
        } else {
          console.log("COMPUTER MISS");
        }
        if (computerAttack === humanBoatFive) {
          console.log("COMPUTER HIT!!");
          let updatedHumanBoatsHit = [...humanBoatsHit];
          updatedHumanBoatsHit[4] = true;
          setHumanBoatsHit(updatedHumanBoatsHit);
        } else {
          console.log("COMPUTER MISS");
        }
      }
    };

    humanTurn();
    computerTurn();

    // Reset Attack Position
    setAttackPosition(null);
  };

  // Conditions for Human to Win
  const checkHumanWin = () => {
    if (
      enemyBoatsHit[0] === true &&
      enemyBoatsHit[1] === true &&
      enemyBoatsHit[2] === true &&
      enemyBoatsHit[3] === true &&
      enemyBoatsHit[4] === true
    ) {
      console.log("YOU WIN");
      setHumanWin(true);
    }
  };

  // Conditions for Computer to Win
  const checkComputerWin = () => {
    if (
      humanBoatsHit[0] === true &&
      humanBoatsHit[1] === true &&
      humanBoatsHit[2] === true &&
      humanBoatsHit[3] === true &&
      humanBoatsHit[4] === true
    ) {
      console.log("COMPUTER WIN");
      setComputerWin(true);
    }
  };

  const restartGame = () => {
    setHumanBoat(null);
    setHumanBoatTwo(null);
    setHumanBoatThree(null);
    setHumanBoatFour(null);
    setHumanBoatFive(null);
    setHumanBoatActive(null);
    setHumanBoatTwoActive(null);
    setHumanBoatThreeActive(null);
    setHumanBoatFourActive(null);
    setHumanBoatFiveActive(null);
    setHumanBoatsHit([false, false, false, false, false]);
    setEnemyBoat(null);
    setEnemyBoatTwo(null);
    setEnemyBoatThree(null);
    setEnemyBoatFour(null);
    setEnemyBoatFive(null);
    setEnemyBoatRevealed(null);
    setEnemyBoatRevealedTwo(null);
    setEnemyBoatRevealedThree(null);
    setEnemyBoatRevealedFour(null);
    setEnemyBoatRevealedFive(null);
    setEnemyBoatsHit([false, false, false, false, false]);
    setAttackPosition(null);
    setSquaresHumanAttacked([null]);
    setSquaresComputerAttacked([null]);
    gameStarted(false);
    setHumanWin(false);
    setComputerWin(false);
  };

  console.log("is game started??", started);
  // console.log("computer boat position", enemyBoat);
  // console.log("computer boat 2 position", enemyBoatTwo);
  // console.log("computer boat 3 position", enemyBoatThree);
  // console.log("computer boat 4 position", enemyBoatFour);
  // console.log("computer boat 5 position", enemyBoatFive);
  // console.log("human boat position", humanBoat);
  // console.log("enemy boat sunk?", enemyBoatsHit);
  console.log(
    "active?",
    humanBoatActive,
    humanBoatTwoActive,
    humanBoatThreeActive,
    humanBoatFourActive,
    humanBoatFiveActive
  );
  console.log(
    "human boats",
    humanBoat,
    humanBoatTwo,
    humanBoatThree,
    humanBoatFour,
    humanBoatFive
  );

  console.log("boats hit:", humanBoatsHit);
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
                // NEED TO SHOW IF YOUR BOAT IS HIT
                <Square
                  style={{
                    background:
                      humanBoat === boatPosition
                        ? "pink"
                        : humanBoatTwo === boatPosition
                        ? "blue"
                        : humanBoatThree === boatPosition
                        ? "cyan"
                        : humanBoatFour === boatPosition
                        ? "orange"
                        : humanBoatFive === boatPosition
                        ? "purple"
                        : squaresComputerAttacked.includes(boatPosition)
                        ? "#FF9387"
                        : computerWin === true
                        ? "#EBDD2F"
                        : "",
                  }}
                  value={boatPosition}
                  // Cannot click on human board if game is started
                  onClick={
                    !started && !humanWin && !computerWin && humanBoatActive
                      ? () => positionHumanBoat(boatPosition)
                      : !started &&
                        !humanWin &&
                        !computerWin &&
                        humanBoatTwoActive
                      ? () => positionHumanBoatTwo(boatPosition)
                      : !started &&
                        !humanWin &&
                        !computerWin &&
                        humanBoatThreeActive
                      ? () => positionHumanBoatThree(boatPosition)
                      : !started &&
                        !humanWin &&
                        !computerWin &&
                        humanBoatFourActive
                      ? () => positionHumanBoatFour(boatPosition)
                      : !started &&
                        !humanWin &&
                        !computerWin &&
                        humanBoatFiveActive
                      ? () => positionHumanBoatFive(boatPosition)
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
                        : enemyBoatRevealedTwo === computerBoatPosition
                        ? "green"
                        : enemyBoatRevealedThree === computerBoatPosition
                        ? "green"
                        : enemyBoatRevealedFour === computerBoatPosition
                        ? "green"
                        : enemyBoatRevealedFive === computerBoatPosition
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
            <>
              <StartGameButton onClick={() => startGame()}>
                Start
              </StartGameButton>
              <BoatSelectorButton onClick={() => positionHumanBoat()}>
                Boat 1
              </BoatSelectorButton>
              <BoatSelectorButton onClick={() => positionHumanBoatTwo()}>
                Boat 2
              </BoatSelectorButton>
              <BoatSelectorButton onClick={() => positionHumanBoatThree()}>
                Boat 3
              </BoatSelectorButton>
              <BoatSelectorButton onClick={() => positionHumanBoatFour()}>
                Boat 4
              </BoatSelectorButton>
              <BoatSelectorButton onClick={() => positionHumanBoatFive()}>
                Boat 5
              </BoatSelectorButton>
            </>
          ) : null}

          {started && !humanWin && !computerWin ? (
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
