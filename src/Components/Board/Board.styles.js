import styled from "styled-components";

export const BoardOutterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 520px;
  margin: 2rem;
`;

export const Square = styled.div`
  width: 50px;
  height: 50px;
  background: #eeeeee;
  border: 1px solid slategray;
`;

export const StartGameButton = styled.button`
  width: 5rem;
  height: 2rem;
  background: red;
`;

export const ShootButton = styled.button`
  width: 5rem;
  height: 2rem;
  background: red;
`;
