import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Learn.css'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const categories = [
  {
    id: 'alphabet',
    icon: '🔤',
    title: 'Alphabet (A–Z)',
    desc: 'Master each letter in sign language with visual guides and practice drills.',
    count: 26,
    color: '#635bff',
  },
  {
    id: 'greetings',
    icon: '👋',
    title: 'Greetings & Basics',
    desc: 'Learn everyday phrases like Hello, Thank you, Please, and more.',
    count: 12,
    color: '#f59e0b',
  },
  {
    id: 'numbers',
    icon: '🔢',
    title: 'Numbers (0–20)',
    desc: 'Count in sign language — essential for shopping, ordering, and daily life.',
    count: 21,
    color: '#10b981',
  },
  {
    id: 'food',
    icon: '🍕',
    title: 'Food & Drinks',
    desc: 'Signs for common food items, drinks, and restaurant interactions.',
    count: 18,
    color: '#ef4444',
  },
  {
    id: 'emotions',
    icon: '😊',
    title: 'Emotions & Feelings',
    desc: 'Express how you feel — happy, sad, tired, excited, and more.',
    count: 15,
    color: '#ec4899',
  },
  {
    id: 'questions',
    icon: '❓',
    title: 'Questions & Responses',
    desc: 'Ask What, Where, When, Who, and reply naturally in sign language.',
    count: 14,
    color: '#8b5cf6',
  },
]

const alphabetData = alphabet.map((letter, i) => ({
  letter,
  hint: `Finger-spell the letter ${letter}`,
  difficulty: i < 10 ? 'Easy' : i < 20 ? 'Medium' : 'Hard',
}))

export default function Learn() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [completedLetters, setCompletedLetters] = useState(new Set())

  const toggleLetter = (letter) => {
    setCompletedLetters((prev) => {
      const next = new Set(prev)
      if (next.has(letter)) next.delete(letter)
      else next.add(letter)
      return next
    })
  }

  const progress = Math.round((completedLetters.size / 26) * 100)

  return (
    <div className="learn">
      {/* Hero */}
      <section className="learn-hero">
        <div className="learn-hero__inner">
          <Link to="/" className="learn-hero__back">← Back to Home</Link>
          <h1 className="learn-hero__title">
            Learn <span className="learn-hero__accent">Sign Language</span>
          </h1>
          <p className="learn-hero__subtitle">
            Interactive lessons to build your sign language skills step by step.
            Start with the alphabet and work your way up.
          </p>

          {/* Stats bar */}
          <div className="learn-stats">
            <div className="learn-stat">
              <span className="learn-stat__value">6</span>
              <span className="learn-stat__label">Categories</span>
            </div>
            <div className="learn-stat__divider" />
            <div className="learn-stat">
              <span className="learn-stat__value">106</span>
              <span className="learn-stat__label">Total Signs</span>
            </div>
            <div className="learn-stat__divider" />
            <div className="learn-stat">
              <span className="learn-stat__value">{progress}%</span>
              <span className="learn-stat__label">Alphabet Done</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="learn-categories">
        <h2 className="section-title">Choose a Category</h2>
        <div className="learn-categories__grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`learn-cat-card ${activeCategory === cat.id ? 'learn-cat-card--active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              style={{ '--cat-color': cat.color }}
            >
              <span className="learn-cat-card__icon">{cat.icon}</span>
              <h3 className="learn-cat-card__title">{cat.title}</h3>
              <p className="learn-cat-card__desc">{cat.desc}</p>
              <span className="learn-cat-card__badge">{cat.count} signs</span>
            </button>
          ))}
        </div>
      </section>

      {/* Alphabet drill – always visible */}
      <section className="learn-alphabet">
        <div className="learn-alphabet__header">
          <h2 className="section-title">Alphabet Practice</h2>
          <p className="learn-alphabet__progress-text">
            {completedLetters.size} / 26 letters completed
          </p>
          <div className="learn-alphabet__bar">
            <div className="learn-alphabet__bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="learn-alphabet__grid">
          {alphabetData.map(({ letter, hint, difficulty }) => {
            const done = completedLetters.has(letter)
            return (
              <button
                key={letter}
                className={`letter-card ${done ? 'letter-card--done' : ''}`}
                onClick={() => toggleLetter(letter)}
                title={hint}
              >
                <span className="letter-card__letter">{letter}</span>
                <span className={`letter-card__diff letter-card__diff--${difficulty.toLowerCase()}`}>
                  {difficulty}
                </span>
                {done && <span className="letter-card__check">✓</span>}
              </button>
            )
          })}
        </div>
      </section>

      {/* Tips */}
      <section className="learn-tips">
        <h2 className="section-title">Learning Tips</h2>
        <div className="learn-tips__grid">
          <div className="tip-card">
            <span className="tip-card__num">01</span>
            <h3 className="tip-card__title">Practice Daily</h3>
            <p className="tip-card__desc">
              Even 10 minutes a day builds muscle memory. Consistency beats intensity.
            </p>
          </div>
          <div className="tip-card">
            <span className="tip-card__num">02</span>
            <h3 className="tip-card__title">Use a Mirror</h3>
            <p className="tip-card__desc">
              Watch yourself sign to self-correct hand shapes, positions, and movements.
            </p>
          </div>
          <div className="tip-card">
            <span className="tip-card__num">03</span>
            <h3 className="tip-card__title">Learn in Context</h3>
            <p className="tip-card__desc">
              Try signing full phrases instead of isolated words — it&apos;s more natural and memorable.
            </p>
          </div>
          <div className="tip-card">
            <span className="tip-card__num">04</span>
            <h3 className="tip-card__title">Watch Others</h3>
            <p className="tip-card__desc">
              Watch videos of native signers. Observe facial expressions — they&apos;re part of the grammar.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
