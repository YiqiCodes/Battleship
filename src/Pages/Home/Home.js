import React from "react";

// Components
import Board from "../../Components/Board/Board";

// Styles
import { BoardDiv } from "./Home.styles";

const Home = () => {
  return (
    <>
      <BoardDiv>
        <Board />
      </BoardDiv>
    </>
  );
};

export default Home;
