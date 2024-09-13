import React from 'react'
import { Relationship, Direction, ThemeColors } from '../../models/types'
import { RELATIONSHIPS } from '../constants/gameConstants'

interface WordInputPopupProps {
  newWord: string
  setNewWord: (word: string) => void
  relationship: Relationship | ''
  setRelationship: (relationship: Relationship | '') => void
  direction: Direction
  setDirection: (direction: Direction) => void
  onSubmit: () => void
  onClose: () => void // Add this new prop
  position: { top: number; left: number }
  theme: ThemeColors
}

const WordInputPopup: React.FC<WordInputPopupProps> = ({
  newWord,
  setNewWord,
  relationship,
  setRelationship,
  direction,
  setDirection,
  onSubmit,
  onClose, // Add this new prop
  position,
  theme,
}) => {
  return (
    <div
      className="word-input-popup"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        backgroundColor: theme.tileBackground,
        border: `1px solid ${theme.tileBorder}`,
      }}
    >
      <button
        className="close-button"
        onClick={onClose}
        style={{ color: theme.tileText }}
      >
        ×
      </button>
      <input
        className="add-word-input"
        type="text"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value.toUpperCase())}
        placeholder="Add Word"
        style={{
          border: `1px solid ${theme.tileBorder}`,
          color: theme.tileText,
        }}
      />
      <select
        value={relationship}
        onChange={(e) => setRelationship(e.target.value as Relationship)}
        style={{
          border: `1px solid ${theme.tileBorder}`,
          color: theme.tileText,
        }}
      >
        <option value="">Relationship</option>
        {Object.keys(RELATIONSHIPS).map((rel) => (
          <option key={rel} value={rel}>
            {rel}
          </option>
        ))}
      </select>
      <select
        value={direction}
        onChange={(e) => setDirection(e.target.value as Direction)}
        style={{
          border: `1px solid ${theme.tileBorder}`,
          color: theme.tileText,
        }}
      >
        <option value="horizontal">Horizontal</option>
        <option value="vertical">Vertical</option>
      </select>
      <button
        onClick={onSubmit}
        style={{
          backgroundColor: theme.buttonBackground,
          color: theme.buttonText,
        }}
      >
        Submit
      </button>
    </div>
  )
}

export default WordInputPopup
