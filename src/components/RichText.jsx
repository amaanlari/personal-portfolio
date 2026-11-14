// Renders **bold** segments inside a plain content string.
export default function RichText({ text }) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}
