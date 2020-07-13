import styled from "styled-components";

export const BoardOutterContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const BoardTitlesContainer = styled.div`
  display: flex;
  @media screen and (max-width: 1100px) {
    height: 100%;
    flex-direction: row;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

export const BoardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  width: 400px;
  @media screen and (max-width: 1100px) {
    width: 250px;
    height: 250px;
  }
`;

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 320px;
  height: 320px;
  margin: 2rem;
  border: 1rem solid #88c7d1;
  @media screen and (max-width: 1100px) {
    width: 170px;
    height: 170px;
  }
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
  @media screen and (max-width: 1100px) {
    width: 15px;
    height: 15px;
  }
`;

export const RightSideContainer = styled.div`
  height: 500px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 1rem;
  @media screen and (max-width: 1100px) {
    width: 150px;
    height: 150px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 250px;
  height: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const RightSideButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 4px;
  margin: 10px 0px;
  border-radius: 8px;
  background: #eeeeee;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    max-width: 100px;
  }
`;

export const StartGameButton = styled.button`
  width: 5rem;
  height: 2rem;
  background: #3fbd8b;
  border-radius: 8px;
`;

export const RestartGameButton = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 8px;
  margin: 10px 0px;
  background: #48bd70;
  color: #111111;
  opacity: 0.75;
  :hover {
    opacity: 1;
  }
`;

export const ShootButton = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 8px;
  margin: 10px 0px;
  background: #ff7f7a;
  color: #111111;
  opacity: 0.75;
  :hover {
    opacity: 1;
  }
`;

export const BoatSelectorButton = styled.button`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 5rem;
  height: 2rem;
  background: #e3befa;
  color: #eeeeee;
  border-radius: 8px;
  border: 2px solid #111111;
  margin: 4px 0px;
  opacity: 0.75;
  :hover {
    opacity: 1;
  }
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
  color: #eeeeee;
  background: #111111;
`;

export const DifficultyDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  background: #eeeeee;
  @media screen and (max-width: 376px) {
    margin-bottom: 1rem;
  }
`;

export const BoatsDiv = styled.div`
  background: #eeeeee;
  border-radius: 8px;
  margin: 0 10px;
  padding: 10px;
`;

export const SettingsDiv = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 376px) {
    flex-direction: column;
    margin: 8px 0px;
  }
`;

export const NotificationsBoard = styled.div`
  width: 100%;
  height: 60%;
  background: #eeeeee;
  justify-content: space-around;
  overflow-y: scroll;
  border-radius: 8px;
  @media screen and (max-width: 1100px) {
    height: 0px;
    width: 0px;
  }
`;

export const NotificationItems = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 0px;
  border-bottom: 0.5px solid #111111;
  color: #111111;
  font-size: 15px;
`;

export const BoardTitle = styled.div`
  @media screen and (max-width: 1100px) {
    color: #111111;
    height: 0px;
    width: 0px;
  }
`;
