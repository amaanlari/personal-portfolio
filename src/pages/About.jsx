import { Link } from 'react-router-dom'
import ExperienceList from '../components/ExperienceList'
import ProjectList from '../components/ProjectList'
import PostLines from '../components/PostLines'
import RichText from '../components/RichText'
import { experience, openSource, projects, formatPeriod } from '../lib/content'
import { EMAIL, GITHUB, LINKEDIN } from '../lib/nav'

export default function About() {
  return (
    <main className="page">
      <title>About · Mohammad Amaan Lari</title>
      <div className="container">
        <h1 className="page-title">Mohammad Amaan Lari</h1>
        <p className="page-lead">Software Engineer</p>
        <p className="link-row">
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${EMAIL}`}>Email</a>
          <Link to="/resume">Resume</Link>
        </p>

        <section className="section" aria-labelledby="about-experience">
          <h2 className="section-title" id="about-experience">Experience</h2>
          <ExperienceList items={experience} />
        </section>

        <section className="section" aria-labelledby="about-oss">
          <h2 className="section-title" id="about-oss">Open Source</h2>
          <ul className="entries">
            {openSource.map((item) => (
              <li className="entry" key={item.id}>
                <div className="entry-head">
                  <h3 className="entry-title">
                    {item.orgUrl ? <a href={item.orgUrl} target="_blank" rel="noreferrer">{item.org}</a> : item.org}
                  </h3>
                  {item.start && <span className="mono-label">{formatPeriod(item.start, item.end ?? null)}</span>}
                </div>
                <p>{item.role}</p>
                <ul className="bullet-list">
                  {item.highlights.map((h) => <li key={h}><RichText text={h} /></li>)}
                </ul>
              </li>
            ))}
          </ul>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="more-link">See more on GitHub →</a>
        </section>

        <section className="section" aria-labelledby="about-projects">
          <h2 className="section-title" id="about-projects">Projects</h2>
          <ProjectList items={projects} />
        </section>

        <PostLines title="Writing" />

        <p className="section closing-line">
          Why be the consumer when you can be the producer? <span role="img" aria-label="rocket">🚀</span>
        </p>
      </div>
    </main>
  )
}
