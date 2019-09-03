import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { component as Button } from '../button'
import { component as ButtonText } from '../button-text'
import { component as CellTypePicker } from '../cell-picker'
// import fileInput from "../file-input/file-input";
import cell from '../cell'
import { component as GridDiv } from '../grid'

const FlexLayoutDiv = styled(GridDiv)`
  --spacing_0_25: ${({ spacing }) => `${spacing * 0.25}em`};
  --spacing_0_5: ${({ spacing }) => `${spacing * 0.5}em`};
  --spacing_1: ${({ spacing }) => `${spacing}em`};
  --spacing_1_5: ${({ spacing }) => `${spacing * 1.5}em`};
  --spacing_2: ${({ spacing }) => `${spacing * 2}em`};
  --spacing_2_5: ${({ spacing }) => `${spacing * 2.5}em`};
  --scale: ${({ scale }) => scale * 16}px;
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
  font-size: var(--scale, 1em);
  padding: var(--spacing_0_25, 0.25em);

  * {
    box-sizing: border-box;
    transition: background 0.1s ease;
  }
  padding: var(--spacing_0_25, 0.25em);
  grid-template-columns: ${({ scale }) => {
    return `repeat(
    auto-fill,
    minmax(${scale * 20}rem, 2fr))`
  }};
  > * {
    background: var(--mono100, white);
    border-radius: var(--spacing_0_25, 0.25em);
  }
`

const CellDiv = styled.div`
  grid-column-end: ${({ gridColumnEnd }) => gridColumnEnd || 'span 1'};
  position: relative;
  display: flex;
  flex-direction: column;
`

const CellHeaderDiv = styled.div`
  display: flex;
  height: calc(2em + var(--spacing_1, 1em));
  padding: 0 var(--spacing_1, 1em);
  justify-content: space-between;
  align-items: center;
  button {
    padding-right: 0;
  }
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
  flex: 1;
  display: flex;
  padding: var(--spacing_1, 1em);
  padding-top: 0;
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
  console.log('spacing is: ', spacing)
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
              min={0.1}
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
              onChange={e => {
                const newSpacing = e.currentTarget.value
                console.log('setting to', newSpacing)
                setSpacing(newSpacing)
              }}
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
              <CellBodyDiv>
                <CellTypePicker onChange={addCell} />
              </CellBodyDiv>
            </CellDiv>
          ) : null}
          {/* <input type="text" placeholder="Search..." /> */}
          {(value || [])
            .filter(({ id }) => state[id])
            .map(({ id: cellID, gridColumnEnd }) => {
              return (
                // TODO cells should export
                // their own string representation
                <CellDiv key={cellID} gridColumnEnd={gridColumnEnd}>
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
