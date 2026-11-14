import { EMAIL, GITHUB, LINKEDIN } from '../lib/nav'

export default function Contact() {
  return (
    <main className="page">
      <title>Contact · Mohammad Amaan Lari</title>
      <div className="container">
        <h1 className="page-title">Contact</h1>
        <p className="page-lead">Email is the quickest way to reach me.</p>
        <div className="section">
          <a href={`mailto:${EMAIL}`} className="btn-comic">{EMAIL}</a>
          <ul className="chevron-list" style={{ marginTop: '2rem' }}>
            <li><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a><span className="mono-label">linkedin.com/in/amaanlari</span></li>
            <li><a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a><span className="mono-label">github.com/amaanlari</span></li>
          </ul>
        </div>
      </div>
    </main>
  )
}
