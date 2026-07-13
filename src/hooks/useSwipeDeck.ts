import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { College } from '../data/colleges'

export type SwipeDirection = 'left' | 'right'
export type DeckPhase = 'idle' | 'reinforcing' | 'overlay' | 'exiting'

const CASCADE_STAGGER = 40
const CASCADE_TAG_DURATION = 300
const OVERLAY_HOLD = 2500
const EXIT_DURATION = 500

interface ExitingCard {
  college: College
  direction: SwipeDirection
}

export function useSwipeDeck(initialColleges: College[]) {
  const [order, setOrder] = useState<string[]>(() => initialColleges.map(c => c.id))
  const [phase, setPhase] = useState<DeckPhase>('idle')
  const [verdict, setVerdict] = useState<SwipeDirection | null>(null)
  const [exitingCard, setExitingCard] = useState<ExitingCard | null>(null)
  const [tagWeights, setTagWeights] = useState<Record<string, number>>({})

  const reinforceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingDelta = useRef<number>(0)

  const collegesById = useMemo(
    () => new Map(initialColleges.map(c => [c.id, c])),
    [initialColleges],
  )

  useEffect(() => () => {
    if (reinforceTimer.current) clearTimeout(reinforceTimer.current)
    if (holdTimer.current) clearTimeout(holdTimer.current)
    if (exitTimer.current) clearTimeout(exitTimer.current)
  }, [])

  const topCollege = order.length > 0 ? collegesById.get(order[0]) ?? null : null

  const applyTagDelta = useCallback((college: College, delta: number) => {
    setTagWeights(prev => {
      const next = { ...prev }
      for (const tag of college.tags) {
        next[tag] = (next[tag] ?? 0) + delta
      }
      return next
    })
  }, [])

  const startOverlayHold = useCallback((college: College, direction: SwipeDirection) => {
    setPhase('overlay')
    holdTimer.current = setTimeout(() => {
      setPhase('exiting')
      setOrder(prev => prev.slice(1))
      setExitingCard({ college, direction })
      exitTimer.current = setTimeout(() => {
        setExitingCard(null)
        setVerdict(null)
        setPhase('idle')
      }, EXIT_DURATION)
    }, OVERLAY_HOLD)
  }, [])

  const commitVerdict = useCallback((direction: SwipeDirection) => {
    if (phase !== 'idle' || !topCollege) return

    const delta = direction === 'right' ? 1 : -1
    pendingDelta.current = delta
    applyTagDelta(topCollege, delta)
    setVerdict(direction)

    if (direction === 'right') {
      setPhase('reinforcing')
      const cascadeTime = topCollege.tags.length * CASCADE_STAGGER + CASCADE_TAG_DURATION
      reinforceTimer.current = setTimeout(() => {
        startOverlayHold(topCollege, direction)
      }, cascadeTime)
    } else {
      startOverlayHold(topCollege, direction)
    }
  }, [phase, topCollege, applyTagDelta, startOverlayHold])

  const undo = useCallback(() => {
    if (phase !== 'overlay' && phase !== 'reinforcing') return
    if (reinforceTimer.current) clearTimeout(reinforceTimer.current)
    if (holdTimer.current) clearTimeout(holdTimer.current)
    if (topCollege) applyTagDelta(topCollege, -pendingDelta.current)
    pendingDelta.current = 0
    setVerdict(null)
    setPhase('idle')
  }, [phase, topCollege, applyTagDelta])

  const reset = useCallback(() => {
    setOrder(initialColleges.map(c => c.id))
    setPhase('idle')
    setVerdict(null)
    setExitingCard(null)
    setTagWeights({})
  }, [initialColleges])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') commitVerdict('right')
      if (e.key === 'ArrowLeft') commitVerdict('left')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [commitVerdict])

  const stack = order.slice(0, 4).map(id => collegesById.get(id)!).filter(Boolean)
  const isComplete = order.length === 0 && !exitingCard

  return {
    stack,
    topCollege,
    phase,
    verdict,
    exitingCard,
    isComplete,
    tagWeights,
    commitVerdict,
    undo,
    reset,
  }
}
