import { RelationshipMap, DifficultyScores } from '../../models/types'

export const INITIAL_GRID_SIZE = 10
export const EXPANSION_THRESHOLD = 2
export const EXPANSION_SIZE = 5

export const RELATIONSHIPS: RelationshipMap = {
  SYNONYM: 'EASY',
  ANTONYM: 'EASY',
  DEFINITION: 'MEDIUM',
  COLLOQUIALISM: 'MEDIUM',
  RHYME: 'MEDIUM',
  HOMOPHONE: 'MEDIUM',
  ETYMOLOGY: 'HARD',
  ANAGRAM: 'HARD',
  PORTMANTEAU: 'HARD',
  CONTRONYM: 'HARD',
  METONYMY: 'HARD',
  EPONYM: 'HARD',
}

export const DIFFICULTY_SCORES: DifficultyScores = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
}

export const STARTING_WORDS = [
  'STUDY',
  'PLAY',
  'WORD',
  'SKATE',
  'NECESSARY',
  'CHEAT',
  'FEAR',
  'RAGE',
  'BELOVED',
]

// You can add more game constants here as needed
