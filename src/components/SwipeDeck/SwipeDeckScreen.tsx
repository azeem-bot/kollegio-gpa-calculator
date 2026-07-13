import type { College } from '../../data/colleges'
import { useSwipeDeck } from '../../hooks/useSwipeDeck'
import DeckHeader from './DeckHeader'
import CollegeCard from './CollegeCard'
import CardStateOverlay from './CardStateOverlay'
import DeckActions from './DeckActions'
import RekaBar from './RekaBar'
import './SwipeDeckScreen.css'

interface Props {
  colleges: College[]
  title?: string
}

export default function SwipeDeckScreen({ colleges, title = 'Colleges that fit you best' }: Props) {
  const {
    stack,
    phase,
    verdict,
    exitingCard,
    isComplete,
    commitVerdict,
    undo,
    reset,
  } = useSwipeDeck(colleges)

  const topCollege = stack[0] ?? null

  return (
    <div className="swipe-deck-screen">
      <DeckHeader title={title} />

      <div className="deck-area">
        {isComplete ? (
          <div className="deck-empty">
            <p className="deck-empty__title">You went through them all</p>
            <p className="deck-empty__subtitle">Your algorithm has learned from every swipe.</p>
            <button type="button" className="deck-empty__reset" onClick={reset}>
              Start over
            </button>
          </div>
        ) : (
          <>
            {stack.map((college, i) => {
              const isTop = i === 0
              const showOverlay = isTop && phase === 'overlay' && verdict
              return (
                <div key={college.id} className={`card-slot deck-pos-${i}`}>
                  <CollegeCard
                    college={college}
                    interactive={isTop && phase === 'idle'}
                    reinforcing={isTop && phase === 'reinforcing'}
                    ghosted={Boolean(showOverlay)}
                    onCommit={commitVerdict}
                  />
                  {showOverlay && verdict && (
                    <CardStateOverlay direction={verdict} tagCount={college.tags.length} onUndo={undo} />
                  )}
                </div>
              )
            })}

            {exitingCard && (
              <div
                className={`card-slot deck-pos-0 card-slot--exiting card-slot--exit-${exitingCard.direction}`}
              >
                <CollegeCard college={exitingCard.college} ghosted />
                <CardStateOverlay
                  direction={exitingCard.direction}
                  tagCount={exitingCard.college.tags.length}
                  onUndo={() => {}}
                />
              </div>
            )}
          </>
        )}
      </div>

      {!isComplete && (
        <>
          <DeckActions
            onPass={() => commitVerdict('left')}
            onSave={() => commitVerdict('right')}
            disabled={phase !== 'idle'}
          />
          <RekaBar collegeName={topCollege?.name ?? null} />
        </>
      )}
    </div>
  )
}
