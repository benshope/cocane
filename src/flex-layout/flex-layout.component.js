import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { component as Button } from '../button'
import { component as ButtonText } from '../button-text'
import { component as CellTypePicker } from '../cell-picker'
// import fileInput from "../file-input/file-input";
import cell from '../cell'

const FlexLayoutDiv = styled.div`
  --em025: ${({ spacing }) => `${spacing * 0.25}em`};
  --em05: ${({ spacing }) => `${spacing * 0.5}em`};
  --em1: ${({ spacing }) => `${spacing}em`};
  --em15: ${({ spacing }) => `${spacing * 1.5}em`};
  --em20: ${({ spacing }) => `${spacing * 10}em`};
  --scale: ${({ scale }) => scale};
  --mono100: ${({ isDark }) => (isDark ? 'black' : 'white')};
  --mono200: ${({ isDark }) =>
    isDark ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 90%)'};
  --mono300: ${({ isDark }) =>
    isDark ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 80%)'};
  --mono1000: ${({ isDark }) => (isDark ? 'white' : 'black')};
  --primary500: ${({ hue }) => `hsl(${hue}, 50%, 60%)`};
  --primary600: ${({ hue, isDark }) =>
    isDark ? `hsl(${hue}, 50%, 60%)` : `hsl(${hue}, 50%, 50%)`};
  --primary700: ${({ hue, isDark }) =>
    isDark ? `hsl(${hue}, 50%, 70%)` : `hsl(${hue}, 50%, 40%)`};
  --primary800: ${({ hue, isDark }) =>
    isDark ? `hsl(${hue}, 50%, 80%)` : `hsl(${hue}, 50%, 30%)`};
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  background: var(--mono200, gray);
  transition: color 0.1s ease;
  color: var(--mono1000, black);
  font-size: ${({ scale }) => scale}em;
`

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  padding-top: var(--em05, 0.5em);
  padding-left: var(--em05, 0.5em);
  > * {
    transition: background 0.1s ease;
    background: var(--mono100, white);
    margin-bottom: var(--em05, 0.5em);
    margin-right: var(--em05, 0.5em);
    border-radius: 4px;
    overflow: hidden;
  }
`

const CellDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const CellHeaderDiv = styled.div`
  display: flex;
  height: 3em;
  padding: 0 1em;
  justify-content: space-between;
  align-items: center;
`

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
`

const CellBodyDiv = styled.div`
  padding: 1em;
  flex: 1;
  position: relative;
  display: flex;
  > * {
    max-width: 100%;
  }
`

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
`

// TODO: add PropTypes
const FlexLayout = ({
  value = [],
  addCell,
  changeCellType,
  removeCell,
  state = {},
}) => {
  const [scale, setScale] = React.useState(1)
  const [isDark, setIsDark] = React.useState(false)
  // TODO make isEditing persisted state? or default on user?
  const [isEditing, setIsEditing] = React.useState(true)
  const [hue, setHue] = React.useState(200)
  const [spacing, setSpacing] = React.useState(1)
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
            <div style={{ minWidth: '6em' }}>{`Is Dark ${isDark}`}</div>
            <input
              title="Is Dark"
              type="checkbox"
              checked={isDark}
              onChange={e => setIsDark(e.currentTarget.checked)}
            />
          </label>
          <label>
            <div style={{ minWidth: '6em' }}>{`Is Editing ${isEditing}`}</div>
            <input
              title="Is Editing"
              type="checkbox"
              checked={isEditing}
              onChange={e => setIsEditing(e.currentTarget.checked)}
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
          {isEditing ? (
            <CellDiv>
              <CellHeaderDiv>{'Add Cell'}</CellHeaderDiv>
              <CellTypePicker onChange={addCell} />
            </CellDiv>
          ) : null}
          {/* <input type="text" placeholder="Search..." /> */}
          {(value || [])
            .filter(cellID => state[cellID])
            .map(cellID => {
              return (
                // TODO cells should export
                // their own string representation
                <CellDiv key={cellID}>
                  <CellHeaderDiv>
                    <CellHeaderLeftDiv>
                      <span>{cellID}</span>
                      <Button
                        title="Switch Cell Type"
                        onClick={() => changeCellType(cellID)}
                      >
                        {'𝞓'}
                      </Button>
                    </CellHeaderLeftDiv>
                    <ButtonText
                      title="Delete Cell"
                      onClick={() => removeCell(cellID)}
                    >
                      {'×'}
                    </ButtonText>
                  </CellHeaderDiv>
                  <CellBodyDiv>
                    <cell.container id={cellID} isEditing={isEditing} />
                  </CellBodyDiv>
                </CellDiv>
              )
            })}
        </FlexLayoutDiv>
      </div>
    </ThemeProvider>
  )
}

export default FlexLayout
