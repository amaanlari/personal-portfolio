import ExperienceList from '../components/ExperienceList'
import ProjectList from '../components/ProjectList'
import { experience, projects } from '../lib/content'
import './Resume.css'

const skills = {
  'Languages': ['Java', 'Python', 'Scala', 'JavaScript', 'C++', 'Kotlin'],
  'Frameworks & Tools': ['Spring Boot', 'Spring Security', 'Play', 'Flask', 'Angular', 'React', 'Docker', 'Git', 'Jenkins'],
  'Databases & Messaging': ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Apache Kafka (KRaft)', 'Druid', 'Flink'],
  'Cloud & DevOps': ['AWS (EC2, Elastic Beanstalk, SNS, SQS, CloudWatch)', 'Azure Spring Apps', 'Docker', 'CI/CD'],
}

export default function Resume() {
  return (
    <main className="page">
      <title>Resume · Mohammad Amaan Lari</title>
      <div className="container">
        <h1 className="page-title">Resume</h1>
        <p className="page-lead">
          Mohammad Amaan Lari · <a href="/resume.pdf" target="_blank" rel="noreferrer">Download PDF</a>
        </p>

        <dl className="contact-list">
          <div><dt>Email</dt><dd><a href="mailto:amaanlari.official@gmail.com">amaanlari.official@gmail.com</a></dd></div>
          <div><dt>LinkedIn</dt><dd><a href="https://linkedin.com/in/amaanlari" target="_blank" rel="noreferrer">linkedin.com/in/amaanlari</a></dd></div>
          <div><dt>GitHub</dt><dd><a href="https://github.com/amaanlari" target="_blank" rel="noreferrer">github.com/amaanlari</a></dd></div>
          <div><dt>Phone</dt><dd>+91-7985453891</dd></div>
        </dl>

        <section className="section" aria-labelledby="resume-skills">
          <h2 className="section-title" id="resume-skills">Technical skills</h2>
          <dl className="skill-list">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <dt>{category}</dt>
                <dd>{items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section" aria-labelledby="resume-experience">
          <h2 className="section-title" id="resume-experience">Experience</h2>
          <ExperienceList items={experience} />
        </section>

        <section className="section" aria-labelledby="resume-projects">
          <h2 className="section-title" id="resume-projects">Projects</h2>
          <ProjectList items={projects} />
        </section>

        <section className="section" aria-labelledby="resume-education">
          <h2 className="section-title" id="resume-education">Education</h2>
          <div className="entry">
            <div className="entry-head">
              <h3 className="entry-title">B.Tech, Information Technology</h3>
              <span className="mono-label">Nov 2021 – Mar 2025</span>
            </div>
            <p>KIET Group of Institutions · Ghaziabad, India</p>
            <p className="entry-meta">CGPA: 6.72</p>
          </div>
        </section>
      </div>
    </main>
  )
}
