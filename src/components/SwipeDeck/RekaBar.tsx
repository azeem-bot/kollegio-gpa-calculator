import './RekaBar.css'

interface Props {
  collegeName: string | null
}

export default function RekaBar({ collegeName }: Props) {
  return (
    <div className="reka-bar">
      <div className="reka-bar__icon">🧀</div>
      <div className="reka-bar__text">
        <span className="reka-bar__eyebrow">Ask Reka</span>
        <span className="reka-bar__prompt">
          {collegeName ? `Not sure? Ask Reka about ${collegeName}` : 'Not sure? Ask Reka'}
        </span>
      </div>
      <button type="button" className="reka-bar__send" aria-label="Send">↑</button>
    </div>
  )
}
