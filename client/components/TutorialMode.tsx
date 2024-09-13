import React from 'react'

interface TutorialModalProps {
  isOpen: boolean
  onClose: () => void
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="tutorial-modal">
      <div className="tutorial-content">
        <h2>Word Relationships Tutorial</h2>
        <ul>
          <li>
            <strong>Synonym:</strong> A word with the same or similar meaning.
            Example: <strong>Big</strong> and <strong>Large</strong>.
          </li>
          <li>
            <strong>Antonym:</strong> A word with the opposite meaning. Example:
            <strong>Hot</strong> and <strong>Cold</strong>.
          </li>
          <li>
            <strong>Rhyme:</strong> Words that have the same ending sound.
            Example: <strong>Cat</strong> and <strong>Hat</strong>.
          </li>
          <li>
            <strong>Homophone:</strong> Words that sound the same but have
            different meanings and spellings. Example: <strong>There</strong>{' '}
            and <strong>Their</strong>.
          </li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default TutorialModal
