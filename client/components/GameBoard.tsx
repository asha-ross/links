import React, { useState, KeyboardEvent, useEffect } from 'react'
import { colourThemes, ColourTheme } from '../styles/colourThemes'
import WordOfTheDay from './WordOfTheDay'
import TutorialModal from './TutorialMode'
import {
  INITIAL_GRID_SIZE,
  EXPANSION_THRESHOLD,
  EXPANSION_SIZE,
  RELATIONSHIPS,
  DIFFICULTY_SCORES,
} from '../constants/gameConstants'
import '../styles/main.css'
import {
  Board,
  SelectedCell,
  Relationship,
  Direction,
} from '../../models/types'
import WordInputPopup from './WordInputPopUp'

const startingWords = [
  'LIGHT', // Can lead to antonyms, synonyms, and various associations
  'PLAY', // Versatile word with multiple meanings
  'SOUND', // Rich in associations and potential for homophones
  'TIME', // Abstract concept with many related words
  'WATER', // Element with many associations
  'FIRE', // Element with strong imagery and related words
  'EARTH', // Planet, element, grounding concept
  'AIR', // Element, homophone opportunities
  'SPACE', // Multiple meanings, scientific and everyday uses
  'MIND', // Abstract concept, rich in associations
  'HEART', // Emotional and physical meanings
  'BOOK', // Cultural item with many associations
  'MUSIC', // Art form with rich vocabulary
  'DREAM', // Abstract concept, verb and noun
  'STAR', // Celestial object, also means celebrity
  'HOUSE', // Common object with many related words
  'TREE', // Nature-related, many specific types
  'RIVER', // Geographic feature with metaphorical uses
  'MOUNTAIN', // Geographic feature, metaphor for challenge
  'BIRD', // Animal category with many specifics
  'FLOWER', // Plant category, also verb
  'STORM', // Weather phenomenon, also metaphorical
  'FRIEND', // Social concept with many related words
  'WORK', // Activity with many associations and forms
]

