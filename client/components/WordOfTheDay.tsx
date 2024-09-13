import React, { useState, useEffect } from 'react'

const WordOfTheDay: React.FC = () => {
  const [word, setWord] = useState('')
  const [definition, setDefinition] = useState('')

  useEffect(() => {
    const fetchWordOfTheDay = async () => {
      try {
        // You'll need to replace this with an actual API call
        const response = await fetch(
          'https://api.dictionaryapi.dev/api/v2/entries/en/random',
        )
        const data = await response.json()
        setWord(data[0].word)
        setDefinition(data[0].meanings[0].definitions[0].definition)
      } catch (error) {
        console.error('Error fetching word of the day:', error)
      }
    }

    fetchWordOfTheDay()
  }, [])

  return (
    <div className="word-of-the-day">
      <h3>Word of the Day</h3>
      <p className="word">{word}</p>
      <p className="definition">{definition}</p>
    </div>
  )
}

export default WordOfTheDay
