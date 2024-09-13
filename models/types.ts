// types.ts

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export type Relationship =
  | 'SYNONYM'
  | 'ANTONYM'
  | 'DEFINITION'
  | 'COLLOQUIALISM'
  | 'RHYME'
  | 'HOMOPHONE'
  | 'ETYMOLOGY'
  | 'ANAGRAM'
  | 'PORTMANTEAU'
  | 'CONTRONYM'
  | 'METONYMY'
  | 'EPONYM'

export type Direction = 'horizontal' | 'vertical'

export type Cell = string

export type Board = Cell[][]

export type SelectedCell = { row: number; col: number } | null

export interface RelationshipMap {
  [key: string]: Difficulty
}

export interface DifficultyScores {
  EASY: number
  MEDIUM: number
  HARD: number
}

export interface ThemeColors {
  background: string
  tileBackground: string
  tileBorder: string
  tileText: string
  headerText: string
  buttonBackground: string
  buttonText: string
}

export interface ColourThemes {
  [key: string]: ThemeColors
}

export type ColorTheme = keyof ColourThemes

export interface PopupPosition {
  top: number
  left: number
}

export interface WordInputPopupProps {
  newWord: string
  setNewWord: (word: string) => void
  relationship: Relationship | ''
  setRelationship: (relationship: Relationship | '') => void
  direction: Direction
  setDirection: (direction: Direction) => void
  onSubmit: () => void
  position: PopupPosition
  theme: ThemeColors
}

export interface GameBoardProps {
  // Add any props that GameBoard component might receive
}

export interface GameState {
  board: Board
  gridSize: number
  selectedCell: SelectedCell
  newWord: string
  relationship: Relationship | ''
  direction: Direction
  score: number
  message: string
  theme: ColorTheme
  popupPosition: PopupPosition | null
}

// You can add more interfaces or types as needed for your game logic
