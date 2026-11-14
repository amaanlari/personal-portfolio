import RichText from './RichText'
import { formatPeriod } from '../lib/content'

export default function ExperienceList({ items }) {
  return (
    <ol className="entries">
      {items.map((job) => (
        <li className="entry" key={job.id}>
          <h3 className="entry-title">
            {job.companyUrl
              ? <a href={job.companyUrl} target="_blank" rel="noreferrer">{job.company}</a>
              : job.company}
          </h3>
          <ul className="role-list">
            {[...job.roles].reverse().map((role) => (
              <li key={role.title + role.start}>
                <span>{role.title}</span>
                <span className="mono-label">{formatPeriod(role.start, role.end)}</span>
              </li>
            ))}
          </ul>
          {(job.location || job.type) && (
            <p className="entry-meta">{[job.location, job.type].filter(Boolean).join(' · ')}</p>
          )}
          <ul className="bullet-list">
            {job.highlights.map((h) => (
              <li key={h}><RichText text={h} /></li>
            ))}
          </ul>
          {job.tech && (
            <ul className="pills" aria-label="Tech">
              {job.tech.map((t) => <li className="pill" key={t}>{t}</li>)}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}
