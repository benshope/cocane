import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { component as Button } from "../button";
import { component as ButtonText } from "../button-text";
// import fileInput from "../file-input/file-input";
import inputNumberList from "../input-number-list";
import inputNumber from "../input-number";
import select from "../select";
import bigNumber from "../big-number";
import histogram from "../histogram";

const FlexLayoutDiv = styled.div`
  --em025: ${({ spacing }) => `${spacing * 0.25}em`};
  --em05: ${({ spacing }) => `${spacing * 0.5}em`};
  --em1: ${({ spacing }) => `${spacing}em`};
  --em15: ${({ spacing }) => `${spacing * 1.5}em`};
  --em20: ${({ spacing }) => `${spacing * 10}em`};
  --scale: ${({ scale }) => scale};
  --mono100: ${({ isDark }) => (isDark ? "black" : "white")};
  --mono200: ${({ isDark }) =>
    isDark ? "hsl(0, 0%, 10%)" : "hsl(0, 0%, 90%)"};
  --mono300: ${({ isDark }) =>
    isDark ? "hsl(0, 0%, 20%)" : "hsl(0, 0%, 80%)"};
  --mono1000: ${({ isDark }) => (isDark ? "white" : "black")};
  --primary500: ${({ hue }) => `hsl(${hue}, 50%, 60%)`};
  --primary600: ${({ hue, isDark }) =>
    isDark ? `hsl(${hue}, 50%, 60%)` : `hsl(${hue}, 50%, 50%)`};
  --primary700: ${({ hue, isDark }) =>
    isDark ? `hsl(${hue}, 50%, 70%)` : `hsl(${hue}, 50%, 40%)`};
  --primary800: ${({ hue, isDark }) =>
    isDark ? `hsl(${hue}, 50%, 80%)` : `hsl(${hue}, 50%, 30%)`};
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  background: var(--mono200, gray);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  transition: color 0.1s ease;
  color: var(--mono1000, black);
  padding-top: var(--em05, 0.5em);
  padding-left: var(--em05, 0.5em);
  font-size: ${({ scale }) => scale}em;
  > * {
    transition: background 0.1s ease;
    background: var(--mono100, white);
    margin-bottom: var(--em05, 0.5em);
    margin-right: var(--em05, 0.5em);
    border-radius: 4px;
    overflow: hidden;
  }
`;

const CellDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CellHeaderDiv = styled.div`
  display: flex;
  height: 3em;
  padding: 0 1em;
  justify-content: space-between;
  align-items: center;
`;

const AddCellDiv = styled.div`
  padding: var(--em1, 0.5em);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CellHeaderLeftDiv = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 0.5em;
  }
  button {
    font-size: 0.75em;
    height: 1.5em;
    width: 1.5em;
    line-height: 1.5em;
    padding: 0;
  }
`;

const CellBodyDiv = styled.div`
  padding: 1em;
  flex: 1;
  position: relative;
  display: flex;
  > * {
    max-width: 100%;
  }
`;

const FlexLayoutHeaderDiv = styled.div`
  height: 3em;
  flex-basis: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  label {
    display: flex;
    flex-direction: column;
  }
`;

const cellList = [inputNumberList, inputNumber, select, bigNumber, histogram];

const cellsByType = cellList.reduce((acc, cell) => {
  acc[cell.type] = cell;
  return acc;
}, {});

// TODO: add PropTypes
const FlexLayout = ({
  value = [],
  addCell,
  changeCellType,
  removeCell,
  state = {}
}) => {
  const [scale, setScale] = React.useState(1);
  const [isDark, setIsDark] = React.useState(false);
  const [hue, setHue] = React.useState(200);
  const [spacing, setSpacing] = React.useState(1);
  // TODO make searchable
  // TODO create generic cell - intersection of all
  return (
    <ThemeProvider theme={{ scale, isDark, spacing, hue }}>
      <div>
        <FlexLayoutHeaderDiv>
          <label>
            <div>{`Scale ${scale}`}</div>
            <input
              type="range"
              title="Scale"
              value={scale}
              min={0.01}
              max={1}
              step={0.01}
              onChange={e => setScale(e.currentTarget.value)}
            />
          </label>
          <label>
            <div style={{ minWidth: "6em" }}>{`Is Dark ${isDark}`}</div>
            <input
              title="Is Dark"
              type="checkbox"
              checked={isDark}
              onChange={e => setIsDark(e.currentTarget.checked)}
            />
          </label>
          <label>
            <div>{`Hue ${hue}`}</div>
            <input
              type="range"
              title="Hue"
              value={hue}
              min={0}
              max={360}
              onChange={e => setHue(e.currentTarget.value)}
            />
          </label>
          <label>
            <div>{`Spacing ${spacing}`}</div>
            <input
              type="range"
              title="Spacing"
              value={spacing}
              min={0}
              max={4}
              step={0.01}
              onChange={e => setSpacing(e.currentTarget.value)}
            />
          </label>
        </FlexLayoutHeaderDiv>
        <FlexLayoutDiv
          scale={scale}
          hue={hue}
          spacing={spacing}
          isDark={isDark}
        >
          <AddCellDiv>
            <Button onClick={() => addCell()}>{"+ Add Cell"}</Button>
          </AddCellDiv>
          {/* <input type="text" placeholder="Search..." /> */}
          {(value || [])
            .filter(cellID => state[cellID])
            .map(cellID => {
              // console.log("cellID", cellID);
              const cellState = state[cellID];
              const cell = cellsByType[cellState.type];
              // const CellInputEditor = () => `TODO: ${cell.type} inputs`;
              // <CellInputEditor id={cellID} />
              // TODO could be specialized type switcher components
              // that vary based on the data passed in
              return (
                <CellDiv key={cellID}>
                  <CellHeaderDiv>
                    <CellHeaderLeftDiv>
                      <span>{cell.name}</span>
                      <Button
                        title="Switch Cell Type"
                        onClick={() => changeCellType(cellID)}
                      >
                        {"𝞓"}
                      </Button>
                    </CellHeaderLeftDiv>
                    <ButtonText
                      title="Delete Cell"
                      onClick={() => removeCell(cellID)}
                    >
                      {"×"}
                    </ButtonText>
                  </CellHeaderDiv>
                  <CellBodyDiv>
                    <cell.container id={cellID} />
                  </CellBodyDiv>
                </CellDiv>
              );
            })}
        </FlexLayoutDiv>
      </div>
    </ThemeProvider>
  );
};

export default FlexLayout;
