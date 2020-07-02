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
  width: 320px;
  height: 320px;
  margin: 2rem;
  border: 1rem solid #88c7d1;
`;

export const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: #eeeeee;
  border: 1px solid #88c7d1;
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
  background: #89ba88;
  border-radius: 8px;
`;

export const RestartGameButton = styled.button`
  width: 5rem;
  height: 2rem;
  background: #88c7d1;
  border-radius: 8px;
`;

export const ShootButton = styled.button`
  width: 5rem;
  height: 2rem;
  background: #bd4a47;
  border-radius: 8px;
`;

export const BoatSelectorButton = styled.button`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 5rem;
  height: 2rem;
  background: #d4cec4;
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
