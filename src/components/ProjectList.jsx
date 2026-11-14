import RichText from './RichText'
import TextLink from './TextLink'

const LINK_LABELS = { github: 'GitHub', live: 'Live', caseStudy: 'Read more' }

// `emphasizeFeatured` gives featured projects a slightly stronger treatment (used on /work).
export default function ProjectList({ items, emphasizeFeatured = false }) {
  return (
    <ul className="entries">
      {items.map((project) => {
        const links = Object.entries(project.links ?? {}).filter(([, href]) => href)
        const label = [project.context, project.year].filter(Boolean).join(' · ')
        const strong = emphasizeFeatured && project.featured
        return (
          <li className={`entry${strong ? ' entry-featured' : ''}`} id={`project-${project.id}`} key={project.id}>
            <div className="entry-head">
              <h3 className="entry-title">
                {project.title}
                {project.status && (
                  <span className={`status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                )}
              </h3>
              {label && <span className="mono-label">{label}</span>}
            </div>

            <p className="entry-text">{project.description}</p>

            {project.details && (
              <ul className="bullet-list">
                {project.details.map((d) => (
                  <li key={d}><RichText text={d} /></li>
                ))}
              </ul>
            )}

            <ul className="pills" aria-label="Tech">
              {project.tech.map((t) => <li className="pill" key={t}>{t}</li>)}
            </ul>

            {links.length > 0 && (
              <p className="entry-links">
                {links.map(([kind, href]) => (
                  <TextLink href={href} key={kind} aria-label={`${project.title}: ${LINK_LABELS[kind]}`}>
                    {LINK_LABELS[kind]} →
                  </TextLink>
                ))}
              </p>
            )}
          </li>
        )
      })}
    </ul>
  )
}
