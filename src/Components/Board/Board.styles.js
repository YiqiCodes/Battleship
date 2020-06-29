import styled from "styled-components";

export const Square = styled.div`
  width: 50px;
  height: 50px;
  background: #eeeeee;
  border: 1px solid slategray;
`;

export const BoardRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 520px;
`;

export const BoardColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