const GameBoard: React.FC = () => {
  const [gridSize, setGridSize] = useState(INITIAL_GRID_SIZE)
  const [board, setBoard] = useState<Board>(() =>
    Array(INITIAL_GRID_SIZE)
      .fill(null)
      .map(() => Array(INITIAL_GRID_SIZE).fill('')),
  )
  const [selectedCell, setSelectedCell] = useState<SelectedCell>(null)
  const [newWord, setNewWord] = useState<string>('')
  const [relationship, setRelationship] = useState<Relationship | ''>('')
  const [direction, setDirection] = useState<Direction>('horizontal')
  const [score, setScore] = useState<number>(0)
  const [message, setMessage] = useState<string>('')
  const [theme, setTheme] = useState<ColourTheme>('classic')
  const [hoveredCell, setHoveredCell] = useState<SelectedCell>(null)
  const [previewWord, setPreviewWord] = useState<string[]>([])
  const [popupPosition, setPopupPosition] = useState<{
    top: number
    left: number
  } | null>(null)

  useEffect(() => {
    // Place a random starting word in the center of the board
    const startWord =
      startingWords[Math.floor(Math.random() * startingWords.length)]
    const startRow = Math.floor(INITIAL_GRID_SIZE / 2)
    const startCol = Math.floor((INITIAL_GRID_SIZE - startWord.length) / 2)

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row])
      for (let i = 0; i < startWord.length; i++) {
        newBoard[startRow][startCol + i] = startWord[i]
      }
      console.log('Initial board setup:')
      newBoard.forEach((row, index) => {
        console.log(`Row ${index}: ${row.join(' ')}`)
      })
      return newBoard
    })
  }, [])

  const handleCellHover = (row: number, col: number) => {
    setHoveredCell({ row, col })
    if (selectedCell && newWord) {
      const preview = Array(newWord.length).fill('')
      const selectedLetter = board[selectedCell.row][selectedCell.col]
      const selectedIndex = newWord.indexOf(selectedLetter)
      if (selectedIndex !== -1) {
        // Only proceed if the selected letter is in the new word
        if (direction === 'horizontal') {
          const startCol = col - selectedIndex
          for (let i = 0; i < newWord.length; i++) {
            if (startCol + i >= 0 && startCol + i < gridSize) {
              preview[i] = newWord[i]
            }
          }
        } else {
          const startRow = row - selectedIndex
          for (let i = 0; i < newWord.length; i++) {
            if (startRow + i >= 0 && startRow + i < gridSize) {
              preview[i] = newWord[i]
            }
          }
        }
        setPreviewWord(preview)
      }
    }
  }

  const handleCellLeave = () => {
    setHoveredCell(null)
    setPreviewWord([])
  }

  const handleCellInteraction = (row: number, col: number): void => {
    if (board[row][col] !== '') {
      setSelectedCell({ row, col })

      // Calculate popup position
      const cellElement = document.getElementById(`cell-${row}-${col}`)
      if (cellElement) {
        const rect = cellElement.getBoundingClientRect()
        const boardElement = document.querySelector('.game-board')
        const boardRect = boardElement?.getBoundingClientRect()

        if (boardRect) {
          setPopupPosition({
            top: rect.bottom - boardRect.top + 10, // 10px below the cell
            left: rect.left - boardRect.left,
          })
        }
      }
    } else {
      setSelectedCell(null)
      setPopupPosition(null)
    }
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    row: number,
    col: number,
  ): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCellInteraction(row, col)
    }
  }

  const handleWordSubmit = (): void => {
    if (!selectedCell || !newWord || !relationship) {
      setMessage(
        'Please select a cell, enter a new word, and choose a relationship',
      )
      return
    }

    const { row, col } = selectedCell
    const selectedLetter = board[row][col].toUpperCase()

    if (!newWord.includes(selectedLetter)) {
      setMessage('New word must include the selected letter')
      return
    }

    let newBoard = board.map((row) => [...row])
    const wordLength = newWord.length
    const selectedLetterIndex = newWord.indexOf(selectedLetter)

    let startRow, startCol, endRow, endCol

    if (direction === 'horizontal') {
      startRow = row
      startCol = col - selectedLetterIndex
      endRow = startRow
      endCol = startCol + wordLength - 1

      if (startCol < 0 || endCol >= gridSize) {
        setMessage('Word is too long for this position')
        return
      }
      for (let i = 0; i < wordLength; i++) {
        if (
          newBoard[startRow][startCol + i] !== '' &&
          newBoard[startRow][startCol + i] !== newWord[i]
        ) {
          setMessage('Word conflicts with existing letters')
          return
        }
      }
      for (let i = 0; i < wordLength; i++) {
        newBoard[startRow][startCol + i] = newWord[i]
      }
    } else {
      // vertical
      startRow = row - selectedLetterIndex
      startCol = col
      endRow = startRow + wordLength - 1
      endCol = startCol

      if (startRow < 0 || endRow >= gridSize) {
        setMessage('Word cannot be placed in this position')
        return
      }
      for (let i = 0; i < wordLength; i++) {
        if (
          newBoard[startRow + i][startCol] !== '' &&
          newBoard[startRow + i][startCol] !== newWord[i]
        ) {
          setMessage('Word conflicts with existing letters')
          return
        }
      }
      for (let i = 0; i < wordLength; i++) {
        newBoard[startRow + i][startCol] = newWord[i]
      }
    }

    // Check for expansion and adjust word placement if necessary
    const { rowShift, colShift } = checkForExpansion(endRow, endCol)
    if (rowShift > 0 || colShift > 0) {
      // Create a new board with the expanded size
      const expandedBoard = Array(gridSize + rowShift * 2)
        .fill(null)
        .map(() => Array(gridSize + colShift * 2).fill(''))

      // Copy the existing board to the center of the new board
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          expandedBoard[i + rowShift][j + colShift] = newBoard[i][j]
        }
      }

      // Adjust the start position of the word
      startRow += rowShift
      startCol += colShift

      // Re-place the word at the new position
      for (let i = 0; i < wordLength; i++) {
        if (direction === 'horizontal') {
          expandedBoard[startRow][startCol + i] = newWord[i]
        } else {
          expandedBoard[startRow + i][startCol] = newWord[i]
        }
      }

      newBoard = expandedBoard
      setGridSize(gridSize + rowShift * 2)
    }

    setBoard(newBoard)

    const difficulty = RELATIONSHIPS[relationship]
    const points = DIFFICULTY_SCORES[difficulty]

    setScore((prevScore) => {
      const newScore = prevScore + points
      const scoreElement = document.querySelector('.score-display')
      scoreElement?.classList.add('score-changed')
      setTimeout(() => scoreElement?.classList.remove('score-changed'), 500)
      return newScore
    })

    setMessage(`Word added! You earned ${points} points.`)

    // Reset inputs
    setSelectedCell(null)
    setNewWord('')
    setRelationship('')
    setPopupPosition(null)
  }

  useEffect(() => {
    console.log('Board state updated:')
    board.forEach((row, index) => {
      console.log(`Row ${index}: ${row.join(' ')}`)
    })
  }, [board])

  const getCellSize = () => {
    if (window.innerWidth < 480) return '1.5rem'
    if (window.innerWidth < 768) return '2rem'
    return '2.5rem'
  }

  const [newCells, setNewCells] = useState<[number, number][]>([])

  const checkForExpansion = (row: number, col: number) => {
    const threshold = EXPANSION_THRESHOLD
    if (
      row <= threshold ||
      col <= threshold ||
      row >= gridSize - threshold - 1 ||
      col >= gridSize - threshold - 1
    ) {
      console.log('Expansion needed')
      const expansionSize = EXPANSION_SIZE
      const shift = Math.floor(expansionSize / 2)
      return { rowShift: shift, colShift: shift }
      expandGrid()
    }
    return { rowShift: 0, colShift: 0 }
  }

  const expandGrid = () => {
    console.log('Expanding grid. Current size:', gridSize)
    const newSize = gridSize + EXPANSION_SIZE
    setGridSize(newSize)
    console.log('New grid size:', newSize)
    setBoard((prevBoard) => {
      const expansionPerSide = Math.floor(EXPANSION_SIZE / 2)
      const newBoard = Array(newSize)
        .fill(null)
        .map(() => Array(newSize).fill(''))
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          newBoard[i + expansionPerSide][j + expansionPerSide] = prevBoard[i][j]
        }
      }
      console.log('Expanded board:')
      newBoard.forEach((row, index) => {
        console.log(`Row ${index}: ${row.join(' ')}`)
      })
      return newBoard
    })

    // Clear new cells highlight after 1 second
    setTimeout(() => setNewCells([]), 1000)
  }

  const handleClosePopup = () => {
    setSelectedCell(null)
    setPopupPosition(null)
    setNewWord('')
    setRelationship('')
  }

  const [isTutorialOpen, setIsTutorialOpen] = useState(false)

  return (
    <div
      className="game-container"
      style={
        {
          '--background': colourThemes[theme].background,
          '--backgroundImage': colourThemes[theme].backgroundImage,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-4xl">
        <h1
          className="game-title"
          style={{ color: colourThemes[theme].headerText }}
        >
          Links
          <div
            className="score-display"
            style={{ color: colourThemes[theme].headerText }}
          >
            Score: {score}
          </div>
        </h1>
        <div className="banner-container"></div>

        <div>
          {' '}
          <div className="mb-4">
            <label
              htmlFor="theme-select"
              className="theme-select-label"
              style={{ color: colourThemes[theme].headerText }}
            >
              Choose Theme:
            </label>
            <select
              id="theme-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value as ColourTheme)}
              className="theme-select"
              style={{
                backgroundColor: colourThemes[theme].buttonBackground,
                color: colourThemes[theme].buttonText,
              }}
            >
              {Object.keys(colourThemes).map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6" style={{ position: 'relative' }}>
          <h2
            className="board-title"
            style={{ color: colourThemes[theme].headerText }}
          >
            Game Board (Size: {gridSize}x{gridSize})
          </h2>

          <div
            className="game-board"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, ${getCellSize()})`,
              gridTemplateRows: `repeat(${gridSize}, ${getCellSize()})`,
              backgroundColor: colourThemes[theme].tileBackground,
              borderColor: colourThemes[theme].tileBorder,
            }}
            role="grid"
          >
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isPreview =
                  hoveredCell &&
                  ((direction === 'horizontal' &&
                    rowIndex === hoveredCell.row) ||
                    (direction === 'vertical' && colIndex === hoveredCell.col))
                const previewIndex = hoveredCell
                  ? direction === 'horizontal'
                    ? colIndex - hoveredCell.col
                    : rowIndex - hoveredCell.row
                  : -1
                const isNewCell = newCells.some(
                  ([r, c]) => r === rowIndex && c === colIndex,
                )
                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    id={`cell-${rowIndex}-${colIndex}`}
                    className={`board-cell ${
                      selectedCell?.row === rowIndex &&
                      selectedCell?.col === colIndex
                        ? 'selected'
                        : ''
                    } ${
                      isPreview &&
                      previewIndex >= 0 &&
                      previewIndex < previewWord.length
                        ? 'preview'
                        : ''
                    } ${isNewCell ? 'new-cell' : ''}`}
                    style={{
                      backgroundColor: cell
                        ? colourThemes[theme].tileBackground
                        : 'transparent',
                      border: `1px solid ${colourThemes[theme].tileBorder}`,
                      color: colourThemes[theme].tileText,
                    }}
                    onClick={() => handleCellInteraction(rowIndex, colIndex)}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                    onMouseEnter={() => handleCellHover(rowIndex, colIndex)}
                    onMouseLeave={handleCellLeave}
                    tabIndex={0}
                    aria-label={`Cell ${rowIndex + 1},${colIndex + 1}${
                      cell ? ': ' + cell : ''
                    }`}
                  >
                    {isPreview && previewWord[previewIndex]
                      ? previewWord[previewIndex]
                      : cell}
                  </button>
                )
              }),
            )}
          </div>
          {selectedCell && popupPosition && (
            <WordInputPopup
              newWord={newWord}
              setNewWord={setNewWord}
              relationship={relationship}
              setRelationship={setRelationship}
              direction={direction}
              setDirection={setDirection}
              onSubmit={handleWordSubmit}
              position={popupPosition}
              theme={colourThemes[theme]}
              onClose={() => {
                handleClosePopup
              }}
            />
          )}
        </div>
        <WordOfTheDay />
        <button onClick={() => setIsTutorialOpen(true)}>Tutorial</button>
        <TutorialModal
          isOpen={isTutorialOpen}
          onClose={() => setIsTutorialOpen(false)}
        />

        {message && (
          <div
            className="message-box"
            style={{
              backgroundColor: colourThemes[theme].tileBackground,
              color: colourThemes[theme].tileText,
              border: `1px solid ${colourThemes[theme].tileBorder}`,
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default GameBoard
