import React, { useState, useEffect } from "react";

// Styles
import {
  Square,
  BoardContainer,
  BoardTitlesContainer,
  BoardTitleContainer,
  BoardOutterContainer,
  ButtonsContainer,
  StartGameButton,
  RestartGameButton,
  ShootButton,
  BoatSelectorButton,
  PlaceBoatsDiv,
  BoatsDiv,
  DifficultyDiv,
  SettingsDiv,
  RightSideButtonsDiv,
  RightSideContainer,
  NotificationsBoard,
  NotificationItems,
  BoardTitle,
} from "./Board.styles";

const Board = () => {
  const [started, gameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [hardIsHit, setHardIsHit] = useState([false, "", null, null]);
  const [impossibleTracker, setImpossibleTracker] = useState(0);
  const [humanBoats, setHumanBoats] = useState([
    {
      destroyer: {
        position: [null, null],
        revealed: [null, null],
        active: false,
        rotated: false,
        isHit: [null, null],
        isSunk: false,
      },
    },
    {
      submarine: {
        position: [null, null],
        revealed: [null, null],
        active: false,
        rotated: false,
        isHit: [null, null],
        isSunk: false,
      },
    },
    {
      cruiser: {
        position: [null, null, null],
        revealed: [null, null, null],
        active: false,
        rotated: false,
        isHit: [null, null, null],
        isSunk: false,
      },
    },
    {
      battleship: {
        position: [null, null, null, null],
        revealed: [null, null, null, null],
        active: false,
        rotated: false,
        isHit: [null, null, null, null],
        isSunk: false,
      },
    },
    {
      carrier: {
        position: [null, null, null, null, null],
        revealed: [null, null, null, null, null],
        active: false,
        rotated: false,
        isHit: [null, null, null, null, null],
        isSunk: false,
      },
    },
  ]);
  const [computerBoats, setComputerBoats] = useState([
    {
      destroyer: {
        position: [null, null],
        revealed: [null, null],
        isHit: [false, false],
        isSunk: false,
      },
    },
    {
      submarine: {
        position: [null, null],
        revealed: [null, null],
        isHit: [false, false],
        isSunk: false,
      },
    },
    {
      cruiser: {
        position: [null, null, null],
        revealed: [null, null, null],
        isHit: [false, false, false],
        isSunk: false,
      },
    },
    {
      battleship: {
        position: [null, null, null, null],
        revealed: [null, null, null, null],
        isHit: [false, false, false, false],
        isSunk: false,
      },
    },
    {
      carrier: {
        position: [null, null, null, null, null],
        revealed: [null, null, null, null, null],
        isHit: [false, false, false, false, false],
        isSunk: false,
      },
    },
  ]);
  const [attackPosition, setAttackPosition] = useState();
  const [squaresHumanAttacked, setSquaresHumanAttacked] = useState([]);
  const [squaresComputerAttacked, setSquaresComputerAttacked] = useState([]);
  const [humanWin, setHumanWin] = useState(false);
  const [computerWin, setComputerWin] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    checkHumanWin();
    checkComputerWin();
  });

  // Board Logic
  let board = [];
  for (let i = 1; i <= 100; i++) board.push(i);

  const startGame = () => {
    let difficultyDisplay;

    if (difficulty === 1) difficultyDisplay = "Difficulty: Easy";
    if (difficulty === 2) difficultyDisplay = "Difficulty: Hard";
    if (difficulty === 3) difficultyDisplay = "Difficulty: Impossible";

    setNotifications([
      ...notifications,
      "Game has started!",
      difficultyDisplay,
    ]);
    positionComputerBoat();
    gameStarted(true);
  };

  // Start the game && position Computer boat
  const checkHumanBoats = () => {
    let duplicate = false;
    let duplicateChecker = humanBoats[0].destroyer.position.concat(
      humanBoats[1].submarine.position,
      humanBoats[2].cruiser.position,
      humanBoats[3].battleship.position,
      humanBoats[4].carrier.position
    );

    duplicateChecker.sort((a, b) => a - b);

    for (let i = 0; i < duplicateChecker.length - 1; i++) {
      if (duplicateChecker[i + 1] === duplicateChecker[i]) duplicate = true;
    }

    if (duplicate === true) {
    } else {
      startGame();
    }
  };

  // Human sets boat position
  const positionHumanBoatDestroyer = (position) => {
    let activeHumanBoats = [...humanBoats];
    activeHumanBoats[0].destroyer.active = true;
    activeHumanBoats[1].submarine.active = false;
    activeHumanBoats[2].cruiser.active = false;
    activeHumanBoats[3].battleship.active = false;
    activeHumanBoats[4].carrier.active = false;
    activeHumanBoats[0].destroyer.position[0] = position;

    if (
      activeHumanBoats[0].destroyer.rotated === false ||
      activeHumanBoats[0].destroyer.rotated === 0
    ) {
      if (position <= 90) {
        activeHumanBoats[0].destroyer.position[1] = position + 10;
      } else {
        activeHumanBoats[0].destroyer.position[1] = position - 10;
      }
    }
    if (activeHumanBoats[0].destroyer.rotated === 1) {
      if (activeHumanBoats[0].destroyer.position.toString()[1] === "0") {
        activeHumanBoats[0].destroyer.position[1] = position - 1;
      } else {
        activeHumanBoats[0].destroyer.position[1] = position + 1;
      }
    }

    setHumanBoats(activeHumanBoats);
  };

  const positionHumanBoatSubmarine = (position) => {
    let activeHumanBoats = [...humanBoats];
    activeHumanBoats[0].destroyer.active = false;
    activeHumanBoats[1].submarine.active = true;
    activeHumanBoats[2].cruiser.active = false;
    activeHumanBoats[3].battleship.active = false;
    activeHumanBoats[4].carrier.active = false;
    activeHumanBoats[1].submarine.position[0] = position;

    if (
      activeHumanBoats[1].submarine.rotated === false ||
      activeHumanBoats[1].submarine.rotated === 0
    ) {
      if (position <= 90) {
        activeHumanBoats[1].submarine.position[1] = position + 10;
      } else {
        activeHumanBoats[1].submarine.position[1] = position - 10;
      }
    }
    if (activeHumanBoats[1].submarine.rotated === 1) {
      if (activeHumanBoats[1].submarine.position.toString()[1] === "0") {
        activeHumanBoats[1].submarine.position[1] = position - 1;
      } else {
        activeHumanBoats[1].submarine.position[1] = position + 1;
      }
    }

    setHumanBoats(activeHumanBoats);
  };

  const positionHumanBoatCruiser = (position) => {
    let activeHumanBoats = [...humanBoats];
    activeHumanBoats[0].destroyer.active = false;
    activeHumanBoats[1].submarine.active = false;
    activeHumanBoats[2].cruiser.active = true;
    activeHumanBoats[3].battleship.active = false;
    activeHumanBoats[4].carrier.active = false;
    activeHumanBoats[2].cruiser.position[0] = position;

    if (
      activeHumanBoats[2].cruiser.rotated === false ||
      activeHumanBoats[2].cruiser.rotated === 0
    ) {
      if (position <= 80) {
        activeHumanBoats[2].cruiser.position[1] = position + 10;
        activeHumanBoats[2].cruiser.position[2] = position + 20;
      } else if (position > 80 && position <= 90) {
        activeHumanBoats[2].cruiser.position[1] = position + 10;
        activeHumanBoats[2].cruiser.position[2] = position - 10;
      } else {
        activeHumanBoats[2].cruiser.position[1] = position - 10;
        activeHumanBoats[2].cruiser.position[2] = position - 20;
      }
    }

    if (activeHumanBoats[2].cruiser.rotated === 1) {
      if (activeHumanBoats[2].cruiser.position.toString()[1] === "0") {
        activeHumanBoats[2].cruiser.position[1] = position - 1;
        activeHumanBoats[2].cruiser.position[2] = position - 2;
      } else if (
        activeHumanBoats[2].cruiser.position.toString()[1] === "9" ||
        activeHumanBoats[2].cruiser.position[0] === 9
      ) {
        activeHumanBoats[2].cruiser.position[1] = position + 1;
        activeHumanBoats[2].cruiser.position[2] = position - 1;
      } else {
        activeHumanBoats[2].cruiser.position[1] = position + 1;
        activeHumanBoats[2].cruiser.position[2] = position + 2;
      }
    }
    setHumanBoats(activeHumanBoats);
  };

  const positionHumanBoatBattleship = (position) => {
    let activeHumanBoats = [...humanBoats];
    activeHumanBoats[0].destroyer.active = false;
    activeHumanBoats[1].submarine.active = false;
    activeHumanBoats[2].cruiser.active = false;
    activeHumanBoats[3].battleship.active = true;
    activeHumanBoats[4].carrier.active = false;
    activeHumanBoats[3].battleship.position[0] = position;
    if (
      activeHumanBoats[3].battleship.rotated === false ||
      activeHumanBoats[3].battleship.rotated === 0
    ) {
      if (position <= 70) {
        activeHumanBoats[3].battleship.position[1] = position + 10;
        activeHumanBoats[3].battleship.position[2] = position + 20;
        activeHumanBoats[3].battleship.position[3] = position + 30;
      } else if (position > 70 && position <= 80) {
        activeHumanBoats[3].battleship.position[1] = position + 10;
        activeHumanBoats[3].battleship.position[2] = position + 20;
        activeHumanBoats[3].battleship.position[3] = position - 10;
      } else if (position > 80 && position <= 90) {
        activeHumanBoats[3].battleship.position[1] = position + 10;
        activeHumanBoats[3].battleship.position[2] = position - 10;
        activeHumanBoats[3].battleship.position[3] = position - 20;
      } else {
        activeHumanBoats[3].battleship.position[1] = position - 10;
        activeHumanBoats[3].battleship.position[2] = position - 20;
        activeHumanBoats[3].battleship.position[3] = position - 30;
      }
    }

    if (activeHumanBoats[3].battleship.rotated === 1) {
      if (activeHumanBoats[3].battleship.position.toString()[1] === "0") {
        activeHumanBoats[3].battleship.position[1] = position - 1;
        activeHumanBoats[3].battleship.position[2] = position - 2;
        activeHumanBoats[3].battleship.position[3] = position - 3;
      } else if (
        activeHumanBoats[3].battleship.position.toString()[1] === "9" ||
        activeHumanBoats[3].battleship.position[0] === 9
      ) {
        activeHumanBoats[3].battleship.position[1] = position + 1;
        activeHumanBoats[3].battleship.position[2] = position - 1;
        activeHumanBoats[3].battleship.position[3] = position - 2;
      } else if (
        activeHumanBoats[3].battleship.position.toString()[1] === "8" ||
        activeHumanBoats[3].battleship.position[0] === 8
      ) {
        activeHumanBoats[3].battleship.position[1] = position + 1;
        activeHumanBoats[3].battleship.position[2] = position + 2;
        activeHumanBoats[3].battleship.position[3] = position - 1;
      } else {
        activeHumanBoats[3].battleship.position[1] = position + 1;
        activeHumanBoats[3].battleship.position[2] = position + 2;
        activeHumanBoats[3].battleship.position[3] = position + 3;
      }
    }
    setHumanBoats(activeHumanBoats);
  };

  const positionHumanBoatCarrier = (position) => {
    let activeHumanBoats = [...humanBoats];
    activeHumanBoats[0].destroyer.active = false;
    activeHumanBoats[1].submarine.active = false;
    activeHumanBoats[2].cruiser.active = false;
    activeHumanBoats[3].battleship.active = false;
    activeHumanBoats[4].carrier.active = true;
    activeHumanBoats[4].carrier.position[0] = position;
    if (
      activeHumanBoats[4].carrier.rotated === false ||
      activeHumanBoats[4].carrier.rotated === 0
    ) {
      if (position <= 60) {
        activeHumanBoats[4].carrier.position[1] = position + 10;
        activeHumanBoats[4].carrier.position[2] = position + 20;
        activeHumanBoats[4].carrier.position[3] = position + 30;
        activeHumanBoats[4].carrier.position[4] = position + 40;
      } else if (position > 60 && position <= 70) {
        activeHumanBoats[4].carrier.position[1] = position + 10;
        activeHumanBoats[4].carrier.position[2] = position + 20;
        activeHumanBoats[4].carrier.position[3] = position + 30;
        activeHumanBoats[4].carrier.position[4] = position - 10;
      } else if (position > 70 && position <= 80) {
        activeHumanBoats[4].carrier.position[1] = position + 10;
        activeHumanBoats[4].carrier.position[2] = position + 20;
        activeHumanBoats[4].carrier.position[3] = position - 10;
        activeHumanBoats[4].carrier.position[4] = position - 20;
      } else if (position > 80 && position <= 90) {
        activeHumanBoats[4].carrier.position[1] = position + 10;
        activeHumanBoats[4].carrier.position[2] = position - 10;
        activeHumanBoats[4].carrier.position[3] = position - 20;
        activeHumanBoats[4].carrier.position[4] = position - 30;
      } else {
        activeHumanBoats[4].carrier.position[1] = position - 10;
        activeHumanBoats[4].carrier.position[2] = position - 20;
        activeHumanBoats[4].carrier.position[3] = position - 30;
        activeHumanBoats[4].carrier.position[4] = position - 40;
      }
    }
    if (activeHumanBoats[4].carrier.rotated === 1) {
      if (activeHumanBoats[4].carrier.position.toString()[1] === "0") {
        activeHumanBoats[4].carrier.position[1] = position - 1;
        activeHumanBoats[4].carrier.position[2] = position - 2;
        activeHumanBoats[4].carrier.position[3] = position - 3;
        activeHumanBoats[4].carrier.position[4] = position - 4;
      } else if (
        activeHumanBoats[4].carrier.position.toString()[1] === "9" ||
        activeHumanBoats[4].carrier.position[0] === 9
      ) {
        activeHumanBoats[4].carrier.position[1] = position + 1;
        activeHumanBoats[4].carrier.position[2] = position - 1;
        activeHumanBoats[4].carrier.position[3] = position - 2;
        activeHumanBoats[4].carrier.position[4] = position - 3;
      } else if (
        activeHumanBoats[4].carrier.position.toString()[1] === "8" ||
        activeHumanBoats[4].carrier.position[0] === 8
      ) {
        activeHumanBoats[4].carrier.position[1] = position + 1;
        activeHumanBoats[4].carrier.position[2] = position + 2;
        activeHumanBoats[4].carrier.position[3] = position - 1;
        activeHumanBoats[4].carrier.position[4] = position - 2;
      } else if (
        activeHumanBoats[4].carrier.position.toString()[1] === "7" ||
        activeHumanBoats[4].carrier.position[0] === 7
      ) {
        activeHumanBoats[4].carrier.position[1] = position + 1;
        activeHumanBoats[4].carrier.position[2] = position + 2;
        activeHumanBoats[4].carrier.position[3] = position + 3;
        activeHumanBoats[4].carrier.position[4] = position - 1;
      } else {
        activeHumanBoats[4].carrier.position[1] = position + 1;
        activeHumanBoats[4].carrier.position[2] = position + 2;
        activeHumanBoats[4].carrier.position[3] = position + 3;
        activeHumanBoats[4].carrier.position[4] = position + 4;
      }
    }
    setHumanBoats(activeHumanBoats);
  };

  // Human Boat can be vertical or horizontal
  const rotateHumanBoat = () => {
    if (humanBoats[0].destroyer.active) {
      humanBoats[0].destroyer.rotated ^= true;
      humanBoats[1].submarine.rotated = false;
      humanBoats[2].cruiser.rotated = false;
      humanBoats[3].battleship.rotated = false;
      humanBoats[4].carrier.rotated = false;
      positionHumanBoatDestroyer(humanBoats[0].destroyer.position[0]);
    }
    if (humanBoats[1].submarine.active) {
      humanBoats[0].destroyer.rotated = false;
      humanBoats[1].submarine.rotated ^= true;
      humanBoats[2].cruiser.rotated = false;
      humanBoats[3].battleship.rotated = false;
      humanBoats[4].carrier.rotated = false;
      positionHumanBoatSubmarine(humanBoats[1].submarine.position[0]);
    }
    if (humanBoats[2].cruiser.active) {
      humanBoats[0].destroyer.rotated = false;
      humanBoats[1].submarine.rotated = false;
      humanBoats[2].cruiser.rotated ^= true;
      humanBoats[3].battleship.rotated = false;
      humanBoats[4].carrier.rotated = false;
      positionHumanBoatCruiser(humanBoats[2].cruiser.position[0]);
    }
    if (humanBoats[3].battleship.active) {
      humanBoats[0].destroyer.rotated = false;
      humanBoats[1].submarine.rotated = false;
      humanBoats[2].cruiser.rotated = false;
      humanBoats[3].battleship.rotated ^= true;
      humanBoats[4].carrier.rotated = false;
      positionHumanBoatBattleship(humanBoats[3].battleship.position[0]);
    }
    if (humanBoats[4].carrier.active) {
      humanBoats[0].destroyer.rotated = false;
      humanBoats[1].submarine.rotated = false;
      humanBoats[2].cruiser.rotated = false;
      humanBoats[3].battleship.rotated = false;
      humanBoats[4].carrier.rotated ^= true;
      positionHumanBoatCarrier(humanBoats[4].carrier.position[0]);
    }
  };

  // Randomly places computer boat
  const positionComputerBoat = () => {
    let computerBoatPositions = [...computerBoats];
    let positionComputerDestroyer = [null, null];
    let positionComputerSubmarine = [null, null];
    let positionComputerCruiser = [null, null, null];
    let positionComputerBattleship = [null, null, null, null];
    let positionComputerCarrier = [null, null, null, null, null];

    const positionComputerDestroyerAlgorithm = () => {
      const positionComputerDestroyerGenerator =
        Math.floor(Math.random() * 100) + 1;
      positionComputerDestroyer[0] = positionComputerDestroyerGenerator;
      const horizontalOrVertical = Math.floor(Math.random() * 2) + 1;
      if (horizontalOrVertical === 1) {
        if (positionComputerDestroyerGenerator <= 90) {
          positionComputerDestroyer[1] =
            positionComputerDestroyerGenerator + 10;
        } else {
          positionComputerDestroyer[1] =
            positionComputerDestroyerGenerator - 10;
        }
      }
      if (horizontalOrVertical === 2) {
        positionComputerDestroyer[1] = positionComputerDestroyerGenerator + 1;

        if (positionComputerDestroyerGenerator.toString()[1] === "0") {
          positionComputerDestroyer[1] = positionComputerDestroyerGenerator - 1;
        }

        if (positionComputerDestroyerGenerator === 100) {
          positionComputerDestroyer = [100, 99];
        }
      }
    };

    const positionComputerSubmarineAlgorithm = () => {
      const positionComputerSubmarineGenerator =
        Math.floor(Math.random() * 100) + 1;
      positionComputerSubmarine[0] = positionComputerSubmarineGenerator;
      const horizontalOrVertical = Math.floor(Math.random() * 2) + 1;
      if (horizontalOrVertical === 1) {
        if (positionComputerSubmarineGenerator <= 90) {
          positionComputerSubmarine[1] =
            positionComputerSubmarineGenerator + 10;
        } else {
          positionComputerSubmarine[1] =
            positionComputerSubmarineGenerator - 10;
        }
      }
      if (horizontalOrVertical === 2) {
        positionComputerSubmarine[1] = positionComputerSubmarineGenerator + 1;

        if (positionComputerSubmarineGenerator.toString()[1] === "0") {
          positionComputerSubmarine[1] = positionComputerSubmarineGenerator - 1;
        }

        if (positionComputerSubmarineGenerator === 100) {
          positionComputerSubmarine = [100, 99];
        }
      }
    };

    const positionComputerCruiserAlgorithm = () => {
      const positionComputerCruiserGenerator =
        Math.floor(Math.random() * 100) + 1;
      positionComputerCruiser[0] = positionComputerCruiserGenerator;
      const horizontalOrVertical = Math.floor(Math.random() * 2) + 1;
      if (horizontalOrVertical === 1) {
        if (positionComputerCruiserGenerator <= 80) {
          positionComputerCruiser[1] = positionComputerCruiserGenerator + 10;
          positionComputerCruiser[2] = positionComputerCruiserGenerator + 20;
        }
        if (
          positionComputerCruiserGenerator > 80 &&
          positionComputerCruiserGenerator <= 90
        ) {
          positionComputerCruiser[1] = positionComputerCruiserGenerator + 10;
          positionComputerCruiser[2] = positionComputerCruiserGenerator - 10;
        }
        if (
          positionComputerCruiserGenerator > 90 &&
          positionComputerCruiserGenerator <= 100
        ) {
          positionComputerCruiser[1] = positionComputerCruiserGenerator - 10;
          positionComputerCruiser[2] = positionComputerCruiserGenerator - 20;
        }
      }
      if (horizontalOrVertical === 2) {
        positionComputerCruiser[1] = positionComputerCruiserGenerator + 1;
        positionComputerCruiser[2] = positionComputerCruiserGenerator + 2;

        if (
          positionComputerCruiserGenerator.toString()[1] === "9" ||
          positionComputerCruiserGenerator === 9
        ) {
          positionComputerCruiser[1] = positionComputerCruiserGenerator + 1;
          positionComputerCruiser[2] = positionComputerCruiserGenerator - 1;
        }
        if (positionComputerCruiserGenerator.toString()[1] === "0") {
          positionComputerCruiser[1] = positionComputerCruiserGenerator - 1;
          positionComputerCruiser[2] = positionComputerCruiserGenerator - 2;
        }

        if (positionComputerCruiserGenerator === 100) {
          positionComputerCruiser = [100, 99, 98];
        }
      }
    };

    const positionComputerBattleshipAlgorithm = () => {
      const positionComputerBattleshipGenerator =
        Math.floor(Math.random() * 100) + 1;
      positionComputerBattleship[0] = positionComputerBattleshipGenerator;
      const horizontalOrVertical = Math.floor(Math.random() * 2) + 1;
      if (horizontalOrVertical === 1) {
        if (positionComputerBattleshipGenerator <= 70) {
          positionComputerBattleship[1] =
            positionComputerBattleshipGenerator + 10;
          positionComputerBattleship[2] =
            positionComputerBattleshipGenerator + 20;
          positionComputerBattleship[3] =
            positionComputerBattleshipGenerator + 30;
        }
        if (
          positionComputerBattleshipGenerator > 70 &&
          positionComputerBattleshipGenerator <= 80
        ) {
          positionComputerBattleship[1] =
            positionComputerBattleshipGenerator + 10;
          positionComputerBattleship[2] =
            positionComputerBattleshipGenerator + 20;
          positionComputerBattleship[3] =
            positionComputerBattleshipGenerator - 10;
        }
        if (
          positionComputerBattleshipGenerator > 80 &&
          positionComputerBattleshipGenerator <= 90
        ) {
          positionComputerBattleship[1] =
            positionComputerBattleshipGenerator + 10;
          positionComputerBattleship[2] =
            positionComputerBattleshipGenerator - 10;
          positionComputerBattleship[3] =
            positionComputerBattleshipGenerator - 20;
        }
        if (
          positionComputerBattleshipGenerator > 90 &&
          positionComputerBattleshipGenerator <= 100
        ) {
          positionComputerBattleship[1] =
            positionComputerBattleshipGenerator - 10;
          positionComputerBattleship[2] =
            positionComputerBattleshipGenerator - 20;
          positionComputerBattleship[3] =
            positionComputerBattleshipGenerator - 30;
        }
      }
      if (horizontalOrVertical === 2) {
        positionComputerBattleship[1] = positionComputerBattleshipGenerator + 1;
        positionComputerBattleship[2] = positionComputerBattleshipGenerator + 2;
        positionComputerBattleship[3] = positionComputerBattleshipGenerator + 3;

        if (
          positionComputerBattleshipGenerator.toString()[1] === "8" ||
          positionComputerBattleshipGenerator === 8
        ) {
          positionComputerBattleship[1] =
            positionComputerBattleshipGenerator + 1;
          positionComputerBattleship[2] =
            positionComputerBattleshipGenerator + 2;
          positionComputerBattleship[3] =
            positionComputerBattleshipGenerator - 1;
        }
        if (
          positionComputerBattleshipGenerator.toString()[1] === "9" ||
          positionComputerBattleshipGenerator === 9
        ) {
          positionComputerBattleship[1] =
            positionComputerBattleshipGenerator + 1;
          positionComputerBattleship[2] =
            positionComputerBattleshipGenerator - 1;
          positionComputerBattleship[3] =
            positionComputerBattleshipGenerator - 2;
        }
        if (positionComputerBattleshipGenerator.toString()[1] === "0") {
          positionComputerBattleship[1] =
            positionComputerBattleshipGenerator - 1;
          positionComputerBattleship[2] =
            positionComputerBattleshipGenerator - 2;
          positionComputerBattleship[3] =
            positionComputerBattleshipGenerator - 3;
        }

        if (positionComputerBattleshipGenerator === 100) {
          positionComputerBattleship = [100, 99, 98, 97];
        }
      }
    };

    const positionComputerCarrierAlgorithm = () => {
      const positionComputerCarrierGenerator =
        Math.floor(Math.random() * 100) + 1;
      positionComputerCarrier[0] = positionComputerCarrierGenerator;
      const horizontalOrVertical = Math.floor(Math.random() * 2) + 1;
      if (horizontalOrVertical === 1) {
        if (positionComputerCarrierGenerator <= 60) {
          positionComputerCarrier[1] = positionComputerCarrierGenerator + 10;
          positionComputerCarrier[2] = positionComputerCarrierGenerator + 20;
          positionComputerCarrier[3] = positionComputerCarrierGenerator + 30;
          positionComputerCarrier[4] = positionComputerCarrierGenerator + 40;
        }
        if (
          positionComputerCarrierGenerator > 60 &&
          positionComputerCarrierGenerator <= 70
        ) {
          positionComputerCarrier[1] = positionComputerCarrierGenerator + 10;
          positionComputerCarrier[2] = positionComputerCarrierGenerator + 20;
          positionComputerCarrier[3] = positionComputerCarrierGenerator + 30;
          positionComputerCarrier[4] = positionComputerCarrierGenerator - 10;
        }
        if (
          positionComputerCarrierGenerator > 70 &&
          positionComputerCarrierGenerator <= 80
        ) {
          positionComputerCarrier[1] = positionComputerCarrierGenerator + 10;
          positionComputerCarrier[2] = positionComputerCarrierGenerator + 20;
          positionComputerCarrier[3] = positionComputerCarrierGenerator - 10;
          positionComputerCarrier[4] = positionComputerCarrierGenerator - 20;
        }
        if (
          positionComputerCarrierGenerator > 80 &&
          positionComputerCarrierGenerator <= 90
        ) {
          positionComputerCarrier[1] = positionComputerCarrierGenerator + 10;
          positionComputerCarrier[2] = positionComputerCarrierGenerator - 10;
          positionComputerCarrier[3] = positionComputerCarrierGenerator - 20;
          positionComputerCarrier[4] = positionComputerCarrierGenerator - 30;
        }
        if (
          positionComputerCarrierGenerator > 90 &&
          positionComputerCarrierGenerator <= 100
        ) {
          positionComputerCarrier[1] = positionComputerCarrierGenerator - 10;
          positionComputerCarrier[2] = positionComputerCarrierGenerator - 20;
          positionComputerCarrier[3] = positionComputerCarrierGenerator - 30;
          positionComputerCarrier[4] = positionComputerCarrierGenerator - 40;
        }
      }
      if (horizontalOrVertical === 2) {
        positionComputerCarrier[1] = positionComputerCarrierGenerator + 1;
        positionComputerCarrier[2] = positionComputerCarrierGenerator + 2;
        positionComputerCarrier[3] = positionComputerCarrierGenerator + 3;
        positionComputerCarrier[4] = positionComputerCarrierGenerator + 4;

        if (
          positionComputerCarrierGenerator.toString()[1] === "7" ||
          positionComputerCarrierGenerator === 7
        ) {
          positionComputerCarrier[1] = positionComputerCarrierGenerator + 1;
          positionComputerCarrier[2] = positionComputerCarrierGenerator + 2;
          positionComputerCarrier[3] = positionComputerCarrierGenerator + 3;
          positionComputerCarrier[4] = positionComputerCarrierGenerator - 1;
        }
        if (
          positionComputerCarrierGenerator.toString()[1] === "8" ||
          positionComputerCarrierGenerator === 8
        ) {
          positionComputerCarrier[1] = positionComputerCarrierGenerator + 1;
          positionComputerCarrier[2] = positionComputerCarrierGenerator + 2;
          positionComputerCarrier[3] = positionComputerCarrierGenerator - 1;
          positionComputerCarrier[4] = positionComputerCarrierGenerator - 2;
        }
        if (
          positionComputerCarrierGenerator.toString()[1] === "9" ||
          positionComputerCarrierGenerator === 9
        ) {
          positionComputerCarrier[1] = positionComputerCarrierGenerator + 1;
          positionComputerCarrier[2] = positionComputerCarrierGenerator - 1;
          positionComputerCarrier[3] = positionComputerCarrierGenerator - 2;
          positionComputerCarrier[4] = positionComputerCarrierGenerator - 3;
        }
        if (positionComputerCarrierGenerator.toString()[1] === "0") {
          positionComputerCarrier[1] = positionComputerCarrierGenerator - 1;
          positionComputerCarrier[2] = positionComputerCarrierGenerator - 2;
          positionComputerCarrier[3] = positionComputerCarrierGenerator - 3;
          positionComputerCarrier[4] = positionComputerCarrierGenerator - 4;
        }

        if (positionComputerCarrierGenerator === 100) {
          positionComputerCarrier = [100, 99, 98, 97, 96];
        }
      }
    };

    positionComputerDestroyerAlgorithm();
    positionComputerSubmarineAlgorithm();
    positionComputerCruiserAlgorithm();
    positionComputerBattleshipAlgorithm();
    positionComputerCarrierAlgorithm();

    // Check if there are duplicates in the positioning of computer boats
    const checkDuplicates = () => {
      let duplicate = false;
      let duplicateChecker = positionComputerDestroyer.concat(
        positionComputerSubmarine,
        positionComputerCruiser,
        positionComputerBattleship,
        positionComputerCarrier
      );

      duplicateChecker.sort((a, b) => a - b);

      for (let i = 0; i < duplicateChecker.length - 1; i++) {
        if (duplicateChecker[i + 1] === duplicateChecker[i]) duplicate = true;
      }

      if (duplicate === true) {
        // Randomize boats again if there are duplicates
        positionComputerBoat();
      } else {
        // Set position of computer boats if no duplicates
        computerBoatPositions[0].destroyer.position = [
          positionComputerDestroyer[0],
          positionComputerDestroyer[1],
        ];
        computerBoatPositions[1].submarine.position = [
          positionComputerSubmarine[0],
          positionComputerSubmarine[1],
        ];
        computerBoatPositions[2].cruiser.position = [
          positionComputerCruiser[0],
          positionComputerCruiser[1],
          positionComputerCruiser[2],
        ];
        computerBoatPositions[3].battleship.position = [
          positionComputerBattleship[0],
          positionComputerBattleship[1],
          positionComputerBattleship[2],
          positionComputerBattleship[3],
        ];
        computerBoatPositions[4].carrier.position = [
          positionComputerCarrier[0],
          positionComputerCarrier[1],
          positionComputerCarrier[2],
          positionComputerCarrier[3],
          positionComputerCarrier[4],
        ];
        setComputerBoats(computerBoatPositions);
      }
    };
    checkDuplicates();
  };

  // Sets attack position & turns square red
  const attackComputer = (attackComputerBoat) => {
    if (squaresHumanAttacked.includes(attackComputerBoat)) {
      setAttackPosition(null);
    } else {
      setAttackPosition(attackComputerBoat);
    }
  };

  // Human attacks and computer guesses, attack position gets reset
  const finalizeAttack = (finalAttack) => {
    const humanTurn = () => {
      // Add to squares Human attacked
      setSquaresHumanAttacked([...squaresHumanAttacked, finalAttack]);
      notifications.unshift(`Human Attacks: ${finalAttack}`);
      let computerBoatsUpdated = [...computerBoats];

      // Check if Human hit
      if (finalAttack === computerBoats[0].destroyer.position[0]) {
        computerBoatsUpdated[0].destroyer.revealed[0] = finalAttack;
        computerBoatsUpdated[0].destroyer.isHit[0] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (computerBoatsUpdated[0].destroyer.isHit[1] === true) {
          computerBoatsUpdated[0].destroyer.isSunk = true;
          notifications.unshift(`Human Sunk: Destroyer`);
          setComputerBoats(computerBoatsUpdated);
        }
      }
      if (finalAttack === computerBoats[0].destroyer.position[1]) {
        computerBoatsUpdated[0].destroyer.revealed[1] = finalAttack;
        computerBoatsUpdated[0].destroyer.isHit[1] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (computerBoatsUpdated[0].destroyer.isHit[0] === true) {
          computerBoatsUpdated[0].destroyer.isSunk = true;
          notifications.unshift(`Human Sunk: Destroyer`);
          setComputerBoats(computerBoatsUpdated);
        }
      }

      if (finalAttack === computerBoats[1].submarine.position[0]) {
        computerBoatsUpdated[1].submarine.revealed[0] = finalAttack;
        computerBoatsUpdated[1].submarine.isHit[0] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (computerBoatsUpdated[1].submarine.isHit[1] === true) {
          computerBoatsUpdated[1].submarine.isSunk = true;
          notifications.unshift(`Human Sunk: Submarine`);
          setComputerBoats(computerBoatsUpdated);
        }
      }
      if (finalAttack === computerBoats[1].submarine.position[1]) {
        computerBoatsUpdated[1].submarine.revealed[1] = finalAttack;
        computerBoatsUpdated[1].submarine.isHit[1] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (computerBoatsUpdated[1].submarine.isHit[0] === true) {
          computerBoatsUpdated[1].submarine.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
          notifications.unshift(`Human Sunk: Submarine`);
        }
      }

      if (finalAttack === computerBoats[2].cruiser.position[0]) {
        computerBoatsUpdated[2].cruiser.revealed[0] = finalAttack;
        computerBoatsUpdated[2].cruiser.isHit[0] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[2].cruiser.isHit[1] === true &&
          computerBoatsUpdated[2].cruiser.isHit[2] === true
        ) {
          computerBoatsUpdated[2].cruiser.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
          notifications.unshift(`Human Sunk: Cruiser`);
        }
      }
      if (finalAttack === computerBoats[2].cruiser.position[1]) {
        computerBoatsUpdated[2].cruiser.revealed[1] = finalAttack;
        computerBoatsUpdated[2].cruiser.isHit[1] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[2].cruiser.isHit[0] === true &&
          computerBoatsUpdated[2].cruiser.isHit[2] === true
        ) {
          computerBoatsUpdated[2].cruiser.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
          notifications.unshift(`Human Sunk: Cruiser`);
        }
      }

      if (finalAttack === computerBoats[2].cruiser.position[2]) {
        computerBoatsUpdated[2].cruiser.revealed[2] = finalAttack;
        computerBoatsUpdated[2].cruiser.isHit[2] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[2].cruiser.isHit[1] === true &&
          computerBoatsUpdated[2].cruiser.isHit[2] === true
        ) {
          computerBoatsUpdated[2].cruiser.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
          notifications.unshift(`Human Sunk: Cruiser`);
        }
      }

      if (finalAttack === computerBoats[3].battleship.position[0]) {
        computerBoatsUpdated[3].battleship.revealed[0] = finalAttack;
        computerBoatsUpdated[3].battleship.isHit[0] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[3].battleship.isHit[1] === true &&
          computerBoatsUpdated[3].battleship.isHit[2] === true &&
          computerBoatsUpdated[3].battleship.isHit[3] === true
        ) {
          notifications.unshift(`Human Sunk: Battleship`);
          computerBoatsUpdated[3].battleship.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
        }
      }

      if (finalAttack === computerBoats[3].battleship.position[1]) {
        computerBoatsUpdated[3].battleship.revealed[1] = finalAttack;
        computerBoatsUpdated[3].battleship.isHit[1] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[3].battleship.isHit[0] === true &&
          computerBoatsUpdated[3].battleship.isHit[2] === true &&
          computerBoatsUpdated[3].battleship.isHit[3] === true
        ) {
          computerBoatsUpdated[3].battleship.isSunk = true;
          notifications.unshift(`Human Sunk: Battleship`);
          setComputerBoats(computerBoatsUpdated);
        }
      }

      if (finalAttack === computerBoats[3].battleship.position[2]) {
        computerBoatsUpdated[3].battleship.revealed[2] = finalAttack;
        computerBoatsUpdated[3].battleship.isHit[2] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[3].battleship.isHit[0] === true &&
          computerBoatsUpdated[3].battleship.isHit[1] === true &&
          computerBoatsUpdated[3].battleship.isHit[3] === true
        ) {
          computerBoatsUpdated[3].battleship.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
          notifications.unshift(`Human Sunk: Battleship`);
        }
      }

      if (finalAttack === computerBoats[3].battleship.position[3]) {
        computerBoatsUpdated[3].battleship.revealed[3] = finalAttack;
        computerBoatsUpdated[3].battleship.isHit[3] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[3].battleship.isHit[0] === true &&
          computerBoatsUpdated[3].battleship.isHit[1] === true &&
          computerBoatsUpdated[3].battleship.isHit[2] === true
        ) {
          computerBoatsUpdated[3].battleship.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
          notifications.unshift(`Human Sunk: Battleship`);
        }
      }

      if (finalAttack === computerBoats[4].carrier.position[0]) {
        computerBoatsUpdated[4].carrier.revealed[0] = finalAttack;
        computerBoatsUpdated[4].carrier.isHit[0] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[4].carrier.isHit[1] === true &&
          computerBoatsUpdated[4].carrier.isHit[2] === true &&
          computerBoatsUpdated[4].carrier.isHit[3] === true &&
          computerBoatsUpdated[4].carrier.isHit[4] === true
        ) {
          computerBoatsUpdated[4].carrier.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
          notifications.unshift(`Human Sunk: Carrier`);
        }
      }
      if (finalAttack === computerBoats[4].carrier.position[1]) {
        computerBoatsUpdated[4].carrier.revealed[1] = finalAttack;
        computerBoatsUpdated[4].carrier.isHit[1] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[4].carrier.isHit[0] === true &&
          computerBoatsUpdated[4].carrier.isHit[2] === true &&
          computerBoatsUpdated[4].carrier.isHit[3] === true &&
          computerBoatsUpdated[4].carrier.isHit[4] === true
        ) {
          computerBoatsUpdated[4].carrier.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
          notifications.unshift(`Human Sunk: Carrier`);
        }
      }
      if (finalAttack === computerBoats[4].carrier.position[2]) {
        computerBoatsUpdated[4].carrier.revealed[2] = finalAttack;
        computerBoatsUpdated[4].carrier.isHit[2] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[4].carrier.isHit[0] === true &&
          computerBoatsUpdated[4].carrier.isHit[1] === true &&
          computerBoatsUpdated[4].carrier.isHit[3] === true &&
          computerBoatsUpdated[4].carrier.isHit[4] === true
        ) {
          computerBoatsUpdated[4].carrier.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
          notifications.unshift(`Human Sunk: Carrier`);
        }
      }
      if (finalAttack === computerBoats[4].carrier.position[3]) {
        computerBoatsUpdated[4].carrier.revealed[3] = finalAttack;
        computerBoatsUpdated[4].carrier.isHit[3] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[4].carrier.isHit[0] === true &&
          computerBoatsUpdated[4].carrier.isHit[1] === true &&
          computerBoatsUpdated[4].carrier.isHit[2] === true &&
          computerBoatsUpdated[4].carrier.isHit[4] === true
        ) {
          computerBoatsUpdated[4].carrier.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
          notifications.unshift(`Human Sunk: Carrier`);
        }
      }
      if (finalAttack === computerBoats[4].carrier.position[4]) {
        computerBoatsUpdated[4].carrier.revealed[4] = finalAttack;
        computerBoatsUpdated[4].carrier.isHit[4] = true;
        notifications.unshift(`Human Hit: ${finalAttack}`);
        if (
          computerBoatsUpdated[4].carrier.isHit[0] === true &&
          computerBoatsUpdated[4].carrier.isHit[1] === true &&
          computerBoatsUpdated[4].carrier.isHit[2] === true &&
          computerBoatsUpdated[4].carrier.isHit[3] === true
        ) {
          computerBoatsUpdated[4].carrier.isSunk = true;
          setComputerBoats(computerBoatsUpdated);
          notifications.unshift(`Human Sunk: Carrier`);
        }
      }
    };

    const computerTurnEasy = () => {
      // AI guess function
      const computerAttack = Math.floor(Math.random() * 100) + 1;
      // Cannot guess the same square
      if (squaresComputerAttacked.includes(computerAttack)) {
        computerTurnEasy();
      } else {
        // Add to squares Computer attacked
        setSquaresComputerAttacked([
          ...squaresComputerAttacked,
          computerAttack,
        ]);
        notifications.unshift(`Computer Attacks: ${computerAttack}`);
        let humanBoatsUpdated = [...humanBoats];

        // Check if Computer hit/win function
        if (computerAttack === humanBoats[0].destroyer.position[0]) {
          humanBoatsUpdated[0].destroyer.revealed[0] = computerAttack;
          humanBoatsUpdated[0].destroyer.isHit[0] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (humanBoatsUpdated[0].destroyer.isHit[1] === true) {
            humanBoatsUpdated[0].destroyer.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Destroyer`);
          }
        }
        if (computerAttack === humanBoats[0].destroyer.position[1]) {
          humanBoatsUpdated[0].destroyer.revealed[1] = computerAttack;
          humanBoatsUpdated[0].destroyer.isHit[1] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (humanBoatsUpdated[0].destroyer.isHit[0] === true) {
            humanBoatsUpdated[0].destroyer.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Destroyer`);
          }
        }

        if (computerAttack === humanBoats[1].submarine.position[0]) {
          humanBoatsUpdated[1].submarine.revealed[0] = computerAttack;
          humanBoatsUpdated[1].submarine.isHit[0] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (humanBoatsUpdated[1].submarine.isHit[1]) {
            humanBoatsUpdated[1].submarine.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Submarine`);
          }
        }
        if (computerAttack === humanBoats[1].submarine.position[1]) {
          humanBoatsUpdated[1].submarine.revealed[1] = computerAttack;
          humanBoatsUpdated[1].submarine.isHit[1] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (humanBoatsUpdated[1].submarine.isHit[0]) {
            humanBoatsUpdated[1].submarine.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Submarine`);
          }
        }

        if (computerAttack === humanBoats[2].cruiser.position[0]) {
          humanBoatsUpdated[2].cruiser.revealed[0] = computerAttack;
          humanBoatsUpdated[2].cruiser.isHit[0] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[2].cruiser.isHit[1] &&
            humanBoatsUpdated[2].cruiser.isHit[2]
          ) {
            humanBoatsUpdated[2].cruiser.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Cruiser`);
          }
        }
        if (computerAttack === humanBoats[2].cruiser.position[1]) {
          humanBoatsUpdated[2].cruiser.revealed[1] = computerAttack;
          humanBoatsUpdated[2].cruiser.isHit[1] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[2].cruiser.isHit[0] &&
            humanBoatsUpdated[2].cruiser.isHit[2]
          ) {
            humanBoatsUpdated[2].cruiser.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Cruiser`);
          }
        }
        if (computerAttack === humanBoats[2].cruiser.position[2]) {
          humanBoatsUpdated[2].cruiser.revealed[2] = computerAttack;
          humanBoatsUpdated[2].cruiser.isHit[2] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[2].cruiser.isHit[0] &&
            humanBoatsUpdated[2].cruiser.isHit[1]
          ) {
            humanBoatsUpdated[2].cruiser.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Cruiser`);
          }
        }

        if (computerAttack === humanBoats[3].battleship.position[0]) {
          humanBoatsUpdated[3].battleship.revealed[0] = computerAttack;
          humanBoatsUpdated[3].battleship.isHit[0] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[3].battleship.isHit[1] &&
            humanBoatsUpdated[3].battleship.isHit[2] &&
            humanBoatsUpdated[3].battleship.isHit[3]
          ) {
            humanBoatsUpdated[3].battleship.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Battleship`);
          }
        }
        if (computerAttack === humanBoats[3].battleship.position[1]) {
          humanBoatsUpdated[3].battleship.revealed[1] = computerAttack;
          humanBoatsUpdated[3].battleship.isHit[1] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[3].battleship.isHit[0] &&
            humanBoatsUpdated[3].battleship.isHit[2] &&
            humanBoatsUpdated[3].battleship.isHit[3]
          ) {
            humanBoatsUpdated[3].battleship.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Battleship`);
          }
        }
        if (computerAttack === humanBoats[3].battleship.position[2]) {
          humanBoatsUpdated[3].battleship.revealed[2] = computerAttack;
          humanBoatsUpdated[3].battleship.isHit[2] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[3].battleship.isHit[0] &&
            humanBoatsUpdated[3].battleship.isHit[1] &&
            humanBoatsUpdated[3].battleship.isHit[2]
          ) {
            humanBoatsUpdated[3].battleship.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Battleship`);
          }
        }
        if (computerAttack === humanBoats[3].battleship.position[3]) {
          humanBoatsUpdated[3].battleship.revealed[3] = computerAttack;
          humanBoatsUpdated[3].battleship.isHit[3] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[3].battleship.isHit[0] &&
            humanBoatsUpdated[3].battleship.isHit[1] &&
            humanBoatsUpdated[3].battleship.isHit[2]
          ) {
            humanBoatsUpdated[3].battleship.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Battleship`);
          }
        }

        if (computerAttack === humanBoats[4].carrier.position[0]) {
          humanBoatsUpdated[4].carrier.revealed[0] = computerAttack;
          humanBoatsUpdated[4].carrier.isHit[0] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[4].carrier.isHit[1] &&
            humanBoatsUpdated[4].carrier.isHit[2] &&
            humanBoatsUpdated[4].carrier.isHit[3] &&
            humanBoatsUpdated[4].carrier.isHit[4]
          ) {
            humanBoatsUpdated[4].carrier.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Carrier`);
          }
        }
        if (computerAttack === humanBoats[4].carrier.position[1]) {
          humanBoatsUpdated[4].carrier.revealed[1] = computerAttack;
          humanBoatsUpdated[4].carrier.isHit[1] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[4].carrier.isHit[0] &&
            humanBoatsUpdated[4].carrier.isHit[2] &&
            humanBoatsUpdated[4].carrier.isHit[3] &&
            humanBoatsUpdated[4].carrier.isHit[4]
          ) {
            humanBoatsUpdated[4].carrier.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Carrier`);
          }
        }
        if (computerAttack === humanBoats[4].carrier.position[2]) {
          humanBoatsUpdated[4].carrier.revealed[2] = computerAttack;
          humanBoatsUpdated[4].carrier.isHit[2] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[4].carrier.isHit[0] &&
            humanBoatsUpdated[4].carrier.isHit[1] &&
            humanBoatsUpdated[4].carrier.isHit[3] &&
            humanBoatsUpdated[4].carrier.isHit[4]
          )
            humanBoatsUpdated[4].carrier.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }
        if (computerAttack === humanBoats[4].carrier.position[3]) {
          humanBoatsUpdated[4].carrier.revealed[3] = computerAttack;
          humanBoatsUpdated[4].carrier.isHit[3] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[4].carrier.isHit[0] &&
            humanBoatsUpdated[4].carrier.isHit[1] &&
            humanBoatsUpdated[4].carrier.isHit[2] &&
            humanBoatsUpdated[4].carrier.isHit[4]
          ) {
            humanBoatsUpdated[4].carrier.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Carrier`);
          }
        }
        if (computerAttack === humanBoats[4].carrier.position[4]) {
          humanBoatsUpdated[4].carrier.revealed[4] = computerAttack;
          humanBoatsUpdated[4].carrier.isHit[4] = true;
          notifications.unshift(`Computer Hit: ${computerAttack}`);
          if (
            humanBoatsUpdated[4].carrier.isHit[0] &&
            humanBoatsUpdated[4].carrier.isHit[1] &&
            humanBoatsUpdated[4].carrier.isHit[2] &&
            humanBoatsUpdated[4].carrier.isHit[3]
          ) {
            humanBoatsUpdated[4].carrier.isSunk = true;
            setHumanBoats(humanBoatsUpdated);
            notifications.unshift(`Computer Sunks: Carrier`);
          }
        }
      }
    };

    const computerTurnHard = () => {
      const positionHolder = hardIsHit[3];
      let computerAttack;
      let humanBoatSquares = humanBoats[0].destroyer.position.concat(
        humanBoats[1].submarine.position,
        humanBoats[2].cruiser.position,
        humanBoats[3].battleship.position,
        humanBoats[4].carrier.position
      );

      // If currently not on a hit, computer attack will be random
      if (hardIsHit[0] === false) {
        computerAttack = Math.floor(Math.random() * 100) + 1;
        if (squaresComputerAttacked.includes(computerAttack)) {
          computerTurnHard();
          return;
        }
        // Hit - sets state to south and locks in position of boat
        if (humanBoatSquares.includes(computerAttack)) {
          setHardIsHit([true, "South", computerAttack, computerAttack]);
        }
      }

      // Start checking South positions
      if (hardIsHit[0] === true && hardIsHit[1] === "South") {
        computerAttack = hardIsHit[2] + 10;
        if (computerAttack < 101) {
          if (
            humanBoatSquares.includes(computerAttack) &&
            squaresComputerAttacked.includes(computerAttack) === false
          ) {
            setHardIsHit([true, "South", computerAttack, positionHolder]);
          } else {
            setHardIsHit([true, "North", positionHolder, positionHolder]);
          }
        } else {
          computerAttack = hardIsHit[3] - 10;
          setHardIsHit([true, "North", computerAttack, positionHolder]);
        }
      }

      // Start checking North positions after checking South
      if (hardIsHit[0] === true && hardIsHit[1] === "North") {
        computerAttack = hardIsHit[2] - 10;
        if (computerAttack > 0) {
          if (humanBoatSquares.includes(computerAttack)) {
            setHardIsHit([true, "North", computerAttack, positionHolder]);
          } else {
            setHardIsHit([true, "East", positionHolder, positionHolder]);
          }
        } else {
          computerAttack = hardIsHit[3] + 1;
          setHardIsHit([true, "East", computerAttack, positionHolder]);
        }
      }

      // Start checking East positions after checking South & North
      if (hardIsHit[0] === true && hardIsHit[1] === "East") {
        computerAttack = hardIsHit[2] + 1;
        if (computerAttack.toString()[1] === "1") {
          computerAttack = hardIsHit[3] - 1;
          setHardIsHit([true, "West", computerAttack, positionHolder]);
        } else {
          if (humanBoatSquares.includes(computerAttack)) {
            setHardIsHit([true, "East", computerAttack, positionHolder]);
          } else {
            setHardIsHit([true, "West", positionHolder, positionHolder]);
          }
        }
      }

      // Finish checking West
      if (hardIsHit[0] === true && hardIsHit[1] === "West") {
        computerAttack = hardIsHit[2] - 1;
        if (humanBoatSquares.includes(computerAttack)) {
          setHardIsHit([true, "West", computerAttack, positionHolder]);
        }
      }

      // Add to squares Computer attacked
      setSquaresComputerAttacked([...squaresComputerAttacked, computerAttack]);
      let humanBoatsUpdated = [...humanBoats];
      notifications.unshift(`Computer Attacks: ${computerAttack}`);

      // Check if Computer hit/win function
      if (computerAttack === humanBoats[0].destroyer.position[0]) {
        humanBoatsUpdated[0].destroyer.revealed[0] = computerAttack;
        humanBoatsUpdated[0].destroyer.isHit[0] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (humanBoatsUpdated[0].destroyer.isHit[1] === true) {
          humanBoatsUpdated[0].destroyer.isSunk = true;
          notifications.unshift(`Computer Sunk: Destroyer`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
      if (computerAttack === humanBoats[0].destroyer.position[1]) {
        humanBoatsUpdated[0].destroyer.revealed[1] = computerAttack;
        humanBoatsUpdated[0].destroyer.isHit[1] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (humanBoatsUpdated[0].destroyer.isHit[0] === true) {
          humanBoatsUpdated[0].destroyer.isSunk = true;
          notifications.unshift(`Computer Sunk: Destroyer`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }

      if (computerAttack === humanBoats[1].submarine.position[0]) {
        humanBoatsUpdated[1].submarine.revealed[0] = computerAttack;
        humanBoatsUpdated[1].submarine.isHit[0] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (humanBoatsUpdated[1].submarine.isHit[1]) {
          humanBoatsUpdated[1].submarine.isSunk = true;
          notifications.unshift(`Computer Sunk: Submarine`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
      if (computerAttack === humanBoats[1].submarine.position[1]) {
        humanBoatsUpdated[1].submarine.revealed[1] = computerAttack;
        humanBoatsUpdated[1].submarine.isHit[1] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (humanBoatsUpdated[1].submarine.isHit[0]) {
          humanBoatsUpdated[1].submarine.isSunk = true;
          notifications.unshift(`Computer Sunk: Submarine`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }

      if (computerAttack === humanBoats[2].cruiser.position[0]) {
        humanBoatsUpdated[2].cruiser.revealed[0] = computerAttack;
        humanBoatsUpdated[2].cruiser.isHit[0] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[2].cruiser.isHit[1] &&
          humanBoatsUpdated[2].cruiser.isHit[2]
        ) {
          humanBoatsUpdated[2].cruiser.isSunk = true;
          notifications.unshift(`Computer Sunk: Cruiser`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
      if (computerAttack === humanBoats[2].cruiser.position[1]) {
        humanBoatsUpdated[2].cruiser.revealed[1] = computerAttack;
        humanBoatsUpdated[2].cruiser.isHit[1] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[2].cruiser.isHit[0] &&
          humanBoatsUpdated[2].cruiser.isHit[2]
        ) {
          humanBoatsUpdated[2].cruiser.isSunk = true;
          notifications.unshift(`Computer Sunk: Cruiser`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
      if (computerAttack === humanBoats[2].cruiser.position[2]) {
        humanBoatsUpdated[2].cruiser.revealed[2] = computerAttack;
        humanBoatsUpdated[2].cruiser.isHit[2] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[2].cruiser.isHit[0] &&
          humanBoatsUpdated[2].cruiser.isHit[1]
        ) {
          humanBoatsUpdated[2].cruiser.isSunk = true;
          notifications.unshift(`Computer Sunk: Cruiser`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }

      if (computerAttack === humanBoats[3].battleship.position[0]) {
        humanBoatsUpdated[3].battleship.revealed[0] = computerAttack;
        humanBoatsUpdated[3].battleship.isHit[0] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[3].battleship.isHit[1] &&
          humanBoatsUpdated[3].battleship.isHit[2] &&
          humanBoatsUpdated[3].battleship.isHit[3]
        ) {
          humanBoatsUpdated[3].battleship.isSunk = true;
          notifications.unshift(`Computer Sunk: Battleship`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
      if (computerAttack === humanBoats[3].battleship.position[1]) {
        humanBoatsUpdated[3].battleship.revealed[1] = computerAttack;
        humanBoatsUpdated[3].battleship.isHit[1] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[3].battleship.isHit[0] &&
          humanBoatsUpdated[3].battleship.isHit[2] &&
          humanBoatsUpdated[3].battleship.isHit[3]
        ) {
          humanBoatsUpdated[3].battleship.isSunk = true;
          notifications.unshift(`Computer Sunk: Battleship`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
      if (computerAttack === humanBoats[3].battleship.position[2]) {
        humanBoatsUpdated[3].battleship.revealed[2] = computerAttack;
        humanBoatsUpdated[3].battleship.isHit[2] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[3].battleship.isHit[0] &&
          humanBoatsUpdated[3].battleship.isHit[1] &&
          humanBoatsUpdated[3].battleship.isHit[3]
        ) {
          humanBoatsUpdated[3].battleship.isSunk = true;
          notifications.unshift(`Computer Sunk: Battleship`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
      if (computerAttack === humanBoats[3].battleship.position[3]) {
        humanBoatsUpdated[3].battleship.revealed[3] = computerAttack;
        humanBoatsUpdated[3].battleship.isHit[3] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[3].battleship.isHit[0] &&
          humanBoatsUpdated[3].battleship.isHit[1] &&
          humanBoatsUpdated[3].battleship.isHit[2]
        ) {
          humanBoatsUpdated[3].battleship.isSunk = true;
          notifications.unshift(`Computer Sunk: Battleship`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }

      if (computerAttack === humanBoats[4].carrier.position[0]) {
        humanBoatsUpdated[4].carrier.revealed[0] = computerAttack;
        humanBoatsUpdated[4].carrier.isHit[0] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[4].carrier.isHit[1] &&
          humanBoatsUpdated[4].carrier.isHit[2] &&
          humanBoatsUpdated[4].carrier.isHit[3] &&
          humanBoatsUpdated[4].carrier.isHit[4]
        ) {
          humanBoatsUpdated[4].carrier.isSunk = true;
          notifications.unshift(`Computer Sunk: Carrier`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
      if (computerAttack === humanBoats[4].carrier.position[1]) {
        humanBoatsUpdated[4].carrier.revealed[1] = computerAttack;
        humanBoatsUpdated[4].carrier.isHit[1] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[4].carrier.isHit[0] &&
          humanBoatsUpdated[4].carrier.isHit[2] &&
          humanBoatsUpdated[4].carrier.isHit[3] &&
          humanBoatsUpdated[4].carrier.isHit[4]
        ) {
          humanBoatsUpdated[4].carrier.isSunk = true;
          notifications.unshift(`Computer Sunk: Carrier`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
      if (computerAttack === humanBoats[4].carrier.position[2]) {
        humanBoatsUpdated[4].carrier.revealed[2] = computerAttack;
        humanBoatsUpdated[4].carrier.isHit[2] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[4].carrier.isHit[0] &&
          humanBoatsUpdated[4].carrier.isHit[1] &&
          humanBoatsUpdated[4].carrier.isHit[3] &&
          humanBoatsUpdated[4].carrier.isHit[4]
        ) {
          humanBoatsUpdated[4].carrier.isSunk = true;
          notifications.unshift(`Computer Sunk: Carrier`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
      if (computerAttack === humanBoats[4].carrier.position[3]) {
        humanBoatsUpdated[4].carrier.revealed[3] = computerAttack;
        humanBoatsUpdated[4].carrier.isHit[3] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[4].carrier.isHit[0] &&
          humanBoatsUpdated[4].carrier.isHit[1] &&
          humanBoatsUpdated[4].carrier.isHit[2] &&
          humanBoatsUpdated[4].carrier.isHit[4]
        ) {
          humanBoatsUpdated[4].carrier.isSunk = true;
          notifications.unshift(`Computer Sunk: Carrier`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
      if (computerAttack === humanBoats[4].carrier.position[4]) {
        humanBoatsUpdated[4].carrier.revealed[4] = computerAttack;
        humanBoatsUpdated[4].carrier.isHit[4] = true;
        notifications.unshift(`Computer Hit: ${computerAttack}`);
        if (
          humanBoatsUpdated[4].carrier.isHit[0] &&
          humanBoatsUpdated[4].carrier.isHit[1] &&
          humanBoatsUpdated[4].carrier.isHit[2] &&
          humanBoatsUpdated[4].carrier.isHit[3]
        ) {
          humanBoatsUpdated[4].carrier.isSunk = true;
          notifications.unshift(`Computer Sunk: Carrier`);
          setHardIsHit([false, "", null, null]);
          setHumanBoats(humanBoatsUpdated);
        }
      }
    };

    const computerTurnImpossible = () => {
      let humanBoatSquares = humanBoats[0].destroyer.position.concat(
        humanBoats[1].submarine.position,
        humanBoats[2].cruiser.position,
        humanBoats[3].battleship.position,
        humanBoats[4].carrier.position
      );
      let computerAttack = humanBoatSquares[impossibleTracker];
      let impossibleTally = impossibleTracker + 1;
      setImpossibleTracker(impossibleTally);
      notifications.unshift(`Computer Hits: ${computerAttack}`);

      let humanBoatsUpdated = [...humanBoats];

      // Check if Computer hit/win function
      if (computerAttack === humanBoats[0].destroyer.position[0]) {
        humanBoatsUpdated[0].destroyer.revealed[0] = computerAttack;
        humanBoatsUpdated[0].destroyer.isHit[0] = true;
        if (humanBoatsUpdated[0].destroyer.isHit[1] === true) {
          humanBoatsUpdated[0].destroyer.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Destroyer`);
        }
      }
      if (computerAttack === humanBoats[0].destroyer.position[1]) {
        humanBoatsUpdated[0].destroyer.revealed[1] = computerAttack;
        humanBoatsUpdated[0].destroyer.isHit[1] = true;
        if (humanBoatsUpdated[0].destroyer.isHit[0] === true) {
          humanBoatsUpdated[0].destroyer.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Destroyer`);
        }
      }

      if (computerAttack === humanBoats[1].submarine.position[0]) {
        humanBoatsUpdated[1].submarine.revealed[0] = computerAttack;
        humanBoatsUpdated[1].submarine.isHit[0] = true;
        if (humanBoatsUpdated[1].submarine.isHit[1]) {
          humanBoatsUpdated[1].submarine.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Submarine`);
        }
      }
      if (computerAttack === humanBoats[1].submarine.position[1]) {
        humanBoatsUpdated[1].submarine.revealed[1] = computerAttack;
        humanBoatsUpdated[1].submarine.isHit[1] = true;
        if (humanBoatsUpdated[1].submarine.isHit[0]) {
          humanBoatsUpdated[1].submarine.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Submarine`);
        }
      }

      if (computerAttack === humanBoats[2].cruiser.position[0]) {
        humanBoatsUpdated[2].cruiser.revealed[0] = computerAttack;
        humanBoatsUpdated[2].cruiser.isHit[0] = true;
        if (
          humanBoatsUpdated[2].cruiser.isHit[1] &&
          humanBoatsUpdated[2].cruiser.isHit[2]
        ) {
          humanBoatsUpdated[2].cruiser.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Cruiser`);
        }
      }
      if (computerAttack === humanBoats[2].cruiser.position[1]) {
        humanBoatsUpdated[2].cruiser.revealed[1] = computerAttack;
        humanBoatsUpdated[2].cruiser.isHit[1] = true;
        if (
          humanBoatsUpdated[2].cruiser.isHit[0] &&
          humanBoatsUpdated[2].cruiser.isHit[2]
        ) {
          humanBoatsUpdated[2].cruiser.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Cruiser`);
        }
      }
      if (computerAttack === humanBoats[2].cruiser.position[2]) {
        humanBoatsUpdated[2].cruiser.revealed[2] = computerAttack;
        humanBoatsUpdated[2].cruiser.isHit[2] = true;
        if (
          humanBoatsUpdated[2].cruiser.isHit[0] &&
          humanBoatsUpdated[2].cruiser.isHit[1]
        ) {
          humanBoatsUpdated[2].cruiser.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Cruiser`);
        }
      }

      if (computerAttack === humanBoats[3].battleship.position[0]) {
        humanBoatsUpdated[3].battleship.revealed[0] = computerAttack;
        humanBoatsUpdated[3].battleship.isHit[0] = true;
        if (
          humanBoatsUpdated[3].battleship.isHit[1] &&
          humanBoatsUpdated[3].battleship.isHit[2] &&
          humanBoatsUpdated[3].battleship.isHit[3]
        ) {
          humanBoatsUpdated[3].battleship.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Battleship`);
        }
      }
      if (computerAttack === humanBoats[3].battleship.position[1]) {
        humanBoatsUpdated[3].battleship.revealed[1] = computerAttack;
        humanBoatsUpdated[3].battleship.isHit[1] = true;
        if (
          humanBoatsUpdated[3].battleship.isHit[0] &&
          humanBoatsUpdated[3].battleship.isHit[2] &&
          humanBoatsUpdated[3].battleship.isHit[3]
        ) {
          humanBoatsUpdated[3].battleship.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Battleship`);
        }
      }
      if (computerAttack === humanBoats[3].battleship.position[2]) {
        humanBoatsUpdated[3].battleship.revealed[2] = computerAttack;
        humanBoatsUpdated[3].battleship.isHit[2] = true;
        if (
          humanBoatsUpdated[3].battleship.isHit[0] &&
          humanBoatsUpdated[3].battleship.isHit[1] &&
          humanBoatsUpdated[3].battleship.isHit[3]
        ) {
          humanBoatsUpdated[3].battleship.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Battleship`);
        }
      }
      if (computerAttack === humanBoats[3].battleship.position[3]) {
        humanBoatsUpdated[3].battleship.revealed[3] = computerAttack;
        humanBoatsUpdated[3].battleship.isHit[3] = true;
        if (
          humanBoatsUpdated[3].battleship.isHit[0] &&
          humanBoatsUpdated[3].battleship.isHit[1] &&
          humanBoatsUpdated[3].battleship.isHit[2]
        ) {
          humanBoatsUpdated[3].battleship.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Battleship`);
        }
      }

      if (computerAttack === humanBoats[4].carrier.position[0]) {
        humanBoatsUpdated[4].carrier.revealed[0] = computerAttack;
        humanBoatsUpdated[4].carrier.isHit[0] = true;
        if (
          humanBoatsUpdated[4].carrier.isHit[1] &&
          humanBoatsUpdated[4].carrier.isHit[2] &&
          humanBoatsUpdated[4].carrier.isHit[3] &&
          humanBoatsUpdated[4].carrier.isHit[4]
        ) {
          humanBoatsUpdated[4].carrier.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Carrier`);
        }
      }
      if (computerAttack === humanBoats[4].carrier.position[1]) {
        humanBoatsUpdated[4].carrier.revealed[1] = computerAttack;
        humanBoatsUpdated[4].carrier.isHit[1] = true;
        if (
          humanBoatsUpdated[4].carrier.isHit[0] &&
          humanBoatsUpdated[4].carrier.isHit[2] &&
          humanBoatsUpdated[4].carrier.isHit[3] &&
          humanBoatsUpdated[4].carrier.isHit[4]
        ) {
          humanBoatsUpdated[4].carrier.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Carrier`);
        }
      }
      if (computerAttack === humanBoats[4].carrier.position[2]) {
        humanBoatsUpdated[4].carrier.revealed[2] = computerAttack;
        humanBoatsUpdated[4].carrier.isHit[2] = true;
        if (
          humanBoatsUpdated[4].carrier.isHit[0] &&
          humanBoatsUpdated[4].carrier.isHit[1] &&
          humanBoatsUpdated[4].carrier.isHit[3] &&
          humanBoatsUpdated[4].carrier.isHit[4]
        ) {
          humanBoatsUpdated[4].carrier.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Carrier`);
        }
      }
      if (computerAttack === humanBoats[4].carrier.position[3]) {
        humanBoatsUpdated[4].carrier.revealed[3] = computerAttack;
        humanBoatsUpdated[4].carrier.isHit[3] = true;
        if (
          humanBoatsUpdated[4].carrier.isHit[0] &&
          humanBoatsUpdated[4].carrier.isHit[1] &&
          humanBoatsUpdated[4].carrier.isHit[2] &&
          humanBoatsUpdated[4].carrier.isHit[4]
        ) {
          humanBoatsUpdated[4].carrier.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Carrier`);
        }
      }
      if (computerAttack === humanBoats[4].carrier.position[4]) {
        humanBoatsUpdated[4].carrier.revealed[4] = computerAttack;
        humanBoatsUpdated[4].carrier.isHit[4] = true;
        if (
          humanBoatsUpdated[4].carrier.isHit[0] &&
          humanBoatsUpdated[4].carrier.isHit[1] &&
          humanBoatsUpdated[4].carrier.isHit[2] &&
          humanBoatsUpdated[4].carrier.isHit[3]
        ) {
          humanBoatsUpdated[4].carrier.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
          notifications.unshift(`Computer Sunk: Carrier`);
        }
      }
    };

    humanTurn();
    if (difficulty === 1) computerTurnEasy();
    if (difficulty === 2) computerTurnHard();
    if (difficulty === 3) computerTurnImpossible();

    // Reset Attack Position
    setAttackPosition(null);
  };

  // Conditions for Human to Win
  const checkHumanWin = () => {
    if (
      computerBoats[0].destroyer.isSunk === true &&
      computerBoats[1].submarine.isSunk === true &&
      computerBoats[2].cruiser.isSunk === true &&
      computerBoats[3].battleship.isSunk === true &&
      computerBoats[4].carrier.isSunk === true
    ) {
      notifications.unshift(`Human Wins!`);
      setHumanWin(true);
    }
  };

  // Conditions for Computer to Win
  const checkComputerWin = () => {
    if (
      humanBoats[0].destroyer.isSunk === true &&
      humanBoats[1].submarine.isSunk === true &&
      humanBoats[2].cruiser.isSunk === true &&
      humanBoats[3].battleship.isSunk === true &&
      humanBoats[4].carrier.isSunk === true
    ) {
      notifications.unshift(`Computer Wins!`);
      setComputerWin(true);
    }
  };

  // Reset all variables
  const restartGame = () => {
    setHumanBoats([
      {
        destroyer: {
          position: [null, null],
          revealed: [null, null],
          active: false,
          rotated: false,
          isHit: [null, null],
          isSunk: false,
        },
      },
      {
        submarine: {
          position: [null, null],
          revealed: [null, null],
          active: false,
          rotated: false,
          isHit: [null, null],
          isSunk: false,
        },
      },
      {
        cruiser: {
          position: [null, null, null],
          revealed: [null, null, null],
          active: false,
          rotated: false,
          isHit: [null, null, null],
          isSunk: false,
        },
      },
      {
        battleship: {
          position: [null, null, null, null],
          revealed: [null, null, null, null],
          active: false,
          rotated: false,
          isHit: [null, null, null, null],
          isSunk: false,
        },
      },
      {
        carrier: {
          position: [null, null, null, null, null],
          revealed: [null, null, null, null, null],
          active: false,
          rotated: false,
          isHit: [null, null, null, null, null],
          isSunk: false,
        },
      },
    ]);
    setComputerBoats([
      {
        destroyer: {
          position: [null, null],
          revealed: [null, null],
          isHit: [false, false],
          isSunk: false,
        },
      },
      {
        submarine: {
          position: [null, null],
          revealed: [null, null],
          isHit: [false, false],
          isSunk: false,
        },
      },
      {
        cruiser: {
          position: [null, null, null],
          revealed: [null, null, null],
          isHit: [false, false, false],
          isSunk: false,
        },
      },
      {
        battleship: {
          position: [null, null, null, null],
          revealed: [null, null, null, null],
          isHit: [false, false, false, false],
          isSunk: false,
        },
      },
      {
        carrier: {
          position: [null, null, null, null, null],
          revealed: [null, null, null, null, null],
          isHit: [false, false, false, false, false],
          isSunk: false,
        },
      },
    ]);
    setHardIsHit([false, "", null, null]);
    setAttackPosition(null);
    setSquaresHumanAttacked([null]);
    setSquaresComputerAttacked([null]);
    gameStarted(false);
    setHumanWin(false);
    setComputerWin(false);
    setNotifications([null]);
    setImpossibleTracker(0);
    setDifficulty(1);
  };

  // Notification Display
  const NotificationItem = notifications.map((item, index) => (
    <NotificationItems key={index}> {item}</NotificationItems>
  ));
  return (
    <>
      <BoardOutterContainer>
        {/* Place Ship Buttons */}
        {!started ? (
          <ButtonsContainer>
            {!started ? (
              <SettingsDiv>
                <DifficultyDiv>
                  <PlaceBoatsDiv>Pick your Difficulty</PlaceBoatsDiv>
                  <BoatSelectorButton
                    style={{ background: "#3FBD8B", color: "#111111" }}
                    onClick={() => setDifficulty(1)}
                  >
                    Easy
                  </BoatSelectorButton>
                  <BoatSelectorButton
                    style={{ background: "#C8BD58", color: "#111111" }}
                    onClick={() => setDifficulty(2)}
                  >
                    Hard
                  </BoatSelectorButton>
                  <BoatSelectorButton
                    style={{ background: "#BD100F", color: "#eeeeee" }}
                    onClick={() => setDifficulty(3)}
                  >
                    Impossible
                  </BoatSelectorButton>
                </DifficultyDiv>
                <BoatsDiv>
                  {humanBoats[0].destroyer.position[0] &&
                  humanBoats[1].submarine.position[0] &&
                  humanBoats[2].cruiser.position[0] &&
                  humanBoats[3].battleship.position[0] &&
                  humanBoats[4].carrier.position[0] ? (
                    <StartGameButton onClick={() => checkHumanBoats()}>
                      Start
                    </StartGameButton>
                  ) : (
                    <PlaceBoatsDiv>Place your boats!</PlaceBoatsDiv>
                  )}
                  <BoatSelectorButton
                    style={{ color: "#111111" }}
                    onClick={() => positionHumanBoatDestroyer()}
                  >
                    Destroyer
                  </BoatSelectorButton>
                  <BoatSelectorButton
                    style={{ background: "#C76EFF" }}
                    onClick={() => positionHumanBoatSubmarine()}
                  >
                    Submarine
                  </BoatSelectorButton>
                  <BoatSelectorButton
                    style={{ background: "#811DBF" }}
                    onClick={() => positionHumanBoatCruiser()}
                  >
                    Cruiser
                  </BoatSelectorButton>
                  <BoatSelectorButton
                    style={{ background: "#8B4D83" }}
                    onClick={() => positionHumanBoatBattleship()}
                  >
                    Battleship
                  </BoatSelectorButton>
                  <BoatSelectorButton
                    style={{ background: "#643780" }}
                    onClick={() => positionHumanBoatCarrier()}
                  >
                    Carrier
                  </BoatSelectorButton>
                  <BoatSelectorButton
                    style={{ background: "#C8BD58", color: "#111111" }}
                    onClick={() => rotateHumanBoat()}
                  >
                    Rotate
                  </BoatSelectorButton>
                </BoatsDiv>
              </SettingsDiv>
            ) : null}
          </ButtonsContainer>
        ) : null}

        <BoardTitlesContainer>
          {/* Human Board */}
          <BoardTitleContainer>
            {humanWin ? (
              <BoardTitle>Human Wins!</BoardTitle>
            ) : computerWin ? (
              <BoardTitle>Human Loses!</BoardTitle>
            ) : (
              <BoardTitle>Your Board</BoardTitle>
            )}
            <BoardContainer>
              {board.map((boatPosition, index) => {
                return (
                  <Square
                    key={index}
                    style={{
                      background:
                        humanBoats[0].destroyer.position[0] === boatPosition
                          ? "#e3befa"
                          : humanBoats[0].destroyer.position[1] === boatPosition
                          ? "#e3befa"
                          : humanBoats[1].submarine.position[0] === boatPosition
                          ? "#C76EFF"
                          : humanBoats[1].submarine.position[1] === boatPosition
                          ? "#C76EFF"
                          : humanBoats[2].cruiser.position[0] === boatPosition
                          ? "#811DBF"
                          : humanBoats[2].cruiser.position[1] === boatPosition
                          ? "#811DBF"
                          : humanBoats[2].cruiser.position[2] === boatPosition
                          ? "#811DBF"
                          : humanBoats[3].battleship.position[0] ===
                            boatPosition
                          ? "#8B4D83"
                          : humanBoats[3].battleship.position[1] ===
                            boatPosition
                          ? "#8B4D83"
                          : humanBoats[3].battleship.position[2] ===
                            boatPosition
                          ? "#8B4D83"
                          : humanBoats[3].battleship.position[3] ===
                            boatPosition
                          ? "#8B4D83"
                          : humanBoats[4].carrier.position[0] === boatPosition
                          ? "#643780"
                          : humanBoats[4].carrier.position[1] === boatPosition
                          ? "#643780"
                          : humanBoats[4].carrier.position[2] === boatPosition
                          ? "#643780"
                          : humanBoats[4].carrier.position[3] === boatPosition
                          ? "#643780"
                          : humanBoats[4].carrier.position[4] === boatPosition
                          ? "#643780"
                          : squaresComputerAttacked.includes(boatPosition)
                          ? "#FF9387"
                          : computerWin || humanWin === true
                          ? "#FDFFBA"
                          : "",
                      color:
                        humanBoats[0].destroyer.revealed[0] === boatPosition
                          ? "#eeeeee"
                          : humanBoats[0].destroyer.revealed[1] === boatPosition
                          ? "#eeeeee"
                          : humanBoats[1].submarine.revealed[0] === boatPosition
                          ? "#eeeeee"
                          : humanBoats[1].submarine.revealed[1] === boatPosition
                          ? "#eeeeee"
                          : humanBoats[2].cruiser.revealed[0] === boatPosition
                          ? "#eeeeee"
                          : humanBoats[2].cruiser.revealed[1] === boatPosition
                          ? "#eeeeee"
                          : humanBoats[2].cruiser.revealed[2] === boatPosition
                          ? "#eeeeee"
                          : humanBoats[3].battleship.revealed[0] ===
                            boatPosition
                          ? "#eeeeee"
                          : humanBoats[3].battleship.revealed[1] ===
                            boatPosition
                          ? "#eeeeee"
                          : humanBoats[3].battleship.revealed[2] ===
                            boatPosition
                          ? "#eeeeee"
                          : humanBoats[3].battleship.revealed[3] ===
                            boatPosition
                          ? "#eeeeee"
                          : humanBoats[4].carrier.revealed[0] === boatPosition
                          ? "#eeeeee"
                          : humanBoats[4].carrier.revealed[1] === boatPosition
                          ? "#eeeeee"
                          : humanBoats[4].carrier.revealed[2] === boatPosition
                          ? "#eeeeee"
                          : humanBoats[4].carrier.revealed[3] === boatPosition
                          ? "#eeeeee"
                          : humanBoats[4].carrier.revealed[4] === boatPosition
                          ? "#eeeeee"
                          : "",
                    }}
                    value={boatPosition}
                    // Cannot click on human board if game is started
                    onClick={
                      !started &&
                      !humanWin &&
                      !computerWin &&
                      humanBoats[0].destroyer.active
                        ? () => positionHumanBoatDestroyer(boatPosition)
                        : !started &&
                          !humanWin &&
                          !computerWin &&
                          humanBoats[1].submarine.active
                        ? () => positionHumanBoatSubmarine(boatPosition)
                        : !started &&
                          !humanWin &&
                          !computerWin &&
                          humanBoats[2].cruiser.active
                        ? () => positionHumanBoatCruiser(boatPosition)
                        : !started &&
                          !humanWin &&
                          !computerWin &&
                          humanBoats[3].battleship.active
                        ? () => positionHumanBoatBattleship(boatPosition)
                        : !started &&
                          !humanWin &&
                          !computerWin &&
                          humanBoats[4].carrier.active
                        ? () => positionHumanBoatCarrier(boatPosition)
                        : null
                    }
                  >
                    X
                  </Square>
                );
              })}
            </BoardContainer>
          </BoardTitleContainer>

          {/* Computer Board */}
          <BoardTitleContainer>
            {computerWin ? (
              <BoardTitle>Computer Wins!</BoardTitle>
            ) : humanWin ? (
              <BoardTitle>Computer Loses!</BoardTitle>
            ) : (
              <BoardTitle>Computer's Board</BoardTitle>
            )}
            <BoardContainer>
              {board.map((computerBoatPosition, index) => {
                return (
                  <Square
                    key={index}
                    style={{
                      background:
                        attackPosition === computerBoatPosition
                          ? "red"
                          : computerBoats[0].destroyer.revealed[0] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[0].destroyer.revealed[1] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[1].submarine.revealed[0] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[1].submarine.revealed[1] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[2].cruiser.revealed[0] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[2].cruiser.revealed[1] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[2].cruiser.revealed[2] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[3].battleship.revealed[0] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[3].battleship.revealed[1] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[3].battleship.revealed[2] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[3].battleship.revealed[3] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[4].carrier.revealed[0] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[4].carrier.revealed[1] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[4].carrier.revealed[2] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[4].carrier.revealed[3] ===
                            computerBoatPosition
                          ? "#111111"
                          : computerBoats[4].carrier.revealed[4] ===
                            computerBoatPosition
                          ? "#111111"
                          : squaresHumanAttacked.includes(computerBoatPosition)
                          ? "#FF9387"
                          : humanWin || computerWin === true
                          ? "#FDFFBA"
                          : "",
                      color:
                        computerBoats[0].destroyer.revealed[0] ===
                        computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[0].destroyer.revealed[1] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[1].submarine.revealed[0] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[1].submarine.revealed[1] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[2].cruiser.revealed[0] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[2].cruiser.revealed[1] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[2].cruiser.revealed[2] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[3].battleship.revealed[0] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[3].battleship.revealed[1] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[3].battleship.revealed[2] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[3].battleship.revealed[3] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[4].carrier.revealed[0] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[4].carrier.revealed[1] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[4].carrier.revealed[2] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[4].carrier.revealed[3] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : computerBoats[4].carrier.revealed[4] ===
                            computerBoatPosition
                          ? "#eeeeee"
                          : "",
                    }}
                    value={computerBoatPosition}
                    // Can click on computer board if game is started
                    onClick={
                      started && !humanWin && !computerWin
                        ? () => attackComputer(computerBoatPosition)
                        : null
                    }
                  >
                    X
                  </Square>
                );
              })}
            </BoardContainer>
          </BoardTitleContainer>
        </BoardTitlesContainer>
        {/* Game Buttons */}
        {started ? (
          <RightSideContainer>
            <RightSideButtonsDiv>
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
            </RightSideButtonsDiv>
            <NotificationsBoard>{NotificationItem}</NotificationsBoard>
          </RightSideContainer>
        ) : null}
      </BoardOutterContainer>
    </>
  );
};

export default Board;
