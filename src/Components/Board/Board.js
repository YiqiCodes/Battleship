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
  PlaceBoatsDiv,
} from "./Board.styles";

const Board = () => {
  const [started, gameStarted] = useState(false);
  const [humanBoats, setHumanBoats] = useState([
    {
      destroyer: {
        position: [null, null],
        revealed: [null, null],
        active: false,
        isHit: [null, null],
        isSunk: false,
      },
    },
    {
      submarine: {
        position: [null, null],
        revealed: [null, null],
        active: false,
        isHit: [null, null],
        isSunk: false,
      },
    },
    {
      cruiser: {
        position: [null, null, null],
        revealed: [null, null, null],
        active: false,
        isHit: [null, null, null],
        isSunk: false,
      },
    },
    {
      battleship: {
        position: [null, null, null, null],
        revealed: [null, null, null, null],
        active: false,
        isHit: [null, null, null, null],
        isSunk: false,
      },
    },
    {
      carrier: {
        position: [null, null, null, null, null],
        revealed: [null, null, null, null, null],
        active: false,
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

  useEffect(() => {
    checkHumanWin();
    checkComputerWin();
  });

  // Board Logic
  let board = [];
  for (let i = 1; i <= 100; i++) board.push(i);

  // Start the game && position Computer boat
  const startGame = () => {
    if (
      humanBoats[0].destroyer.position &&
      humanBoats[1].submarine.position &&
      humanBoats[2].cruiser.position &&
      humanBoats[3].battleship.position &&
      humanBoats[4].carrier.position
    ) {
      positionComputerBoat();
      gameStarted(true);
    }
  };

  // NEED TO CONSIDER ROTATION AND OVERLAP FOR HUMAN BOATS
  // Human sets boat position
  const positionHumanDestroyer = (position) => {
    let activeHumanBoats = [...humanBoats];
    activeHumanBoats[0].destroyer.active = true;
    activeHumanBoats[1].submarine.active = false;
    activeHumanBoats[2].cruiser.active = false;
    activeHumanBoats[3].battleship.active = false;
    activeHumanBoats[4].carrier.active = false;
    activeHumanBoats[0].destroyer.position[0] = position;
    if (position <= 90) {
      activeHumanBoats[0].destroyer.position[1] = position + 10;
    } else {
      activeHumanBoats[0].destroyer.position[1] = position - 10;
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
    if (position <= 90) {
      activeHumanBoats[1].submarine.position[1] = position + 10;
    } else {
      activeHumanBoats[1].submarine.position[1] = position - 10;
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
    setHumanBoats(activeHumanBoats);
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
        if (positionComputerDestroyerGenerator > 10) {
          if (positionComputerDestroyerGenerator.toString()[1] === "0") {
            positionComputerDestroyer[1] =
              positionComputerDestroyerGenerator - 1;
          }
        }
        if (positionComputerDestroyerGenerator === 10) {
          positionComputerDestroyer = [10, 9];
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
        if (positionComputerSubmarineGenerator > 10) {
          if (positionComputerSubmarineGenerator.toString()[1] === "0") {
            positionComputerSubmarine[1] =
              positionComputerSubmarineGenerator - 1;
          }
        }
        if (positionComputerSubmarineGenerator === 10) {
          positionComputerSubmarine = [10, 9];
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
        if (positionComputerCruiserGenerator > 10) {
          if (positionComputerCruiserGenerator.toString()[1] === "9") {
            positionComputerCruiser[1] = positionComputerCruiserGenerator + 1;
            positionComputerCruiser[2] = positionComputerCruiserGenerator - 1;
          }
          if (positionComputerCruiserGenerator.toString()[1] === "0") {
            positionComputerCruiser[1] = positionComputerCruiserGenerator - 1;
            positionComputerCruiser[2] = positionComputerCruiserGenerator - 2;
          }
        }
        if (positionComputerCruiserGenerator <= 10) {
          if (positionComputerCruiserGenerator === 9) {
            positionComputerCruiser[1] = positionComputerCruiserGenerator + 1;
            positionComputerCruiser[2] = positionComputerCruiserGenerator - 1;
          }
          if (positionComputerCruiserGenerator === 10) {
            positionComputerCruiser[1] = positionComputerCruiserGenerator - 1;
            positionComputerCruiser[2] = positionComputerCruiserGenerator - 2;
          }
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

        if (positionComputerBattleshipGenerator > 10) {
          if (positionComputerBattleshipGenerator.toString()[1] === "8") {
            positionComputerBattleship[1] =
              positionComputerBattleshipGenerator + 1;
            positionComputerBattleship[2] =
              positionComputerBattleshipGenerator + 2;
            positionComputerBattleship[3] =
              positionComputerBattleshipGenerator - 1;
          }
          if (positionComputerBattleshipGenerator.toString()[1] === "9") {
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
        }
        if (positionComputerBattleshipGenerator <= 10) {
          if (positionComputerBattleshipGenerator === 8) {
            positionComputerBattleship[1] =
              positionComputerBattleshipGenerator + 1;
            positionComputerBattleship[2] =
              positionComputerBattleshipGenerator + 2;
            positionComputerBattleship[3] =
              positionComputerBattleshipGenerator - 1;
          }
          if (positionComputerBattleshipGenerator === 9) {
            positionComputerBattleship[1] =
              positionComputerBattleshipGenerator + 1;
            positionComputerBattleship[2] =
              positionComputerBattleshipGenerator - 1;
            positionComputerBattleship[3] =
              positionComputerBattleshipGenerator - 2;
          }
          if (positionComputerBattleshipGenerator === 10) {
            positionComputerBattleship[1] =
              positionComputerBattleshipGenerator - 1;
            positionComputerBattleship[2] =
              positionComputerBattleshipGenerator - 2;
            positionComputerBattleship[3] =
              positionComputerBattleshipGenerator - 3;
          }
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
        if (positionComputerCarrierGenerator > 10) {
          if (positionComputerCarrierGenerator.toString()[1] === "7") {
            positionComputerCarrier[1] = positionComputerCarrierGenerator + 1;
            positionComputerCarrier[2] = positionComputerCarrierGenerator + 2;
            positionComputerCarrier[3] = positionComputerCarrierGenerator + 3;
            positionComputerCarrier[4] = positionComputerCarrierGenerator - 1;
          }
          if (positionComputerCarrierGenerator.toString()[1] === "8") {
            positionComputerCarrier[1] = positionComputerCarrierGenerator + 1;
            positionComputerCarrier[2] = positionComputerCarrierGenerator + 2;
            positionComputerCarrier[3] = positionComputerCarrierGenerator - 1;
            positionComputerCarrier[4] = positionComputerCarrierGenerator - 2;
          }
          if (positionComputerCarrierGenerator.toString()[1] === "9") {
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
        }
        if (positionComputerCarrierGenerator <= 10) {
          if (positionComputerCarrierGenerator === 7) {
            positionComputerCarrier[1] = positionComputerCarrierGenerator + 1;
            positionComputerCarrier[2] = positionComputerCarrierGenerator + 2;
            positionComputerCarrier[3] = positionComputerCarrierGenerator + 3;
            positionComputerCarrier[4] = positionComputerCarrierGenerator - 1;
          }
          if (positionComputerCarrierGenerator === 8) {
            positionComputerCarrier[1] = positionComputerCarrierGenerator + 1;
            positionComputerCarrier[2] = positionComputerCarrierGenerator + 2;
            positionComputerCarrier[3] = positionComputerCarrierGenerator - 1;
            positionComputerCarrier[4] = positionComputerCarrierGenerator - 2;
          }
          if (positionComputerCarrierGenerator === 9) {
            positionComputerCarrier[1] = positionComputerCarrierGenerator + 1;
            positionComputerCarrier[2] = positionComputerCarrierGenerator - 1;
            positionComputerCarrier[3] = positionComputerCarrierGenerator - 2;
            positionComputerCarrier[4] = positionComputerCarrierGenerator - 3;
          }
          if (positionComputerCarrierGenerator === 10) {
            positionComputerCarrier[1] = positionComputerCarrierGenerator - 1;
            positionComputerCarrier[2] = positionComputerCarrierGenerator - 2;
            positionComputerCarrier[3] = positionComputerCarrierGenerator - 3;
            positionComputerCarrier[4] = positionComputerCarrierGenerator - 4;
          }
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

  const finalizeAttack = (finalAttack) => {
    const humanTurn = () => {
      // Add to squares Human attacked
      setSquaresHumanAttacked([...squaresHumanAttacked, finalAttack]);

      let computerBoatsUpdated = [...computerBoats];

      // Check if Human hit
      if (finalAttack === computerBoats[0].destroyer.position[0]) {
        computerBoatsUpdated[0].destroyer.revealed[0] = finalAttack;
        computerBoatsUpdated[0].destroyer.isHit[0] = true;
        if (computerBoatsUpdated[0].destroyer.isHit[1] === true)
          computerBoatsUpdated[0].destroyer.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }
      if (finalAttack === computerBoats[0].destroyer.position[1]) {
        computerBoatsUpdated[0].destroyer.revealed[1] = finalAttack;
        computerBoatsUpdated[0].destroyer.isHit[1] = true;
        if (computerBoatsUpdated[0].destroyer.isHit[0] === true)
          computerBoatsUpdated[0].destroyer.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }

      if (finalAttack === computerBoats[1].submarine.position[0]) {
        computerBoatsUpdated[1].submarine.revealed[0] = finalAttack;
        computerBoatsUpdated[1].submarine.isHit[0] = true;
        if (computerBoatsUpdated[1].submarine.isHit[1] === true)
          computerBoatsUpdated[1].submarine.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }

      if (finalAttack === computerBoats[1].submarine.position[1]) {
        computerBoatsUpdated[1].submarine.revealed[1] = finalAttack;
        computerBoatsUpdated[1].submarine.isHit[1] = true;
        if (computerBoatsUpdated[1].submarine.isHit[0] === true)
          computerBoatsUpdated[1].submarine.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }

      if (finalAttack === computerBoats[2].cruiser.position[0]) {
        computerBoatsUpdated[2].cruiser.revealed[0] = finalAttack;
        computerBoatsUpdated[2].cruiser.isHit[0] = true;
        if (
          computerBoatsUpdated[2].cruiser.isHit[1] === true &&
          computerBoatsUpdated[2].cruiser.isHit[2] === true
        )
          computerBoatsUpdated[2].cruiser.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }

      if (finalAttack === computerBoats[2].cruiser.position[1]) {
        computerBoatsUpdated[2].cruiser.revealed[1] = finalAttack;
        computerBoatsUpdated[2].cruiser.isHit[1] = true;
        if (
          computerBoatsUpdated[2].cruiser.isHit[0] === true &&
          computerBoatsUpdated[2].cruiser.isHit[2] === true
        )
          computerBoatsUpdated[2].cruiser.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }

      if (finalAttack === computerBoats[2].cruiser.position[2]) {
        computerBoatsUpdated[2].cruiser.revealed[2] = finalAttack;
        computerBoatsUpdated[2].cruiser.isHit[2] = true;
        if (
          computerBoatsUpdated[2].cruiser.isHit[1] === true &&
          computerBoatsUpdated[2].cruiser.isHit[2] === true
        )
          computerBoatsUpdated[2].cruiser.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }

      if (finalAttack === computerBoats[3].battleship.position[0]) {
        computerBoatsUpdated[3].battleship.revealed[0] = finalAttack;
        computerBoatsUpdated[3].battleship.isHit[0] = true;
        if (
          computerBoatsUpdated[3].battleship.isHit[1] === true &&
          computerBoatsUpdated[3].battleship.isHit[2] === true &&
          computerBoatsUpdated[3].battleship.isHit[3] === true
        )
          computerBoatsUpdated[3].battleship.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }

      if (finalAttack === computerBoats[3].battleship.position[1]) {
        computerBoatsUpdated[3].battleship.revealed[1] = finalAttack;
        computerBoatsUpdated[3].battleship.isHit[1] = true;
        if (
          computerBoatsUpdated[3].battleship.isHit[0] === true &&
          computerBoatsUpdated[3].battleship.isHit[2] === true &&
          computerBoatsUpdated[3].battleship.isHit[3] === true
        )
          computerBoatsUpdated[3].battleship.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }

      if (finalAttack === computerBoats[3].battleship.position[2]) {
        computerBoatsUpdated[3].battleship.revealed[2] = finalAttack;
        computerBoatsUpdated[3].battleship.isHit[2] = true;
        if (
          computerBoatsUpdated[3].battleship.isHit[0] === true &&
          computerBoatsUpdated[3].battleship.isHit[1] === true &&
          computerBoatsUpdated[3].battleship.isHit[3] === true
        )
          computerBoatsUpdated[3].battleship.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }

      if (finalAttack === computerBoats[3].battleship.position[3]) {
        computerBoatsUpdated[3].battleship.revealed[3] = finalAttack;
        computerBoatsUpdated[3].battleship.isHit[3] = true;
        if (
          computerBoatsUpdated[3].battleship.isHit[0] === true &&
          computerBoatsUpdated[3].battleship.isHit[1] === true &&
          computerBoatsUpdated[3].battleship.isHit[2] === true
        )
          computerBoatsUpdated[3].battleship.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }

      if (finalAttack === computerBoats[4].carrier.position[0]) {
        computerBoatsUpdated[4].carrier.revealed[0] = finalAttack;
        computerBoatsUpdated[4].carrier.isHit[0] = true;
        if (
          computerBoatsUpdated[4].carrier.isHit[1] === true &&
          computerBoatsUpdated[4].carrier.isHit[2] === true &&
          computerBoatsUpdated[4].carrier.isHit[3] === true &&
          computerBoatsUpdated[4].carrier.isHit[4] === true
        )
          computerBoatsUpdated[4].carrier.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }
      if (finalAttack === computerBoats[4].carrier.position[1]) {
        computerBoatsUpdated[4].carrier.revealed[1] = finalAttack;
        computerBoatsUpdated[4].carrier.isHit[1] = true;
        if (
          computerBoatsUpdated[4].carrier.isHit[0] === true &&
          computerBoatsUpdated[4].carrier.isHit[2] === true &&
          computerBoatsUpdated[4].carrier.isHit[3] === true &&
          computerBoatsUpdated[4].carrier.isHit[4] === true
        )
          computerBoatsUpdated[4].carrier.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }
      if (finalAttack === computerBoats[4].carrier.position[2]) {
        computerBoatsUpdated[4].carrier.revealed[2] = finalAttack;
        computerBoatsUpdated[4].carrier.isHit[2] = true;
        if (
          computerBoatsUpdated[4].carrier.isHit[0] === true &&
          computerBoatsUpdated[4].carrier.isHit[1] === true &&
          computerBoatsUpdated[4].carrier.isHit[3] === true &&
          computerBoatsUpdated[4].carrier.isHit[4] === true
        )
          computerBoatsUpdated[4].carrier.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }
      if (finalAttack === computerBoats[4].carrier.position[3]) {
        computerBoatsUpdated[4].carrier.revealed[3] = finalAttack;
        computerBoatsUpdated[4].carrier.isHit[3] = true;
        if (
          computerBoatsUpdated[4].carrier.isHit[0] === true &&
          computerBoatsUpdated[4].carrier.isHit[1] === true &&
          computerBoatsUpdated[4].carrier.isHit[2] === true &&
          computerBoatsUpdated[4].carrier.isHit[4] === true
        )
          computerBoatsUpdated[4].carrier.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
      }
      if (finalAttack === computerBoats[4].carrier.position[4]) {
        computerBoatsUpdated[4].carrier.revealed[4] = finalAttack;
        computerBoatsUpdated[4].carrier.isHit[4] = true;
        if (
          computerBoatsUpdated[4].carrier.isHit[0] === true &&
          computerBoatsUpdated[4].carrier.isHit[1] === true &&
          computerBoatsUpdated[4].carrier.isHit[2] === true &&
          computerBoatsUpdated[4].carrier.isHit[3] === true
        )
          computerBoatsUpdated[4].carrier.isSunk = true;
        setComputerBoats(computerBoatsUpdated);
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
        let humanBoatsUpdated = [...humanBoats];

        // Check if Computer hit/win function
        if (computerAttack === humanBoats[0].destroyer.position[0]) {
          humanBoatsUpdated[0].destroyer.revealed[0] = computerAttack;
          humanBoatsUpdated[0].destroyer.isHit[0] = true;
          if (humanBoatsUpdated[0].destroyer.isHit[1] === true)
            humanBoatsUpdated[0].destroyer.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }
        if (computerAttack === humanBoats[0].destroyer.position[1]) {
          humanBoatsUpdated[0].destroyer.revealed[1] = computerAttack;
          humanBoatsUpdated[0].destroyer.isHit[1] = true;
          if (humanBoatsUpdated[0].destroyer.isHit[0] === true)
            humanBoatsUpdated[0].destroyer.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }

        if (computerAttack === humanBoats[1].submarine.position[0]) {
          humanBoatsUpdated[1].submarine.revealed[0] = computerAttack;
          humanBoatsUpdated[1].submarine.isHit[0] = true;
          if (humanBoatsUpdated[1].submarine.isHit[1])
            humanBoatsUpdated[1].submarine.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }
        if (computerAttack === humanBoats[1].submarine.position[1]) {
          humanBoatsUpdated[1].submarine.revealed[1] = computerAttack;
          humanBoatsUpdated[1].submarine.isHit[1] = true;
          if (humanBoatsUpdated[1].submarine.isHit[0])
            humanBoatsUpdated[1].submarine.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }

        if (computerAttack === humanBoats[2].cruiser.position[0]) {
          humanBoatsUpdated[2].cruiser.revealed[0] = computerAttack;
          humanBoatsUpdated[2].cruiser.isHit[0] = true;
          if (
            humanBoatsUpdated[2].cruiser.isHit[1] &&
            humanBoatsUpdated[2].cruiser.isHit[2]
          )
            humanBoatsUpdated[2].cruiser.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }
        if (computerAttack === humanBoats[2].cruiser.position[1]) {
          humanBoatsUpdated[2].cruiser.revealed[1] = computerAttack;
          humanBoatsUpdated[2].cruiser.isHit[1] = true;
          if (
            humanBoatsUpdated[2].cruiser.isHit[0] &&
            humanBoatsUpdated[2].cruiser.isHit[2]
          )
            humanBoatsUpdated[2].cruiser.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }
        if (computerAttack === humanBoats[2].cruiser.position[2]) {
          humanBoatsUpdated[2].cruiser.revealed[2] = computerAttack;
          humanBoatsUpdated[2].cruiser.isHit[2] = true;
          if (
            humanBoatsUpdated[2].cruiser.isHit[0] &&
            humanBoatsUpdated[2].cruiser.isHit[1]
          )
            humanBoatsUpdated[2].cruiser.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }

        if (computerAttack === humanBoats[3].battleship.position[0]) {
          humanBoatsUpdated[3].battleship.revealed[0] = computerAttack;
          humanBoatsUpdated[3].battleship.isHit[0] = true;
          if (
            humanBoatsUpdated[3].battleship.isHit[1] &&
            humanBoatsUpdated[3].battleship.isHit[2] &&
            humanBoatsUpdated[3].battleship.isHit[3]
          )
            humanBoatsUpdated[3].battleship.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }
        if (computerAttack === humanBoats[3].battleship.position[1]) {
          humanBoatsUpdated[3].battleship.revealed[1] = computerAttack;
          humanBoatsUpdated[3].battleship.isHit[1] = true;
          if (
            humanBoatsUpdated[3].battleship.isHit[0] &&
            humanBoatsUpdated[3].battleship.isHit[2] &&
            humanBoatsUpdated[3].battleship.isHit[3]
          )
            humanBoatsUpdated[3].battleship.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }
        if (computerAttack === humanBoats[3].battleship.position[2]) {
          humanBoatsUpdated[3].battleship.revealed[2] = computerAttack;
          humanBoatsUpdated[3].battleship.isHit[2] = true;
          if (
            humanBoatsUpdated[3].battleship.isHit[0] &&
            humanBoatsUpdated[3].battleship.isHit[1] &&
            humanBoatsUpdated[3].battleship.isHit[2]
          )
            humanBoatsUpdated[3].battleship.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }
        if (computerAttack === humanBoats[3].battleship.position[3]) {
          humanBoatsUpdated[3].battleship.revealed[3] = computerAttack;
          humanBoatsUpdated[3].battleship.isHit[3] = true;
          if (
            humanBoatsUpdated[3].battleship.isHit[0] &&
            humanBoatsUpdated[3].battleship.isHit[1] &&
            humanBoatsUpdated[3].battleship.isHit[2]
          )
            humanBoatsUpdated[3].battleship.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }

        if (computerAttack === humanBoats[4].carrier.position[0]) {
          humanBoatsUpdated[4].carrier.revealed[0] = computerAttack;
          humanBoatsUpdated[4].carrier.isHit[0] = true;
          if (
            humanBoatsUpdated[4].carrier.isHit[1] &&
            humanBoatsUpdated[4].carrier.isHit[2] &&
            humanBoatsUpdated[4].carrier.isHit[3] &&
            humanBoatsUpdated[4].carrier.isHit[4]
          )
            humanBoatsUpdated[4].carrier.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }
        if (computerAttack === humanBoats[4].carrier.position[1]) {
          humanBoatsUpdated[4].carrier.revealed[1] = computerAttack;
          humanBoatsUpdated[4].carrier.isHit[1] = true;
          if (
            humanBoatsUpdated[4].carrier.isHit[0] &&
            humanBoatsUpdated[4].carrier.isHit[2] &&
            humanBoatsUpdated[4].carrier.isHit[3] &&
            humanBoatsUpdated[4].carrier.isHit[4]
          )
            humanBoatsUpdated[4].carrier.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }
        if (computerAttack === humanBoats[4].carrier.position[2]) {
          humanBoatsUpdated[4].carrier.revealed[2] = computerAttack;
          humanBoatsUpdated[4].carrier.isHit[2] = true;
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
          if (
            humanBoatsUpdated[4].carrier.isHit[0] &&
            humanBoatsUpdated[4].carrier.isHit[1] &&
            humanBoatsUpdated[4].carrier.isHit[2] &&
            humanBoatsUpdated[4].carrier.isHit[4]
          )
            humanBoatsUpdated[4].carrier.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
        }
        if (computerAttack === humanBoats[4].carrier.position[4]) {
          humanBoatsUpdated[4].carrier.revealed[4] = computerAttack;
          humanBoatsUpdated[4].carrier.isHit[4] = true;
          if (
            humanBoatsUpdated[4].carrier.isHit[0] &&
            humanBoatsUpdated[4].carrier.isHit[1] &&
            humanBoatsUpdated[4].carrier.isHit[2] &&
            humanBoatsUpdated[4].carrier.isHit[3]
          )
            humanBoatsUpdated[4].carrier.isSunk = true;
          setHumanBoats(humanBoatsUpdated);
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
      computerBoats[0].destroyer.isSunk === true &&
      computerBoats[1].submarine.isSunk === true &&
      computerBoats[2].cruiser.isSunk === true &&
      computerBoats[3].battleship.isSunk === true &&
      computerBoats[4].carrier.isSunk === true
    ) {
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
      // console.log("COMPUTER WIN");
      setComputerWin(true);
    }
  };

  const restartGame = () => {
    setHumanBoats([
      {
        destroyer: {
          position: [null, null],
          revealed: [null, null],
          active: false,
          isHit: [null, null],
          isSunk: false,
        },
      },
      {
        submarine: {
          position: [null, null],
          revealed: [null, null],
          active: false,
          isHit: [null, null],
          isSunk: false,
        },
      },
      {
        cruiser: {
          position: [null, null, null],
          revealed: [null, null, null],
          active: false,
          isHit: [null, null, null],
          isSunk: false,
        },
      },
      {
        battleship: {
          position: [null, null, null, null],
          revealed: [null, null, null, null],
          active: false,
          isHit: [null, null, null, null],
          isSunk: false,
        },
      },
      {
        carrier: {
          position: [null, null, null, null, null],
          revealed: [null, null, null, null, null],
          active: false,
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

    setAttackPosition(null);
    setSquaresHumanAttacked([null]);
    setSquaresComputerAttacked([null]);
    gameStarted(false);
    setHumanWin(false);
    setComputerWin(false);
  };

  // console.log("is game started??", started);
  console.log("human boats:", humanBoats);
  // console.log("computer boat position", computerBoats[0].destroyer.position);
  // console.log("computer boat 2 position", computerBoats[1].submarine.position);
  // console.log("computer boat 3 position", computerBoats[2].cruiser.position);
  // console.log("computer boat 4 position", computerBoats[3].battleship.position);
  // console.log("computer boat 5 position", computerBoats[4].carrier.position);
  console.log("computer boat hit", computerBoats);
  // console.log("human boat position", humanBoat);
  // console.log("computer boat sunk?", computerBoatsHit);
  // console.log("boats hit:", humanBoatsHit);

  return (
    <>
      <BoardOutterContainer>
        {/* Place Ship Buttons */}
        {/* <StartGameButton onClick={() => startGame()}>Start</StartGameButton> */}
        <ButtonsContainer>
          {!started ? (
            <>
              {humanBoats[0].destroyer.position &&
              humanBoats[1].submarine.position &&
              humanBoats[2].cruiser.position &&
              humanBoats[3].battleship.position &&
              humanBoats[4].carrier.position ? (
                <StartGameButton onClick={() => startGame()}>
                  Start
                </StartGameButton>
              ) : (
                <PlaceBoatsDiv>Place your boats!</PlaceBoatsDiv>
              )}
              <BoatSelectorButton onClick={() => positionHumanDestroyer()}>
                Destroyer
              </BoatSelectorButton>
              <BoatSelectorButton
                style={{ background: "#A89E96" }}
                onClick={() => positionHumanBoatSubmarine()}
              >
                Submarine
              </BoatSelectorButton>
              <BoatSelectorButton
                style={{ background: "#C29570" }}
                onClick={() => positionHumanBoatCruiser()}
              >
                Cruiser
              </BoatSelectorButton>
              <BoatSelectorButton
                style={{ background: "#8f7e53" }}
                onClick={() => positionHumanBoatBattleship()}
              >
                Battleship
              </BoatSelectorButton>
              <BoatSelectorButton
                style={{ background: "#423e3a", color: "#eeeeee" }}
                onClick={() => positionHumanBoatCarrier()}
              >
                Carrier
              </BoatSelectorButton>
            </>
          ) : null}
        </ButtonsContainer>

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
                      humanBoats[0].destroyer.position[0] === boatPosition
                        ? "#D4CEC4"
                        : humanBoats[0].destroyer.position[1] === boatPosition
                        ? "#D4CEC4"
                        : humanBoats[1].submarine.position[0] === boatPosition
                        ? "#A89E96"
                        : humanBoats[1].submarine.position[1] === boatPosition
                        ? "#A89E96"
                        : humanBoats[2].cruiser.position[0] === boatPosition
                        ? "#C29570"
                        : humanBoats[2].cruiser.position[1] === boatPosition
                        ? "#C29570"
                        : humanBoats[2].cruiser.position[2] === boatPosition
                        ? "#C29570"
                        : humanBoats[3].battleship.position[0] === boatPosition
                        ? "#8f7e53"
                        : humanBoats[3].battleship.position[1] === boatPosition
                        ? "#8f7e53"
                        : humanBoats[3].battleship.position[2] === boatPosition
                        ? "#8f7e53"
                        : humanBoats[3].battleship.position[3] === boatPosition
                        ? "#8f7e53"
                        : humanBoats[4].carrier.position[0] === boatPosition
                        ? "#423e3a"
                        : humanBoats[4].carrier.position[1] === boatPosition
                        ? "#423e3a"
                        : humanBoats[4].carrier.position[2] === boatPosition
                        ? "#423e3a"
                        : humanBoats[4].carrier.position[3] === boatPosition
                        ? "#423e3a"
                        : humanBoats[4].carrier.position[4] === boatPosition
                        ? "#423e3a"
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
                        : humanBoats[3].battleship.revealed[0] === boatPosition
                        ? "#eeeeee"
                        : humanBoats[3].battleship.revealed[1] === boatPosition
                        ? "#eeeeee"
                        : humanBoats[3].battleship.revealed[2] === boatPosition
                        ? "#eeeeee"
                        : humanBoats[3].battleship.revealed[3] === boatPosition
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
                      ? () => positionHumanDestroyer(boatPosition)
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

        {/* Game Buttons */}
        <ButtonsContainer>
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
