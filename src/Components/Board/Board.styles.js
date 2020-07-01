import styled from "styled-components";

export const BoardOutterContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BoardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 275px;
  margin: 2rem;
`;

export const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background: #eeeeee;
  border: 1px solid slategray;
  color: transparent;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const StartGameButton = styled.button`
  width: 5rem;
  height: 2rem;
  background: green;
  border-radius: 8px;
`;

export const RestartGameButton = styled.button`
  width: 5rem;
  height: 2rem;
  background: slategray;
`;

export const ShootButton = styled.button`
  width: 5rem;
  height: 2rem;
  background: red;
`;

export const BoatSelectorButton = styled.button`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 5rem;
  height: 2rem;
  background: pink;
  border-radius: 8px;
`;

export const PlaceBoatsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  font-size: x-small;
  width: 5rem;
  height: 2rem;
  background: #eeeeee;
  color: #111111;
`;
